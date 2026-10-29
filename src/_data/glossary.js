const yaml = require("js-yaml");
const fs = require("node:fs");
const path = require("node:path");
const { statuses, types } = require("./docTypes");

const load = (file) =>
  yaml.load(
    fs.readFileSync(path.join(__dirname, "..", "..", "data", file), "utf8"),
  );

const escapeRegExp = (text) => text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

// Whole-word, case-insensitive match of any phrase, with an optional plural "s".
function matcher(phrases) {
  return new RegExp(
    `(?<![\\p{L}\\p{N}])(?:${phrases.map(escapeRegExp).join("|")})s?(?![\\p{L}\\p{N}])`,
    "iu",
  );
}
// Documents in a glossary term, grouped by adoption status in the canonical
// status order (in force → adopted → published → final → draft → in
// development → proposal → superseded). The glossary page shows one rail per
// status so long document lists stay scannable.
function groupByStatus(docs) {
  const byStatus = new Map();
  for (const doc of docs) {
    if (!byStatus.has(doc.status)) byStatus.set(doc.status, []);
    byStatus.get(doc.status).push(doc);
  }
  return Object.keys(statuses)
    .filter((key) => byStatus.has(key))
    .map((key) => ({
      key,
      ...statuses[key],
      count: byStatus.get(key).length,
      docs: byStatus
        .get(key)
        .slice()
        .sort((a, b) => a.name.localeCompare(b.name, "en"))
        .map((doc) => ({
          ...doc,
          typeLabel: types[doc.type] ? types[doc.type].label : doc.type,
          typeBadge: types[doc.type] ? types[doc.type].badge : "badge-neutral",
        })),
    }));
}

// Each glossary term lists the documents whose id, name, summary, relevance or
// status note mention it, and counts them.
function glossary() {
  const { themes, terms } = load("eudi-glossary.yaml");
  const documents = load("eudi-documents-map.yaml").flat_documents;
  const texts = documents.map((doc) => ({
    doc,
    text: [
      doc.id,
      doc.name,
      doc.summary,
      doc.relevance_for_eudi,
      doc.status_note,
    ]
      .filter(Boolean)
      .join(" "),
  }));

  const entries = terms
    .map((term) => {
      const pattern = matcher(
        [term.term, term.abbr, ...(term.match || [])].filter(Boolean),
      );
      const docs = texts
        .filter((entry) => pattern.test(entry.text))
        .map((entry) => entry.doc);
      return {
        ...term,
        slug: term.term
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/^-|-$/g, ""),
        letter: term.term[0].toUpperCase(),
        docIds: docs.map((doc) => doc.id),
        docGroups: groupByStatus(docs),
        count: docs.length,
      };
    })
    .sort((a, b) => a.term.localeCompare(b.term, "en"));

  const themeList = themes.map((theme) => {
    const themeTerms = entries
      .filter((entry) => entry.theme === theme.key)
      .sort((a, b) => b.count - a.count || a.term.localeCompare(b.term, "en"));
    return {
      ...theme,
      terms: themeTerms,
      count: new Set(themeTerms.flatMap((entry) => entry.docIds)).size,
    };
  });
  const themeLabels = Object.fromEntries(
    themes.map((theme) => [theme.key, theme.label]),
  );
  for (const entry of entries) entry.themeLabel = themeLabels[entry.theme];

  const letters = [...new Set(entries.map((entry) => entry.letter))].map(
    (letter) => ({
      letter,
      terms: entries.filter((entry) => entry.letter === letter),
    }),
  );

  // Reverse index: document id -> glossary terms that mention it, for
  // cross-linking from document pages back to the glossary.
  const docTerms = {};
  for (const entry of entries) {
    for (const docId of entry.docIds) {
      (docTerms[docId] ||= []).push({ term: entry.term, slug: entry.slug });
    }
  }

  return {
    terms: entries,
    themes: themeList,
    letters,
    docTerms,
    max: Math.max(...entries.map((entry) => entry.count)),
    coveredCount: new Set(entries.flatMap((entry) => entry.docIds)).size,
  };
}

module.exports = glossary;
module.exports.matcher = matcher;

const yaml = require("js-yaml");
const fs = require("node:fs");
const path = require("node:path");
const { stacks, types } = require("./docTypes");

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

// Each glossary term lists the documents whose id, name, summary, relevance or
// status note mention it, split by stack layer for the topic index bars.
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
      let x = 0;
      const segments = [];
      for (const stack of stacks) {
        const count = docs.filter(
          (doc) => types[doc.type].stack === stack.key,
        ).length;
        if (count)
          segments.push({ key: stack.key, label: stack.label, count, x });
        x += count;
      }
      return {
        ...term,
        slug: term.term
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/^-|-$/g, ""),
        letter: term.term[0].toUpperCase(),
        docIds: docs.map((doc) => doc.id),
        count: docs.length,
        segments,
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

  return {
    terms: entries,
    themes: themeList,
    letters,
    max: Math.max(...entries.map((entry) => entry.count)),
    coveredCount: new Set(entries.flatMap((entry) => entry.docIds)).size,
  };
}

module.exports = glossary;
module.exports.matcher = matcher;

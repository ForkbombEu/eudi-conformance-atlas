const yaml = require("js-yaml");
const fs = require("node:fs");
const { loadCurrentManifest, resolveArtifact } = require("./source-of-truth");

// Ordered by authority layer: a claim's provenance reads law → architecture
// → standards → protocols → pilot work. Every family present in the registry
// must be listed here; groupReferences throws on an unknown key so a new
// family can never be dropped silently by the claim page.
const REFERENCE_FAMILIES = [
  { key: "legal", label: "EU legal act" },
  { key: "arf", label: "EUDI ARF" },
  { key: "etsi", label: "ETSI ESI" },
  { key: "openid", label: "OpenID4VC" },
  { key: "ietf", label: "IETF" },
  { key: "iso", label: "ISO" },
  { key: "webuild", label: "WE BUILD WP4" },
];

function etsiVersion(ref) {
  const fromDeliverable = /V\d+(?:\.\d+)*/.exec(ref.deliverable || "");
  if (fromDeliverable) return fromDeliverable[0];
  const fromId = /-V(\d+(?:-\d+)*)$/.exec(ref.id || "");
  return fromId ? `V${fromId[1].replace(/-/g, ".")}` : "";
}

function protocolRef(ref) {
  return {
    id: ref.id || "",
    locator: ref.paragraph || "",
    description: ref.notes || ref.document_name || "",
    url: ref.url || "",
  };
}

const REFERENCE_NORMALIZERS = {
  legal: (ref) => ({
    id: ref.source || "",
    locator: ref.article || ref.recital_or_article || ref.annex || "",
    description: ref.short || "",
    url: ref.url || "",
  }),
  arf: (ref) => ({
    id: ref.harmonized_id || ref.index || ref.topic || "",
    locator: ref.harmonized_id ? ref.index || "" : "",
    description: ref.short || "",
    url: ref.url || ref.section_url || "",
  }),
  etsi: (ref) => ({
    id: (ref.id || "").replace(/-V\d+(?:-\d+)*$/, "") || ref.short || "",
    locator: etsiVersion(ref),
    description: ref.relevance || ref.title || "",
    url: ref.url || ref.pdf_url || "",
  }),
  openid: protocolRef,
  ietf: protocolRef,
  iso: (ref) => ({
    id: ref.id || ref.source || "",
    locator: ref.paragraph || "",
    description: ref.notes || ref.document_name || "",
    url: ref.url || "",
  }),
  webuild: (ref) => ({
    id: ref.use_case_id || ref.name || "",
    locator: "",
    description: ref.use_case_id ? ref.name || "" : ref.path || "",
    url: "",
  }),
};

function groupReferences(claim) {
  const refs = claim.official_references || {};
  const known = new Set(REFERENCE_FAMILIES.map((family) => family.key));
  for (const key of Object.keys(refs)) {
    if (!known.has(key)) {
      throw new Error(
        `Unknown official reference family "${key}" in claim "${claim.slug}": add it to REFERENCE_FAMILIES`,
      );
    }
  }

  const families = [];
  let total = 0;
  for (const family of REFERENCE_FAMILIES) {
    const raw = refs[family.key] || [];
    if (raw.length === 0) continue;
    const items = raw.map(REFERENCE_NORMALIZERS[family.key]);
    total += items.length;
    families.push({
      key: family.key,
      label: family.label,
      count: items.length,
      items,
    });
  }
  return { total, families };
}

module.exports = function () {
  const manifest = loadCurrentManifest();
  const registry = resolveArtifact(manifest, {
    filename: "credimi-conformance-evidence-registry-v1.1.yaml",
  });
  const raw = yaml.load(fs.readFileSync(registry.filePath, "utf8"));

  const profiles = raw.profiles || [];
  const sourceDocs = raw.source_documents || {};
  const statusVocab = raw.status_vocabulary || {};
  const evidenceVocab = raw.evidence_type_vocabulary || {};

  // Flatten all claims
  const claims = [];
  const bySlug = {};
  const byActor = {};
  const byDomain = {};

  for (const profile of profiles) {
    for (const claim of profile.evidence_claims || []) {
      if (bySlug[claim.slug]) {
        throw new Error(`Duplicate evidence claim slug: ${claim.slug}`);
      }
      bySlug[claim.slug] = claim;

      // Attach profile context
      claim.profile = {
        slug: profile.profile_slug,
        title: profile.title,
        actor_under_test: profile.actor_under_test,
        description: profile.description,
      };
      claim.references = groupReferences(claim);

      claims.push(claim);

      // Actor index
      const actor = claim.actor || profile.actor_under_test || "unknown";
      if (!byActor[actor]) byActor[actor] = [];
      byActor[actor].push(claim);

      // Domain index
      const domain = claim.domain || "general";
      if (!byDomain[domain]) byDomain[domain] = [];
      byDomain[domain].push(claim);
    }
  }

  return {
    claims,
    profiles,
    bySlug,
    byActor,
    byDomain,
    sourceDocs,
    statusVocab,
    evidenceVocab,
    totalCount: claims.length,
    registryVersion: raw.registry_version,
    name: raw.name,
    sourcePath: registry.path,
  };
};

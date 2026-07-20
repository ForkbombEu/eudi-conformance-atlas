const yaml = require("js-yaml");
const fs = require("node:fs");
const { loadCurrentManifest, resolveArtifact } = require("./source-of-truth");

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

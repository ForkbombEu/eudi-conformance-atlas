import yaml from "js-yaml";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");

function fail(msg) {
  console.error("VALIDATION ERROR:", msg);
  process.exitCode = 1;
}

// Validate documents YAML
const docsYaml = yaml.load(fs.readFileSync(path.join(root, "data/eudi-documents-map.yaml"), "utf8"));
const docIds = new Set();
for (const doc of docsYaml.flat_documents) {
  if (docIds.has(doc.id)) {
    fail(`Duplicate document ID: ${doc.id}`);
  }
  docIds.add(doc.id);

  const legalTypes = ["regulation", "implementing_regulation", "implementing_decision", "directive", "consolidated_regulation", "recommendation"];
  if (legalTypes.includes(doc.type) && !doc.url) {
    fail(`Legal document ${doc.id} missing official URL`);
  }
}

// Validate evidence registry
const evidenceYaml = yaml.load(fs.readFileSync(path.join(root, "data/evidence-claims-registry.yaml"), "utf8"));
const slugs = new Set();
for (const profile of evidenceYaml.profiles || []) {
  for (const claim of profile.evidence_claims || []) {
    if (slugs.has(claim.slug)) {
      fail(`Duplicate evidence claim slug: ${claim.slug}`);
    }
    slugs.add(claim.slug);
  }
}

console.log(`Documents: ${docIds.size}, Evidence claims: ${slugs.size}`);
if (!process.exitCode) {
  console.log("Validation passed.");
}

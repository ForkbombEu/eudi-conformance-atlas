import path from "node:path";
import { fileURLToPath } from "node:url";
import sourceOfTruth from "../src/_data/source-of-truth.js";
import evidenceLoader from "../src/_data/evidence.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const { loadCurrentManifest, resolveArtifact } = sourceOfTruth;

function fail(message) {
  throw new Error(`Source-of-truth evidence validation: ${message}`);
}

const loadedManifest = loadCurrentManifest();
const registry = resolveArtifact(loadedManifest, {
  filename: "credimi-conformance-evidence-registry-v1.1.yaml",
});
if (!registry.filePath.startsWith(`${loadedManifest.releaseDirectory}${path.sep}`)) {
  fail("resolved registry is outside current release directory");
}

const evidence = evidenceLoader();
const addedSlugs = [
  "eaa-pid-issuance-profile-validation",
  "eaa-pid-presentation-profile-validation",
  "relying-party-attributes-standards-validation",
  "certificate-profile-standards-validation",
  "qualified-validation-service-standards-validation",
  "timestamping-standards-validation",
  "remote-signature-creation-standards-validation",
  "wallet-processes-siopv2-request",
  "rp-validates-self-issued-id-token",
  "mdoc-mdl-device-engagement-and-data-retrieval",
  "mdoc-mdl-security-mechanisms-validated",
  "openid-federation-trust-chain-resolved",
  "openid-federation-metadata-policy-and-trust-marks-validated",
];

if (evidence.registryVersion !== "1.1") {
  fail(`expected registry version 1.1, got ${JSON.stringify(evidence.registryVersion)}`);
}
if (evidence.profiles.length !== 10) {
  fail(`expected 10 profiles, got ${evidence.profiles.length}`);
}
if (evidence.totalCount !== 50 || Object.keys(evidence.bySlug).length !== 50) {
  fail(`expected 50 unique claims, got ${evidence.totalCount}`);
}
if (evidence.sourcePath === "data/evidence-claims-registry.yaml") {
  fail("loader is reading legacy registry");
}
for (const slug of addedSlugs) {
  if (!evidence.bySlug[slug]) {
    fail(`loader is missing v1.1 claim: ${slug}`);
  }
}

const withoutRegistry = { ...loadedManifest, manifest: { ...loadedManifest.manifest, artifacts: [] } };
try {
  resolveArtifact(withoutRegistry, { filename: registry.filename });
  fail("missing artifact did not fail");
} catch (error) {
  if (!error.message.includes("missing")) throw error;
}

const duplicateRegistry = {
  ...loadedManifest,
  manifest: { ...loadedManifest.manifest, artifacts: [registry, registry] },
};
try {
  resolveArtifact(duplicateRegistry, { filename: registry.filename });
  fail("ambiguous artifact did not fail");
} catch (error) {
  if (!error.message.includes("ambiguous")) throw error;
}

console.log(`Evidence registry ${evidence.registryVersion}: ${evidence.profiles.length} profiles, ${evidence.totalCount} claims verified.`);

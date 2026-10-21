import yaml from "js-yaml";
import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");

function fail(msg) {
  console.error("VALIDATION ERROR:", msg);
  process.exitCode = 1;
}

function releaseFiles(directory) {
  return fs
    .readdirSync(directory, { withFileTypes: true })
    .flatMap((entry) => {
      const entryPath = path.join(directory, entry.name);
      if (entry.isDirectory()) {
        return releaseFiles(entryPath).map((child) =>
          path.join(entry.name, child),
        );
      }
      return entry.isFile() ? [entry.name] : [];
    })
    .sort();
}

function validateCurrentSourceOfTruth() {
  const manifestPath = path.join(root, "data/source-of-truth/current.json");
  let manifest;
  try {
    manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));
  } catch (error) {
    fail(`Source-of-truth manifest does not parse: ${error.message}`);
    return;
  }

  if (manifest.current_release !== "v1.1") {
    fail(
      `Expected current_release v1.1, got ${JSON.stringify(manifest.current_release)}`,
    );
  }

  const releaseDirectory = path.resolve(root, manifest.release_directory || "");
  const releasesRoot = path.resolve(root, "data/source-of-truth/releases");
  if (!releaseDirectory.startsWith(`${releasesRoot}${path.sep}`)) {
    fail(
      "Manifest release_directory must be inside data/source-of-truth/releases",
    );
    return;
  }
  if (
    !fs.existsSync(releaseDirectory) ||
    !fs.statSync(releaseDirectory).isDirectory()
  ) {
    fail(
      `Manifest release directory does not exist: ${manifest.release_directory}`,
    );
    return;
  }
  if (!Array.isArray(manifest.artifacts)) {
    fail("Manifest artifacts must be an array");
    return;
  }

  const expectedPaths = new Set();
  for (const artifact of manifest.artifacts) {
    const artifactPath = path.resolve(root, artifact.path || "");
    if (
      !artifact.path ||
      !artifactPath.startsWith(`${releaseDirectory}${path.sep}`)
    ) {
      fail(
        `Manifest path must be inside declared release directory: ${artifact.path}`,
      );
      continue;
    }
    if (expectedPaths.has(artifact.path)) {
      fail(`Manifest path listed more than once: ${artifact.path}`);
      continue;
    }
    expectedPaths.add(artifact.path);

    if (!fs.existsSync(artifactPath) || !fs.statSync(artifactPath).isFile()) {
      fail(`Manifest file does not exist: ${artifact.path}`);
      continue;
    }
    if (path.basename(artifactPath) !== artifact.filename) {
      fail(`Manifest filename does not match path: ${artifact.path}`);
    }
    const bytes = fs.readFileSync(artifactPath);
    if (bytes.length !== artifact.byte_size) {
      fail(`Manifest byte size mismatch: ${artifact.path}`);
    }
    const digest = crypto.createHash("sha256").update(bytes).digest("hex");
    if (digest !== artifact.sha256) {
      fail(`Manifest SHA-256 mismatch: ${artifact.path}`);
    }
  }

  const actualPaths = releaseFiles(releaseDirectory).map((file) =>
    path.relative(root, path.join(releaseDirectory, file)),
  );
  for (const actualPath of actualPaths) {
    if (!expectedPaths.has(actualPath)) {
      fail(`Undeclared release file: ${actualPath}`);
    }
  }
  for (const expectedPath of expectedPaths) {
    if (!actualPaths.includes(expectedPath)) {
      fail(`Manifest path missing from release: ${expectedPath}`);
    }
  }

  if (!process.exitCode) {
    console.log(
      `Source-of-truth ${manifest.current_release}: ${actualPaths.length} artifacts verified.`,
    );
  }
}

// Validate documents YAML
const require = createRequire(import.meta.url);
const { types, statuses } = require("../src/_data/docTypes.js");
const docsYaml = yaml.load(
  fs.readFileSync(path.join(root, "data/eudi-documents-map.yaml"), "utf8"),
);
const docIds = new Set();
// YYYY, YYYY-MM or YYYY-MM-DD, kept as a string (unquoted YAML dates become Date objects).
const statusDatePattern = /^\d{4}(-(0[1-9]|1[0-2])(-(0[1-9]|[12]\d|3[01]))?)?$/;
for (const doc of docsYaml.flat_documents) {
  if (docIds.has(doc.id)) {
    fail(`Duplicate document ID: ${doc.id}`);
  }
  docIds.add(doc.id);

  if (!types[doc.type]) {
    fail(`Document ${doc.id} has unknown type ${JSON.stringify(doc.type)}`);
  } else if (types[doc.type].stack === "legal" && !doc.url) {
    fail(`Legal document ${doc.id} missing official URL`);
  }
  if (!statuses[doc.status]) {
    fail(`Document ${doc.id} has unknown status ${JSON.stringify(doc.status)}`);
  }
  for (const pin of doc.pinned_versions || []) {
    if (!pin.by || !pin.version || !/^https:\/\//.test(pin.source || "")) {
      fail(
        `Document ${doc.id} has a pinned version without by/version/https source`,
      );
    }
  }
  // status_date is optional (omitted when the publisher states no date) but must be well-formed.
  if (
    doc.status_date !== undefined &&
    (typeof doc.status_date !== "string" ||
      !statusDatePattern.test(doc.status_date))
  ) {
    fail(
      `Document ${doc.id} status_date must be a quoted YYYY, YYYY-MM or YYYY-MM-DD string, got ${JSON.stringify(doc.status_date)}`,
    );
  }
}

function checkReferences(label, ids) {
  for (const id of ids || []) {
    if (!docIds.has(id)) fail(`${label} references unknown document ${id}`);
  }
}

for (const group of docsYaml.logical_groups || []) {
  for (const step of group.steps || [])
    checkReferences(`Group ${group.group_slug}`, step.documents);
}
for (const route of docsYaml.recommended_reading_routes || []) {
  checkReferences(`Route ${route.route_slug}`, route.documents);
}
for (const release of docsYaml.changelog || []) {
  if (
    typeof release.date !== "string" ||
    !statusDatePattern.test(release.date)
  ) {
    fail(
      `Changelog entry needs a quoted date, got ${JSON.stringify(release.date)}`,
    );
  }
  checkReferences(`Changelog ${release.date} added`, release.added);
  checkReferences(`Changelog ${release.date} updated`, release.updated);
}

validateCurrentSourceOfTruth();

console.log(`Documents: ${docIds.size}`);
if (!process.exitCode) {
  console.log("Validation passed.");
}

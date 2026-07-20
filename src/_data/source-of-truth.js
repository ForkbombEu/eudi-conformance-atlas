const fs = require("node:fs");
const path = require("node:path");

const root = path.join(__dirname, "..", "..");
const releasesRoot = path.resolve(root, "data", "source-of-truth", "releases");

function manifestError(message) {
  return new Error(`Source-of-truth manifest: ${message}`);
}

function loadCurrentManifest() {
  const manifestPath = path.join(root, "data", "source-of-truth", "current.json");
  let manifest;
  try {
    manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));
  } catch (error) {
    throw manifestError(`cannot parse current.json: ${error.message}`);
  }

  if (!manifest.current_release || !manifest.release_directory || !Array.isArray(manifest.artifacts)) {
    throw manifestError("current.json requires current_release, release_directory, and artifacts");
  }

  const releaseDirectory = path.resolve(root, manifest.release_directory);
  if (!releaseDirectory.startsWith(`${releasesRoot}${path.sep}`)) {
    throw manifestError("release_directory must be inside data/source-of-truth/releases");
  }
  if (!fs.existsSync(releaseDirectory) || !fs.statSync(releaseDirectory).isDirectory()) {
    throw manifestError(`release directory is missing: ${manifest.release_directory}`);
  }

  return { manifest, manifestPath, releaseDirectory };
}

function resolveArtifact(loadedManifest, selector) {
  const matches = loadedManifest.manifest.artifacts.filter((artifact) => (
    (!selector.filename || artifact.filename === selector.filename)
    && (!selector.media_type || artifact.media_type === selector.media_type)
  ));
  const description = selector.filename || selector.media_type || "requested";
  if (matches.length === 0) {
    throw manifestError(`missing ${description} artifact`);
  }
  if (matches.length > 1) {
    throw manifestError(`ambiguous ${description} artifact`);
  }

  const artifact = matches[0];
  const filePath = path.resolve(root, artifact.path || "");
  if (!artifact.path || !filePath.startsWith(`${loadedManifest.releaseDirectory}${path.sep}`)) {
    throw manifestError(`artifact path is outside current release: ${artifact.path}`);
  }
  if (!fs.existsSync(filePath) || !fs.statSync(filePath).isFile()) {
    throw manifestError(`artifact is missing: ${artifact.path}`);
  }

  return { ...artifact, filePath };
}

module.exports = { loadCurrentManifest, resolveArtifact };

const fs = require("node:fs");
const { loadCurrentManifest, resolveArtifact } = require("./source-of-truth");

function actorKey(actor) {
  if (actor === "Wallet") return "wallet";
  if (actor === "Issuer") return "issuer";
  if (actor === "Trust infrastructure") return "trust";
  if (actor.startsWith("External/")) return "external";
  if (actor === "Wallet/Reader") return "other";
  if (actor.includes("RP") || actor.includes("Verifier")) return "verifier";
  return "other";
}

function strengthKey(strength) {
  const keys = {
    "definitive evidence": "definitive",
    "conditional evidence": "conditional",
    "requires external testing": "external",
  };
  if (!keys[strength]) throw new Error(`Unknown test evidence strength: ${strength}`);
  return keys[strength];
}

function parseReferences(source) {
  return [...source.matchAll(/\[([^\]]+)\]\([^)]*\)/g)].map((match) => match[1]);
}

function parseFlatTestList(markdown) {
  const tests = markdown.split(/\r?\n/)
    .filter((line) => /^\| \d+ \|/.test(line))
    .map((line) => {
      const cells = line.split("|").slice(1, -1).map((cell) => cell.trim());
      if (cells.length !== 7) {
        throw new Error(`Malformed canonical flat-test-list row: ${line}`);
      }
      const [id, actor, test, strength, execution, references, notes] = cells;
      return {
        id: Number(id),
        actor,
        actorKey: actorKey(actor),
        test,
        strength,
        strengthKey: strengthKey(strength),
        execution,
        notes,
        refs: parseReferences(references),
      };
    });

  const ids = new Set(tests.map((test) => test.id));
  if (tests.length !== 189 || ids.size !== 189 || ids.has(170) || !ids.has(190)) {
    throw new Error("Canonical flat-test-list must contain 189 unique tests with ID 170 absent and ID 190 present");
  }
  return tests;
}

module.exports = function () {
  const manifest = loadCurrentManifest();
  const artifact = resolveArtifact(manifest, {
    filename: "credimi-flat-conformance-test-list-v1.1.md",
  });
  const tests = parseFlatTestList(fs.readFileSync(artifact.filePath, "utf8"));
  const count = (key) => tests.filter((test) => test.strengthKey === key).length;
  const countActor = (key) => tests.filter((test) => test.actorKey === key).length;

  return {
    tests,
    totalCount: tests.length,
    definitiveCount: count("definitive"),
    conditionalCount: count("conditional"),
    externalCount: count("external"),
    sourcePath: artifact.path,
    chartByActor: {
      labels: ["Wallet", "Issuer", "Verifier / RP", "Trust Infra", "External / CAB"],
      values: ["wallet", "issuer", "verifier", "trust", "external"].map(countActor),
    },
  };
};

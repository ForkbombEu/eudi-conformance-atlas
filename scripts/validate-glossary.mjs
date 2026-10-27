import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const glossary = require("../src/_data/glossary.js");
const matcher = glossary.matcher;

let failed = false;
const fail = (msg) => {
  console.error("GLOSSARY ERROR:", msg);
  failed = true;
};

// --- Matcher behaviour (word boundaries, plural, case) ---
const assert = (name, actual, expected) => {
  const ok = actual === expected;
  if (!ok) fail(`${name}: expected ${expected}, got ${actual}`);
};

const pid = matcher(["PID"]);
assert("PID matches itself", pid.test("the PID"), true);
assert("PID matches plural", pid.test("two PIDs"), true);
assert("PID is case-insensitive", pid.test("A pid"), true);
assert("PID does not match substrings", pid.test("rapid"), false);
assert("PID does not match inside larger tokens", pid.test("QPID"), false);

const phrase = matcher(["Trusted List"]);
assert("phrase matches exact", phrase.test("a Trusted List"), true);
assert("phrase matches plural", phrase.test("trusted lists"), true);

// --- Data integrity ---
const data = glossary();
const slugs = new Set();
const themeKeys = new Set(data.themes.map((t) => t.key));
for (const entry of data.terms) {
  if (!entry.term) fail(`term missing`);
  if (!themeKeys.has(entry.theme))
    fail(`${entry.term}: unknown theme ${entry.theme}`);
  if (!entry.definition || !entry.definition.trim())
    fail(`${entry.term}: empty definition`);
  if (slugs.has(entry.slug)) fail(`duplicate slug ${entry.slug}`);
  slugs.add(entry.slug);
  if (entry.count === 0) fail(`${entry.term}: matches no documents`);
}
for (const theme of data.themes) {
  if (theme.terms.length === 0) fail(`theme ${theme.label} has no terms`);
}

console.log(
  `Glossary: ${data.terms.length} terms, ${data.themes.length} themes, ${data.coveredCount} documents covered.`,
);
if (failed) process.exit(1);
console.log("Glossary validation passed.");

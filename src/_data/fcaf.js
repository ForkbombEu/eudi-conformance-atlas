const yaml = require("js-yaml");
const fs = require("node:fs");
const path = require("node:path");

// Section keys in the upstream FCAF config are dot paths such as
// `data_model.address_data`; render them as "Data model · Address data".
function sectionLabel(key) {
  return key
    .split(".")
    .filter(Boolean)
    .map((part) =>
      part
        .split("_")
        .map((word, index) =>
          index === 0 ? word.charAt(0).toUpperCase() + word.slice(1) : word,
        )
        .join(" "),
    )
    .join(" · ");
}

function groupBySection(tests) {
  const sections = new Map();
  for (const test of tests) {
    if (!sections.has(test.section)) {
      sections.set(test.section, {
        key: test.section,
        label: sectionLabel(test.section),
        count: 0,
        tests: [],
      });
    }
    const section = sections.get(test.section);
    section.count += 1;
    section.tests.push(test);
  }
  return [...sections.values()].sort(
    (a, b) =>
      a.label.localeCompare(b.label, "en") || a.key.localeCompare(b.key),
  );
}

module.exports = function () {
  const file = path.join(__dirname, "..", "..", "data", "fcaf.yaml");
  const raw = yaml.load(fs.readFileSync(file, "utf8"));
  const tests = raw.tests || [];

  const roles = (raw.roles || []).map((role) => {
    const roleTests = tests.filter((test) => test.role === role.key);
    return {
      ...role,
      count: roleTests.length,
      sections: groupBySection(roleTests),
    };
  });

  return {
    source: raw.source,
    roles,
    totalCount: tests.length,
    sectionCount: roles.reduce(
      (total, role) => total + role.sections.length,
      0,
    ),
    referenceCount: tests.reduce(
      (total, test) => total + test.references.length,
      0,
    ),
  };
};

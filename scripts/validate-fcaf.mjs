import fcafLoader from "../src/_data/fcaf.js";

const fcaf = fcafLoader();

function fail(message) {
  throw new Error(`FCAF validation: ${message}`);
}

const ids = new Set();
let referenced = 0;
for (const role of fcaf.roles) {
  let sectionTotal = 0;
  for (const section of role.sections) {
    if (section.count !== section.tests.length) {
      fail(`${role.key}/${section.key} count does not match its tests`);
    }
    sectionTotal += section.count;
    for (const test of section.tests) {
      if (ids.has(test.id)) fail(`duplicate test id ${test.id}`);
      ids.add(test.id);
      if (test.section !== section.key) {
        fail(`test ${test.id} is listed under the wrong section`);
      }
      if (test.role !== role.key) fail(`test ${test.id} has a mismatched role`);
      if (!test.file) fail(`test ${test.id} has no upstream file`);
      if (test.references.length === 0) {
        fail(`test ${test.id} has no normative reference`);
      }
      referenced += test.references.length;
    }
  }
  if (role.count !== sectionTotal) {
    fail(`${role.key} count does not match its sections`);
  }
}

if (fcaf.roles.length !== 2) {
  fail(`expected 2 wallet-solution roles, got ${fcaf.roles.length}`);
}
if (ids.size !== fcaf.totalCount) {
  fail(`loaded ${fcaf.totalCount} tests but found ${ids.size} unique ids`);
}
if (fcaf.totalCount !== 676) {
  fail(`expected 676 FCAF test cases, got ${fcaf.totalCount}`);
}
if (fcaf.referenceCount !== referenced) {
  fail(`reference count ${fcaf.referenceCount} does not match ${referenced}`);
}
if (!fcaf.source?.upstream_commit || !fcaf.source?.standard) {
  fail("FCAF source metadata is incomplete");
}

console.log(
  `FCAF catalogue: ${fcaf.totalCount} tests, ${fcaf.roles.length} roles, ${fcaf.sectionCount} sections verified.`,
);

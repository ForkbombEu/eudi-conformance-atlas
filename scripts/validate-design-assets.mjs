import { readFile } from "node:fs/promises";
import assert from "node:assert/strict";

for (const [runtime, input] of [
  ["src/css/style.css", "HITL/style.css"],
  ["src/assets/credimi_logo.svg", "HITL/credimi_logo.svg"],
  ["src/assets/credimi_logo_negative.svg", "HITL/credimi_logo_negative.svg"],
]) {
  assert.deepEqual(await readFile(runtime), await readFile(input), `${runtime} differs from ${input}`);
}

const base = await readFile("src/_includes/base.njk", "utf8");
assert.match(base, /rel="icon" type="image\/svg\+xml" href="\{\{ '\/assets\/credimi_logo\.svg'/);

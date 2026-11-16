import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { existsSync, mkdtempSync, readFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import test from "node:test";

for (const [origin, prefix] of [
  ["https://atlas.credimi.io", "/"],
  ["https://example.test", "/atlas/"],
]) {
  test(`feed links work without a base URL at ${origin}${prefix}`, () => {
    const output = mkdtempSync(path.join(tmpdir(), "atlas-feed-"));
    try {
      execFileSync(
        "npm",
        ["run", "build", "--", "--quiet", `--output=${output}`],
        {
          env: { ...process.env, SITE_URL: `${origin}/`, PATH_PREFIX: prefix },
          stdio: "pipe",
        },
      );
      const feed = readFileSync(path.join(output, "feed.xml"), "utf8");
      const links = [...feed.matchAll(/(?:href|src)="([^"]+)"/g)].map(
        (match) => match[1],
      );
      for (const link of links) {
        const url = new URL(link);
        assert.equal(url.protocol, "https:");
        if (url.origin !== origin) continue;
        assert.ok(url.pathname.startsWith(prefix), link);
        const relative = url.pathname.slice(prefix.length);
        const target =
          relative.endsWith("/") || !relative
            ? `${relative}index.html`
            : relative;
        assert.ok(existsSync(path.join(output, target)), link);
      }
      for (const suffix of ["", "feed.xml", "radar/", "reference/"]) {
        assert.ok(links.includes(`${origin}${prefix}${suffix}`));
      }
      assert.ok(
        links.some((link) => link.startsWith(`${origin}${prefix}documents/`)),
      );
      assert.ok(links.includes("https://credimi.io/login"));
      assert.ok(
        feed.includes(`<logo>${origin}${prefix}assets/og-cover.png</logo>`),
      );
      for (const entry of feed.matchAll(/<entry>([\s\S]*?)<\/entry>/g)) {
        const title = entry[1].match(/<title>([\s\S]*?)<\/title>/)?.[1];
        assert.ok(title?.trim());
        assert.doesNotMatch(title, /^Rulebook update/);
        assert.ok(
          entry[1].includes(
            `<link rel="enclosure" type="image/png" href="${origin}${prefix}assets/og-cover.png"/>`,
          ),
        );
        const content = entry[1].match(/<!\[CDATA\[([\s\S]*?)\]\]>/)?.[1];
        assert.match(content, /<img [^>]*alt="[^"]+"/);
        assert.doesNotMatch(content, /&amp;(?:#(?:39|34)|quot|apos);/);
        assert.ok(content.includes(`href="${origin}${prefix}feed.xml"`));
        assert.ok(content.includes(`href="${origin}${prefix}reference/"`));
        assert.ok(content.includes('href="https://credimi.io/login"'));
      }
    } finally {
      rmSync(output, { recursive: true, force: true });
    }
  });
}

// Site metadata for SEO surfaces that require absolute URLs (canonical,
// Open Graph, JSON-LD, sitemap, robots). The production origin is
// https://atlas.credimi.io; override with SITE_URL for local or other hosts.
// The Atom feed intentionally does NOT use this — it stays host-agnostic.
module.exports = function () {
  return {
    url: (process.env.SITE_URL || "https://atlas.credimi.io").replace(
      /\/+$/,
      "",
    ),
    name: "EUDI Trust & Conformance Atlas",
    org: "Credimi / Forkbomb BV",
    orgUrl: "https://credimi.io",
  };
};

// Site metadata for surfaces that require absolute URLs (canonical,
// Open Graph, JSON-LD, sitemap, robots and Atom feed).
// Override the production origin with SITE_URL for local or other hosts.
module.exports = function () {
  return {
    url: (process.env.SITE_URL || "https://atlas.credimi.io").replace(
      /\/+$/,
      "",
    ),
    name: "EUDI Trust & Conformance Atlas",
    // Marketing copy rounds the catalogue up instead of pinning an exact count
    // that changes with every review; exact totals stay on data-driven pages.
    documentsLabel: "200+",
    referencesLabel: "~300",
    fcafLabel: "~700",
    glossaryLabel: "~70",
    org: "Credimi / Forkbomb BV",
    orgUrl: "https://credimi.io",
  };
};

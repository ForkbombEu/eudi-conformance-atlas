// Canonical site origin for absolute URLs in the Atom feed and other
// non-HTML surfaces. Defaults to the GitHub Pages project site; override with
// SITE_URL in CI (deploy.yml passes the pages base_url) or locally.
module.exports = function () {
  return {
    url: (process.env.SITE_URL || "https://forkbombeu.github.io").replace(
      /\/+$/,
      "",
    ),
  };
};

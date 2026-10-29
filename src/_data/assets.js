const crypto = require("node:crypto");
const fs = require("node:fs");
const path = require("node:path");

// GitHub Pages serves static assets with a four-hour cache lifetime. Without a
// content hash, a browser that already cached app.css keeps the old design for
// hours after a deploy — exactly what happened when the disclaimer moved.
// Fingerprint both stylesheets so every deploy changes their URL.
const fingerprint = (file) =>
  crypto
    .createHash("sha1")
    .update(fs.readFileSync(path.join(__dirname, "..", file)))
    .digest("hex")
    .slice(0, 10);

module.exports = function () {
  return {
    style: fingerprint("css/style.css"),
    app: fingerprint("css/app.css"),
  };
};

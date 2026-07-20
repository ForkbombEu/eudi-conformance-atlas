const { loadCurrentManifest } = require("./source-of-truth");

module.exports = function () {
  return loadCurrentManifest().manifest;
};

const yaml = require("js-yaml");

module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("src/css");
  eleventyConfig.addPassthroughCopy("src/js");
  eleventyConfig.addPassthroughCopy("src/assets");
  eleventyConfig.addPassthroughCopy("src/fonts");
  eleventyConfig.addPassthroughCopy({ "data": "data" });
  eleventyConfig.addPassthroughCopy({ "content": "content" });

  eleventyConfig.addFilter("toYaml", (obj) => yaml.dump(obj, { lineWidth: -1 }));
  eleventyConfig.addFilter("toJson", (obj) => JSON.stringify(obj, null, 2));

  eleventyConfig.addFilter("dateEU", (d) => {
    if (!d) return "";
    const date = new Date(d);
    return `${String(date.getDate()).padStart(2, "0")}/${String(date.getMonth() + 1).padStart(2, "0")}/${date.getFullYear()}`;
  });

  eleventyConfig.addFilter("truncate", (str, len) => {
    if (!str) return "";
    return str.length > len ? str.slice(0, len) + "…" : str;
  });

  eleventyConfig.addFilter("sourceTypeClass", (type) => {
    const map = {
      regulation: "badge-legal",
      implementing_regulation: "badge-legal",
      implementing_decision: "badge-legal",
      directive: "badge-legal",
      consolidated_regulation: "badge-legal",
      recommendation: "badge-legal",
      architecture_reference_framework: "badge-architecture",
      project_working_documentation: "badge-architecture",
      etsi_standard: "badge-etsi",
      openid_spec: "badge-protocol",
      iso_standard: "badge-iso",
    };
    return map[type] || "badge-neutral";
  });

  eleventyConfig.addFilter("sourceTypeLabel", (type) => {
    const map = {
      regulation: "Regulation",
      implementing_regulation: "Implementing Regulation",
      implementing_decision: "Implementing Decision",
      directive: "Directive",
      consolidated_regulation: "Consolidated Regulation",
      recommendation: "Recommendation",
      architecture_reference_framework: "ARF",
      project_working_documentation: "WE BUILD",
      etsi_standard: "ETSI Standard",
      openid_spec: "OpenID / OAuth",
      iso_standard: "ISO Standard",
    };
    return map[type] || type;
  });

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      data: "_data",
    },
    pathPrefix: "/eudi-conformance-atlas/",
    templateFormats: ["njk", "md", "html"],
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
  };
};

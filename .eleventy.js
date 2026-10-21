const yaml = require("js-yaml");
const { types } = require("./src/_data/docTypes");

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("src/css");
  eleventyConfig.addPassthroughCopy("src/js");
  eleventyConfig.addPassthroughCopy("src/assets");
  eleventyConfig.addPassthroughCopy("src/fonts");
  eleventyConfig.addPassthroughCopy({ data: "data" });
  eleventyConfig.addPassthroughCopy({ content: "content" });

  eleventyConfig.addFilter("toYaml", (obj) =>
    yaml.dump(obj, { lineWidth: -1 }),
  );
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

  eleventyConfig.addFilter("sourceTypeClass", (type) =>
    types[type] ? types[type].badge : "badge-neutral",
  );
  eleventyConfig.addFilter("sourceTypeLabel", (type) =>
    types[type] ? types[type].label : type,
  );

  // status_date is YYYY, YYYY-MM or YYYY-MM-DD; render without inventing precision.
  eleventyConfig.addFilter("statusDate", (value) => {
    if (!value) return "";
    const [year, month, day] = String(value).split("-");
    if (!month) return year;
    const monthName = MONTHS[Number(month) - 1];
    return day ? `${Number(day)} ${monthName} ${year}` : `${monthName} ${year}`;
  });

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      data: "_data",
    },
    pathPrefix: process.env.PATH_PREFIX || "/",
    templateFormats: ["njk", "md", "html"],
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
  };
};

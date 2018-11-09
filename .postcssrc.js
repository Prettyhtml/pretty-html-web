const purgecss = require("@fullhuman/postcss-purgecss");
const autoprefixer = require("autoprefixer");
const whitelister = require("purgecss-whitelister");
const prismcss = whitelister("./src/assets/styles.css");
module.exports = {
  plugins: [
    require("tailwindcss")("./tailwind.js"),
    process.env.NODE_ENV === "production" &&
      purgecss({
        content: ["./src/**/*.vue"],
        whitelist: ["html", "body"].concat(prismcss),
        extractors: [
          {
            extractor: class TailwindExtractor {
              static extract(content) {
                return content.match(/[A-z0-9-:/]+/g) || [];
              }
            },
            extensions: ["vue"],
          },
        ],
      }),
    autoprefixer,
  ],
};

const fs = require("fs");
const path = require("path");
const browserify = require("browserify");
const uglify = require("uglify-es");

const pkgName = "@starptech/prettyhtml";
const pkgFileName = "prettyhtml.browserified.min.js";
const pkgPath = path.resolve(__dirname, "../public/" + pkgFileName);
const umdName = "prettyhtml";

const b = browserify([require.resolve(pkgName)], {
  standalone: umdName
});
// ignore prettier
b.ignore("prettier");

b.bundle((err, buf) => {
  if (err) console.log(err);
  try {
    let bundledCode = buf.toString();
    const minifiedCode = uglify.minify(bundledCode).code;
    fs.writeFileSync(pkgPath, minifiedCode, "utf-8");
  } catch (error) {
    console.log(error);
  }
});

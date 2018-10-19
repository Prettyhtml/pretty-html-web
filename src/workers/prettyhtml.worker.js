/* global importScripts prettyhtml */
importScripts("prettyhtml.browserified.min.js");

export function run(code, opts) {
  const vFile = prettyhtml(code, opts);
  return vFile.contents;
}

/* global importScripts prettyhtml */
importScripts("prettyhtml.browserified.min.js");

export function run(code, opts) {
  const vFile = prettyhtml(code, opts);
  // TODO: Show vfile messages e.g warnings in the debug section
  return vFile.contents;
}

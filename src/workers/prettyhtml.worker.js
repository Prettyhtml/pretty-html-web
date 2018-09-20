/* global importScripts prettyhtml */
importScripts("prettyhtml.browserified.min.js");

export function run(code, opts) {
  const result = prettyhtml(code, opts);
  return result;
}

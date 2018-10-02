import startPrettyHtml from "workerize-loader!./prettyhtml.worker.js";

let prettyhtmlWorker = null;
// todo: prettier worker

export function getWorkers() {
  if (prettyhtmlWorker === null) {
    // eslint-disable-next-line no-console
    console.log("[pretty-html-worker]: Worker hasn't initialized yet.");
  }
  return {
    prettyhtml: prettyhtmlWorker
  };
}

export function startWorkers() {
  prettyhtmlWorker = startPrettyHtml();
}

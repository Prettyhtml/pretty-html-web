//console.log("SW EVENTS LOADED!");
self.addEventListener("message", e => {
  const replyPort = e.ports[0];
  const data = e.data;
  if (!data || !replyPort) return;
  if (replyPort && data.action === "skipWaiting") {
    e.waitUntil(
      self
        .skipWaiting()
        .then(
          () => replyPort.postMessage({ error: null }),
          error => replyPort.postMessage({ error })
        )
    );
  }
});

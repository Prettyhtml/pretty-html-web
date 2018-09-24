/* eslint-disable no-console */

import { register } from "register-service-worker";

const skipWaiting = registration => {
  const worker = registration.waiting;
  if (!worker) {
    return Promise.resolve();
  }

  console.log("[SW] Doing worker.skipWaiting().");
  return new Promise((resolve, reject) => {
    const channel = new MessageChannel();

    channel.port1.onmessage = event => {
      console.log("[SW] Done worker.skipWaiting().");
      if (event.data.error) {
        reject(event.data.error);
      } else {
        resolve(event.data);
      }
    };

    worker.postMessage({ action: "skipWaiting" }, [channel.port2]);
  });
};

let snackbar = null;
let swe = null;
let reloads = () => {
  skipWaiting(swe)
    .then(() => {
      window.location.reload();
    })
    .catch(err => {
      console.error(err);
    });
};
function showSnackbar() {
  if (snackbar == null) {
    snackbar = document.createElement("div");
    document.body.appendChild(snackbar);
  }

  snackbar.innerHTML = `
   <div
    class="sw-snackbar"
    style="background:#323232; color:#fff; width: 100%; max-width: 344px; height:48px; padding: 1rem; border-radius:2px; font-size: 1em; position:fixed; right:1rem; bottom: 1rem; display:flex; align-items:center; justify-content:space-between;"
  >
    <span>New content is available.</span>
    <button
      style="background:none; color:#2ecc71; font-size: 0.875em; letter-spacing:.08929em; border:none; outline:none; text-transform: uppercase; cursor: pointer;"
    >Reload</button>
  </div>`;
  snackbar.addEventListener("click", e => {
    if (e.target.nodeName === "BUTTON") {
      reloads();
    }
  });
}

if (process.env.NODE_ENV === "production") {
  register(`${process.env.BASE_URL}service-worker.js`, {
    ready() {
      console.log(
        "[SW] App is being served from cache by a service worker.\n" +
          "For more details, visit https://goo.gl/AFskqB"
      );
    },
    cached() {
      console.log("[SW] Content has been cached for offline use.");
    },
    updated(registration) {
      console.log("[SW] New content is available; please refresh!.");
      swe = registration;
      showSnackbar();
    },
    offline() {
      console.log(
        "[SW] No internet connection found. App is running in offline mode."
      );
    },
    error(error) {
      console.error("[SW] Error during service worker registration:", error);
    }
  });
}

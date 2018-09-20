import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import "tailwindcss/dist/tailwind.css";

import "prismjs";
// import "prismjs/themes/prism-tomorrow.css";
Vue.config.productionTip = false;

new Vue({
  render: h => h(App)
}).$mount("#app");

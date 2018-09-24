/* global process */
module.exports = {
  devServer: {
    port: 4444
  },
  pwa: {
    themeColor: "#606f7b",
    workboxOptions: {
      importScripts: ["sw-events.js"]
    }
  },
  configureWebpack: config => {
    config.output["globalObject"] = "this";
  }
};

"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const common_vendor = require("./common/vendor.js");
if (!Math) {
  "./pages/index/index.js";
  "./pages/about/about.js";
  "./pages/activity/activity.js";
  "./pages/index/deputy_index/test/test.js";
  "./pages/index/deputy_index/publish/publish.js";
  "./pages/edit/edit.js";
  "./pages/lectureDetail/lectureDetail.js";
  "./pages/index/deputy_index/locationClockin/locationClockin.js";
  "./pages/index/deputy_index/moreExciting/moreExciting.js";
  "./pages/index/deputy_index/obtainLocation/obtainLocation.js";
  "./pages/test/test.js";
  "./pages/mypublish/mypublish.js";
  "./pages/waitjoin/waitjoin.js";
}
const _sfc_main = {
  onLaunch: function() {
    console.log("App Launch");
  },
  onShow: function() {
    console.log("App Show");
  },
  onHide: function() {
    console.log("App Hide");
  }
};
const App = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/Aser/Graduation_project/Lecture/App.vue"]]);
function createApp() {
  const app = common_vendor.createSSRApp(App);
  return {
    app
  };
}
createApp().app.mount("#app");
exports.createApp = createApp;

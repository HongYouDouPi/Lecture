"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "edit",
  setup(__props) {
    const genderSelcet = common_vendor.ref(["男", "女", "神秘"]);
    const studentId = common_vendor.ref("");
    const departmentClass = common_vendor.ref("");
    const phoneNumber = common_vendor.ref("");
    const email = common_vendor.ref("");
    function handleGenderChange(event) {
      const selectedIndex = event.detail.value;
      console.log("Selected gender:", genderSelcet.value[selectedIndex]);
    }
    function saveInformation() {
      console.log("Saving information...");
    }
    return (_ctx, _cache) => {
      return {
        a: _ctx.myImgUrl,
        b: common_vendor.t(_ctx.name),
        c: genderSelcet.value,
        d: common_vendor.o(handleGenderChange),
        e: studentId.value,
        f: common_vendor.o(($event) => studentId.value = $event.detail.value),
        g: departmentClass.value,
        h: common_vendor.o(($event) => departmentClass.value = $event.detail.value),
        i: phoneNumber.value,
        j: common_vendor.o(($event) => phoneNumber.value = $event.detail.value),
        k: email.value,
        l: common_vendor.o(($event) => email.value = $event.detail.value),
        m: common_vendor.o(saveInformation)
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/Aser/Graduation_project/Lecture/pages/edit/edit.vue"]]);
wx.createPage(MiniProgramPage);

"use strict";
const common_vendor = require("../../common/vendor.js");
const my_image_url = "https://www.freeimg.cn/i/2024/02/07/65c2f64ebb38d.png";
const _sfc_main = {
  __name: "edit",
  setup(__props) {
    const username = common_vendor.ref("");
    const gender = common_vendor.ref("");
    const student_id = common_vendor.ref("");
    const college = common_vendor.ref("");
    const phone_number = common_vendor.ref("");
    const email = common_vendor.ref("");
    const genderSelcet = common_vendor.ref(["男", "女", "神秘"]);
    function handleGenderChange(event) {
      const selectedIndex = event.detail.value;
      console.log("Selected gender:", genderSelcet.value[selectedIndex]);
    }
    function saveInformation() {
      common_vendor.index.request({
        url: "http://127.0.0.1:8080/user_edit",
        method: "POST",
        data: {}
      });
      console.log("Saving information...");
    }
    common_vendor.onMounted(() => {
      common_vendor.index.request({
        url: "http://127.0.0.1:8080/userInfo",
        method: "GET",
        data: {},
        success(res) {
          var data = res;
          username.value = data.user_name;
          gender.value = data.gender;
          my_image_url.value = data.my_image_url;
          student_id.value = data.student_id;
          college.value = data.college;
          phone_number.value = data.phone_number;
          email.value = data.email;
        }
      });
    });
    return (_ctx, _cache) => {
      return {
        a: _ctx.my_image_url,
        b: common_vendor.t(username.value),
        c: genderSelcet.value,
        d: common_vendor.o(handleGenderChange),
        e: _ctx.studentId,
        f: common_vendor.o(($event) => _ctx.studentId = $event.detail.value),
        g: _ctx.departmentClass,
        h: common_vendor.o(($event) => _ctx.departmentClass = $event.detail.value),
        i: _ctx.phoneNumber,
        j: common_vendor.o(($event) => _ctx.phoneNumber = $event.detail.value),
        k: email.value,
        l: common_vendor.o(($event) => email.value = $event.detail.value),
        m: common_vendor.o(saveInformation)
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/Aser/Graduation_project/Lecture/pages/edit/edit.vue"]]);
wx.createPage(MiniProgramPage);

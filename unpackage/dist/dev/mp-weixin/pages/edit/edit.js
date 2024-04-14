"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "edit",
  setup(__props) {
    const userInfo = common_vendor.reactive({
      user_name: "",
      gender: "神秘",
      // my_image_url: 'https://www.freeimg.cn/i/2024/02/07/65c2f64ebb38d.png',
      student_id: "",
      college: "",
      phone_number: "",
      email: ""
      // genderSelcet: ['男', '女', '神秘'],
    });
    const genderSelcet = common_vendor.reactive(["男", "女", "神秘"]);
    common_vendor.ref("https://www.freeimg.cn/i/2024/02/07/65c2f64ebb38d.png");
    const editedUserName = common_vendor.ref(userInfo.user_name);
    const isEditing = common_vendor.ref(false);
    function resetUserInfo() {
      userInfo.user_name = "";
      userInfo.gender = "神秘";
      userInfo.student_id = "";
      userInfo.college = "";
      userInfo.phone_number = "";
      userInfo.email = "";
    }
    function handleGenderChange(event) {
      const selectedIndex = event.detail.value;
      userInfo.gender = genderSelcet[selectedIndex];
      console.log("Selected gender:", userInfo.gender);
    }
    function startEditing() {
      isEditing.value = true;
    }
    function saveUserName() {
      if (editedUserName.value != "") {
        userInfo.user_name = editedUserName.value;
      }
      isEditing.value = false;
    }
    function saveInformation() {
      common_vendor.index.request({
        url: "http://127.0.0.1:8080/userEdit",
        method: "POST",
        data: { ...userInfo },
        // 展开运算符来复制userInfo对象
        success(res) {
          common_vendor.index.showToast({
            title: "修改成功",
            icon: "none"
          });
          resetUserInfo();
          common_vendor.index.navigateBack({
            delta: 1
            // 返回的页面数，这里假设返回上一页
          });
        },
        fail(err) {
          console.error("Failed to save information:", err);
          common_vendor.index.showModal({
            title: "修改失败",
            content: "无法连接到服务器",
            showCancel: false
          });
        }
      });
    }
    common_vendor.onLoad((e) => {
      userInfo.student_id = e.student_id;
      console.log("当前用户", userInfo.student_id);
    });
    common_vendor.onMounted(() => {
      const query = userInfo.student_id ? `?student_id=${userInfo.student_id}` : "";
      common_vendor.index.request({
        url: `http://127.0.0.1:8080/userInfo${query}`,
        method: "GET",
        success(res) {
          Object.assign(userInfo, res.data);
        },
        fail(err) {
          console.error("Failed to fetch user information:", err);
        }
      });
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: userInfo.my_image_url,
        b: !isEditing.value
      }, !isEditing.value ? {
        c: common_vendor.t(userInfo.user_name),
        d: common_vendor.o(startEditing)
      } : {}, {
        e: isEditing.value
      }, isEditing.value ? {
        f: common_vendor.o(saveUserName),
        g: editedUserName.value,
        h: common_vendor.o(($event) => editedUserName.value = $event.detail.value)
      } : {}, {
        i: common_vendor.t(userInfo.gender || "请选择"),
        j: genderSelcet,
        k: common_vendor.o(handleGenderChange),
        l: userInfo.college,
        m: common_vendor.o(($event) => userInfo.college = $event.detail.value),
        n: userInfo.phone_number,
        o: common_vendor.o(($event) => userInfo.phone_number = $event.detail.value),
        p: userInfo.email,
        q: common_vendor.o(($event) => userInfo.email = $event.detail.value),
        r: common_vendor.o(saveInformation)
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/Aser/Graduation_project/Lecture/pages/edit/edit.vue"]]);
wx.createPage(MiniProgramPage);

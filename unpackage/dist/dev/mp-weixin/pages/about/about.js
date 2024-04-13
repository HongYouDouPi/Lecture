"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "about",
  setup(__props) {
    const isLoggedIn = common_vendor.ref(false);
    const showLoginModal = common_vendor.ref(false);
    const student_id = common_vendor.ref("");
    const password = common_vendor.ref("");
    const my_image_url = common_vendor.ref("");
    const defaultImg = common_vendor.ref("https://www.freeimg.cn/i/2024/02/07/65c2f64ebb38d.png");
    const user_name = common_vendor.ref("游客");
    my_image_url.value = defaultImg.value;
    const list = common_vendor.ref([
      { name: "全部参加", pic: "https://www.freeimg.cn/i/2024/02/15/65cd870a725bc.png", path: "/pages/alljoin/alljoin" },
      { name: "已完成", pic: "https://www.freeimg.cn/i/2024/02/15/65cd860bcb186.png", path: "/pages/finished/finished" },
      { name: "待参加", pic: "https://www.freeimg.cn/i/2024/02/15/65cd860be609d.png", path: "/pages/waitjoin/waitjoin" }
    ]);
    function navigateTo_mypublish() {
      common_vendor.index.navigateTo({
        url: "/pages/mypublish/mypublish"
      });
    }
    function navigateTo_edit() {
      common_vendor.index.navigateTo({
        url: "/pages/edit/edit"
      });
    }
    function submitLogin() {
      console.log("登录信息：", student_id.value, password.value);
      showLoginModal.value = false;
      common_vendor.wx$1.getUserInfo({
        success: function(res) {
          var userInfo = res.userInfo;
          user_name.value = userInfo.nickName;
          my_image_url.value = userInfo.avatarUrl;
          console.log("用户昵称：" + user_name.value);
          console.log("用户头像：" + my_image_url.value);
        },
        fail: function(res) {
          console.log("用户拒绝授权");
        }
      });
      common_vendor.index.request({
        url: "http://127.0.0.1:8080/lecturelogin",
        method: "POST",
        data: {
          student_id: student_id.value,
          password: password.value,
          user_name: user_name.value,
          my_image_url: my_image_url.value
        },
        dataType: "text",
        // 指定返回数据类型为文本
        success(res) {
          console.log("登陆成功", res.data);
        },
        fail(err) {
          console.error("请求失败", err);
        }
      });
    }
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: my_image_url.value,
        b: common_vendor.f(list.value, (item, index, i0) => {
          return {
            a: item.pic,
            b: common_vendor.t(item.name),
            c: index,
            d: common_vendor.o(($event) => _ctx.navigateTo(item.path), index)
          };
        }),
        c: common_vendor.o(navigateTo_mypublish),
        d: common_vendor.o(navigateTo_edit),
        e: !isLoggedIn.value
      }, !isLoggedIn.value ? {
        f: common_vendor.o(($event) => showLoginModal.value = true)
      } : {}, {
        g: isLoggedIn.value
      }, isLoggedIn.value ? {} : {}, {
        h: showLoginModal.value
      }, showLoginModal.value ? {
        i: student_id.value,
        j: common_vendor.o(($event) => student_id.value = $event.detail.value),
        k: password.value,
        l: common_vendor.o(($event) => password.value = $event.detail.value),
        m: common_vendor.o(submitLogin)
      } : {}, {
        n: my_image_url.value,
        o: common_vendor.t(user_name.value + student_id.value)
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/Aser/Graduation_project/Lecture/pages/about/about.vue"]]);
wx.createPage(MiniProgramPage);

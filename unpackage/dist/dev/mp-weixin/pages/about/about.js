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
    const insert_student_id = common_vendor.ref("");
    const insert_password = common_vendor.ref("");
    const list = common_vendor.ref([
      {
        name: "全部参加",
        pic: "https://www.freeimg.cn/i/2024/02/15/65cd870a725bc.png",
        path: "/pages/alljoin/alljoin"
      },
      {
        name: "已完成",
        pic: "https://www.freeimg.cn/i/2024/02/15/65cd860bcb186.png",
        path: "/pages/finished/finished"
      },
      {
        name: "待参加",
        pic: "https://www.freeimg.cn/i/2024/02/15/65cd860be609d.png",
        path: "/pages/waitjoin/waitjoin"
      }
    ]);
    function navigateTo(path2) {
      if (isLoggedIn.value) {
        common_vendor.index.navigateTo({
          url: path2
        });
      } else {
        console.log(`User is not logged in. Cannot navigate from ${path2}.`);
      }
    }
    function navigateTo_connect() {
      if (isLoggedIn.value) {
        common_vendor.index.navigateTo({
          url: path
        });
      } else {
        console.log(`User is not logged in. Cannot navigate from ${source}.`);
      }
    }
    function navigateTo_share() {
    }
    function navigateTo_mypublish() {
      common_vendor.index.navigateTo({
        url: "/pages/mypublish/mypublish"
      });
    }
    function navigateTo_edit() {
      common_vendor.index.navigateTo({
        // url: '/pages/edit/edit',
        url: `/pages/edit/edit?student_id=${student_id.value}`
      });
    }
    function submitLogin() {
      showLoginModal.value = false;
      common_vendor.index.request({
        url: "http://127.0.0.1:8080/lecturelogin",
        method: "POST",
        data: {
          student_id: insert_student_id.value,
          password: insert_password.value
        },
        success(res) {
          console.log("登录信息：", res);
          if (res.statusCode === 200) {
            isLoggedIn.value = !isLoggedIn.value;
            student_id.value = insert_student_id.value;
            password.value = insert_password.value;
            user_name.value = res.data.user_name;
          } else if (res.statusCode === 401) {
            common_vendor.index.showToast({
              title: "用户名或密码错误",
              icon: "none"
            });
          } else {
            common_vendor.index.showToast({
              title: "登录失败，请重试",
              icon: "none"
            });
          }
        },
        fail(err) {
          student_id = "";
          password = "";
          console.error("登陆失败", err);
        }
      });
    }
    function unLoginIn() {
      isLoggedIn.value = !isLoggedIn.value;
      common_vendor.index.showModal({
        title: "退出成功",
        content: `山高路远,${user_name.value}等你`,
        showCancel: false
      });
      showLoginModal.value = false;
      student_id.value = "";
      password.value = "";
      my_image_url.value = defaultImg.value;
      user_name.value = "游客";
    }
    common_vendor.onShow(() => {
      const query = student_id.value ? `?student_id=${student_id.value}` : "";
      common_vendor.index.request({
        url: `http://127.0.0.1:8080/userInfo${query}`,
        method: "GET",
        success(res) {
          if (res.data.user_name) {
            user_name.value = res.data.user_name;
            console.log("页面新信息:", res.data);
          } else {
            console.log("先登录叭!");
          }
        },
        fail(err) {
          console.error("Failed to fetch user information:", err);
        }
      });
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: my_image_url.value,
        b: common_vendor.f(list.value, (item, index, i0) => {
          return {
            a: item.pic,
            b: common_vendor.t(item.name),
            c: index,
            d: common_vendor.o(($event) => navigateTo(item.path), index)
          };
        }),
        c: common_vendor.o(navigateTo_mypublish),
        d: common_vendor.o(navigateTo_edit),
        e: common_vendor.o(navigateTo_connect),
        f: common_vendor.o(navigateTo_share),
        g: !isLoggedIn.value
      }, !isLoggedIn.value ? {
        h: common_vendor.o(($event) => showLoginModal.value = true)
      } : {}, {
        i: isLoggedIn.value
      }, isLoggedIn.value ? {
        j: common_vendor.o(unLoginIn)
      } : {}, {
        k: showLoginModal.value
      }, showLoginModal.value ? {
        l: insert_student_id.value,
        m: common_vendor.o(($event) => insert_student_id.value = $event.detail.value),
        n: insert_password.value,
        o: common_vendor.o(($event) => insert_password.value = $event.detail.value),
        p: common_vendor.o(submitLogin)
      } : {}, {
        q: my_image_url.value,
        r: common_vendor.t(user_name.value)
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/Aser/Graduation_project/Lecture/pages/about/about.vue"]]);
wx.createPage(MiniProgramPage);

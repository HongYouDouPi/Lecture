"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "about",
  setup(__props) {
    const store = common_vendor.useStore();
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
        path: "all"
      },
      {
        name: "已完成",
        pic: "https://www.freeimg.cn/i/2024/02/15/65cd860bcb186.png",
        path: "finish"
      },
      {
        name: "待参加",
        pic: "https://www.freeimg.cn/i/2024/02/15/65cd860be609d.png",
        path: "jion"
      }
    ]);
    function showLogin() {
      common_vendor.index.showModal({
        title: "先登录叭！",
        content: "登陆解锁更多功能",
        showCancel: false
      });
    }
    function showUnline() {
      common_vendor.index.showModal({
        title: "功能待开发！",
        content: "期待后续上线叭！",
        showCancel: false
      });
    }
    function navigateTo(path) {
      if (isLoggedIn.value) {
        common_vendor.index.navigateTo({
          url: `/pages/join/join?style=${path}&student_id=${student_id.value}`
        });
      } else {
        showLogin();
        console.log(`User is not logged in. Cannot navigate from ${path}.`);
      }
    }
    function navigateTo_connect() {
      if (isLoggedIn.value) {
        showUnline();
      } else {
        showLogin();
        console.log(`User is not logged in. Cannot navigate`);
      }
    }
    function navigateTo_share() {
      if (isLoggedIn.value) {
        showUnline();
      } else {
        showLogin();
        console.log(`User is not logged in. Cannot navigate`);
      }
    }
    function navigateTo_mypublish() {
      if (isLoggedIn.value) {
        common_vendor.index.navigateTo({
          url: "/pages/mypublish/mypublish"
        });
      } else {
        showLogin();
        console.log(`User is not logged in. Cannot navigate`);
      }
    }
    function navigateTo_edit() {
      if (isLoggedIn.value) {
        common_vendor.index.navigateTo({
          url: `/pages/edit/edit?student_id=${student_id.value}`
        });
      } else {
        showLogin();
        console.log(`User is not logged in. Cannot navigate `);
      }
    }
    function navigateTo_star() {
      if (isLoggedIn.value) {
        common_vendor.index.navigateTo({
          url: `/pages/star/star?student_id=${student_id.value}`
        });
      } else {
        showLogin();
        console.log(`User is not logged in. Cannot navigate`);
      }
    }
    function submitLogin() {
      showLoginModal.value = false;
      common_vendor.index.request({
        url: "http://127.0.0.1:8080/lecturelogin",
        method: "POST",
        data: {
          student_id: insert_student_id.value,
          password: insert_password.value,
          user_name: "游客"
        },
        success(res) {
          console.log("登录信息：", res);
          if (res.statusCode === 200) {
            isLoggedIn.value = !isLoggedIn.value;
            student_id.value = insert_student_id.value;
            password.value = insert_password.value;
            user_name.value = res.data.user_name;
            my_image_url.value = res.data.my_image_url;
            store.commit("setStudentId", insert_student_id.value);
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
      store.commit("setStudentId", "");
    }
    common_vendor.onShow(() => {
      const query = student_id.value ? `?student_id=${student_id.value}` : "";
      common_vendor.index.request({
        url: `http://127.0.0.1:8080/userInfo${query}`,
        method: "GET",
        success(res) {
          if (res.data.user_name) {
            user_name.value = res.data.user_name;
            my_image_url.value = res.data.my_image_url;
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
        c: common_vendor.o(navigateTo_star),
        d: common_vendor.o(navigateTo_mypublish),
        e: common_vendor.o(navigateTo_edit),
        f: common_vendor.o(navigateTo_connect),
        g: common_vendor.o(navigateTo_share),
        h: !isLoggedIn.value
      }, !isLoggedIn.value ? {
        i: common_vendor.o(($event) => showLoginModal.value = true)
      } : {}, {
        j: isLoggedIn.value
      }, isLoggedIn.value ? {
        k: common_vendor.o(unLoginIn)
      } : {}, {
        l: showLoginModal.value
      }, showLoginModal.value ? {
        m: insert_student_id.value,
        n: common_vendor.o(($event) => insert_student_id.value = $event.detail.value),
        o: insert_password.value,
        p: common_vendor.o(($event) => insert_password.value = $event.detail.value),
        q: common_vendor.o(submitLogin)
      } : {}, {
        r: my_image_url.value,
        s: common_vendor.t(user_name.value)
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/Aser/Uniapp_project/Lecture/pages/about/about.vue"]]);
wx.createPage(MiniProgramPage);

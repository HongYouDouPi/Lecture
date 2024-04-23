"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "lectureDetail",
  setup(__props) {
    const store = common_vendor.useStore();
    const lectureInfo = common_vendor.reactive({
      lecture_name: "宣讲会",
      lecture_time: "2024/4/10",
      lecture_image_url: "../../static/image/user/boy.png",
      // 其他字段...
      lecture_id: null,
      student_id: null,
      location: "",
      latitude: null,
      longitude: null,
      lecture_introduction: "",
      lecture_announcement: "",
      viewed: null,
      style: null,
      college: "计算机院"
    });
    const showDetail = common_vendor.ref(true);
    const showList = common_vendor.ref(false);
    const isBooking = common_vendor.ref(false);
    const ParticipationList = common_vendor.reactive([]);
    const hasHeld = common_vendor.computed(() => {
      const now = /* @__PURE__ */ new Date();
      const lectureDate = new Date(lectureInfo.lecture_time.replace(/\//g, "-"));
      return now > lectureDate;
    });
    function handleEnrollClick() {
      if (!isBooking.value) {
        enroll();
        console.log("Successful enrolled");
      } else {
        unenroll();
        console.log("Already enrolled");
      }
    }
    function IsBooking() {
      let studentId = store.getters.studentId;
      common_vendor.index.request({
        url: "http://127.0.0.1:8080/booking/search",
        method: "GET",
        data: {
          student_id: studentId,
          lecture_id: lectureInfo.lecture_id
        },
        success: function(res) {
          if (res.statusCode === 200) {
            if (res.data.isBooking) {
              isBooking.value = true;
              console.log("预约状态", isBooking.value);
            } else {
              isBooking.value = false;
              console.log("预约状态", isBooking.value);
            }
          } else {
            console.error("搜索预约出错：", res.statusCode);
          }
        },
        fail: function(err) {
          console.error("请求失败：", err);
        }
      });
    }
    function getView(e) {
      if (e === "detail") {
        showDetail.value = true;
        showList.value = false;
      } else {
        showDetail.value = false;
        showList.value = true;
      }
    }
    function enroll() {
      let studentId = store.getters.studentId;
      if (studentId) {
        const query = `?student_id=${studentId}&lecture_id=${lectureInfo.lecture_id}`;
        console.log("query", query);
        common_vendor.index.request({
          url: `http://127.0.0.1:8080/booking/add${query}`,
          method: "POST",
          success: (res) => {
            if (res.statusCode === 200) {
              common_vendor.index.showModal({
                title: "报名成功",
                icon: "success",
                duration: 2e3,
                showCancel: false
              });
              isBooking.value = true;
            }
          },
          fail: () => {
            common_vendor.index.showToast({
              title: "请求失败，请稍后再试",
              icon: "none",
              duration: 2e3
            });
          }
        });
      } else {
        common_vendor.index.showToast({
          title: "请先登陆",
          icon: "none",
          duration: 2e3
        });
      }
    }
    function unenroll() {
      let studentId = store.getters.studentId;
      if (studentId) {
        const query = `?student_id=${studentId}&lecture_id=${lectureInfo.lecture_id}`;
        console.log("query", query);
        common_vendor.index.request({
          url: `http://127.0.0.1:8080/booking/del${query}`,
          method: "POST",
          success: (res) => {
            if (res.statusCode === 200) {
              common_vendor.index.showModal({
                title: "取消报名成功",
                icon: "success",
                duration: 2e3,
                showCancel: false
              });
              isBooking.value = false;
            }
          },
          fail: () => {
            common_vendor.index.showToast({
              title: "请求失败，请稍后再试",
              icon: "none",
              duration: 2e3
            });
          }
        });
      } else {
        common_vendor.index.showToast({
          title: "请先登陆",
          icon: "none",
          duration: 2e3
        });
      }
    }
    function LectureInfo() {
      const query = lectureInfo.lecture_id ? `?lecture_id=${lectureInfo.lecture_id}` : "";
      common_vendor.index.request({
        url: `http://localhost:8080/lecturesInfo${query}`,
        method: "GET",
        // data: {
        //     lecture_id: lectureId
        // },
        success: (res) => {
          console.log("获得数据", res.data);
          if (res.data.result && res.data.result.length > 0) {
            const data = res.data.result[0];
            lectureInfo.lecture_id = data.lecture_id;
            lectureInfo.lecture_name = data.lecture_name;
            lectureInfo.student_id = data.student_id;
            lectureInfo.lecture_time = data.lecture_time;
            lectureInfo.lecture_image_url = data.lecture_image_url;
            lectureInfo.location = data.location;
            lectureInfo.latitude = data.latitude;
            lectureInfo.longitude = data.longitude;
            lectureInfo.lecture_introduction = data.lecture_introduction;
            lectureInfo.lecture_announcement = data.lecture_announcement;
            lectureInfo.viewed = data.viewed;
            lectureInfo.style = data.style;
            const dateTime = new Date(lectureInfo.lecture_time);
            let year = dateTime.getFullYear();
            let month = dateTime.getMonth() + 1;
            let day = dateTime.getDate();
            lectureInfo.lecture_time = `${year}-${month < 10 ? "0" + month : month}-${day < 10 ? "0" + day : day}`;
          }
          fetchStudentId();
        },
        fail: (err) => {
          console.error("请求失败", err);
        }
      });
    }
    function fetchStudentId() {
      common_vendor.index.request({
        url: `http://localhost:8080/bookInfo/studentId?lecture_id=${lectureInfo.lecture_id}`,
        method: "GET",
        success: (res) => {
          ParticipationList.value = res.data;
          console.log("ParticipationList", ParticipationList.value);
        },
        fail: (err) => {
          console.error("请求studentId失败", err);
        }
      });
    }
    common_vendor.onLoad((e) => {
      const studentId = store.getters.studentId;
      console.log("页面传参:", e, studentId);
      lectureInfo.lecture_id = e.lecture_id;
    });
    common_vendor.onMounted(() => {
      LectureInfo();
      IsBooking();
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: lectureInfo.lecture_image_url,
        b: common_vendor.t(lectureInfo.lecture_name),
        c: common_vendor.t(lectureInfo.lecture_time),
        d: common_vendor.t(lectureInfo.college),
        e: common_vendor.t(hasHeld.value ? "已举办" : "待举办"),
        f: hasHeld.value ? 1 : "",
        g: common_vendor.o(($event) => getView("detail")),
        h: showDetail.value ? 1 : "",
        i: common_vendor.o(($event) => getView("list")),
        j: showList.value ? 1 : "",
        k: showDetail.value
      }, showDetail.value ? {
        l: common_vendor.t(lectureInfo.lecture_announcement),
        m: common_vendor.t(lectureInfo.lecture_introduction)
      } : {}, {
        n: showList.value
      }, showList.value ? {
        o: common_vendor.f(ParticipationList.value, (participant, index, i0) => {
          return {
            a: common_vendor.t(participant.student_id),
            b: index
          };
        })
      } : {}, {
        p: common_vendor.t(isBooking.value ? "已报名" : "立即报名"),
        q: !isBooking.value ? 1 : "",
        r: isBooking.value ? 1 : "",
        s: common_vendor.o(handleEnrollClick)
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-19ce0033"], ["__file", "D:/Aser/Uniapp_project/Lecture/pages/lectureDetail/lectureDetail.vue"]]);
wx.createPage(MiniProgramPage);

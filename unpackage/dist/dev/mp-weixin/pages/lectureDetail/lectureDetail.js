"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "lectureDetail",
  setup(__props) {
    const showDetail = common_vendor.ref(true);
    const showList = common_vendor.ref(false);
    const ParticipationList = common_vendor.reactive([
      { name: "张三", studentId: "20230001" },
      { name: "李四", studentId: "20230002" },
      { name: "王五", studentId: "20230003" },
      { name: "赵六", studentId: "20230004" },
      { name: "孙七", studentId: "20230005" }
    ]);
    function getView(e) {
      if (e === "detail") {
        showDetail.value = true;
        showList.value = false;
      } else {
        showDetail.value = false;
        showList.value = true;
      }
    }
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: _ctx.LectureImage,
        b: common_vendor.t(_ctx.LectureName),
        c: common_vendor.t(_ctx.DateTime),
        d: common_vendor.t(_ctx.CollegeName),
        e: common_vendor.o(($event) => getView("detail")),
        f: showDetail.value ? 1 : "",
        g: common_vendor.o(($event) => getView("list")),
        h: showList.value ? 1 : "",
        i: showDetail.value
      }, showDetail.value ? {} : {}, {
        j: showList.value
      }, showList.value ? {
        k: common_vendor.f(ParticipationList, (participant, index, i0) => {
          return {
            a: common_vendor.t(participant.name),
            b: common_vendor.t(participant.studentId),
            c: index
          };
        })
      } : {});
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-19ce0033"], ["__file", "D:/Aser/Graduation_project/Lecture/pages/lectureDetail/lectureDetail.vue"]]);
wx.createPage(MiniProgramPage);

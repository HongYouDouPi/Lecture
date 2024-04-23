"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const store = common_vendor.useStore();
    const student_id = common_vendor.ref("");
    const reconmmandText = common_vendor.ref("推荐讲座");
    const newText = common_vendor.ref("最新讲座");
    const hotText = common_vendor.ref("热门讲座");
    const lectures = common_vendor.ref([]);
    const hot_lecture = common_vendor.ref([]);
    const new_lecture = common_vendor.ref([]);
    const recommend_lecture = common_vendor.ref([]);
    const typeSelect = common_vendor.ref(["美育", "三创", "经典百书", "其他"]);
    const currentTypeIndex = common_vendor.ref(0);
    const swiper_index = common_vendor.ref(
      [
        {
          id: 1,
          pic: "https://www.freeimg.cn/i/2024/01/31/65b9de8cb4a8f.jpg"
        },
        {
          id: 2,
          pic: "https://www.freeimg.cn/i/2024/01/31/65b9de9a30031.jpg"
        },
        {
          id: 3,
          pic: "https://www.freeimg.cn/i/2024/01/31/65b9de9b7022d.jpg"
        },
        {
          id: 4,
          pic: "https://www.freeimg.cn/i/2024/01/31/65b9de9a57c43.jpg"
        }
      ]
    );
    const function_index = common_vendor.reactive(
      [
        {
          pic: "/static/image/icon/定位打卡.png",
          name: "打卡",
          note_text: "人到心也到",
          url: "/pages/index/deputy_index/locationClockin/locationClockin"
        },
        {
          pic: "/static/image/icon/打招呼.png",
          name: "我要发布",
          note_text: "活动在于你我",
          url: "/pages/index/deputy_index/publish/publish"
        },
        {
          pic: "/static/image/icon/敬请期待.png",
          name: "更多精彩",
          note_text: "敬请期待",
          // 测试页面
          url: "/pages/index/deputy_index/moreExciting/moreExciting"
          // 真实的在下面
          // url: 'deputy_index/moreExciting/moreExciting'
        }
      ]
    );
    function showModal() {
      common_vendor.index.showModal({
        title: "请先登陆",
        content: "! 登陆体验更多功能 !",
        showCancel: false
      });
    }
    function navigateTo(link) {
      common_vendor.index.navigateTo({
        url: link
      });
    }
    function navigaToActivity() {
      common_vendor.index.switchTab({
        url: "/pages/activity/activity"
      });
    }
    function navigateToDetail(item) {
      console.log("跳转页面的id", item.lecture_id);
      common_vendor.index.navigateTo({
        url: `/pages/lectureDetail/lectureDetail?lecture_id=${item.lecture_id}`
      });
    }
    function typeSelectChangeHot(index) {
      currentTypeIndex.value = index;
    }
    const filterRecommend = common_vendor.computed(() => {
      return recommend_lecture.value.filter((item) => item.style === currentTypeIndex.value);
    });
    function formatTime(time) {
      const date = new Date(time);
      const year = date.getFullYear().toString();
      const mouth = (date.getMonth() + 1).toString().padStart(2, "0");
      const day = date.getDate().toString().padStart(2, "0");
      date.getHours().toString().padStart(2, "0");
      date.getMinutes().toString().padStart(2, "0");
      return `${year}-${mouth}-${day}`;
    }
    common_vendor.onShow(() => {
      common_vendor.index.request({
        url: "http://127.0.0.1:8080/lecturesInfo",
        method: "GET",
        success(res) {
          let tempData = res.data.result;
          lectures.value = tempData;
          new_lecture.value = lectures.value.filter((item) => new Date(item.lecture_time) > /* @__PURE__ */ new Date()).sort((a, b) => new Date(a.lecture_time) - new Date(b.lecture_time)).map((item) => ({
            ...item,
            lecture_time: formatTime(item.lecture_time)
            // 格式化时间
          })).slice(0, 8);
          hot_lecture.value = lectures.value.sort((a, b) => b.viewed - a.viewed).map((item) => ({
            ...item,
            lecture_time: formatTime(item.lecture_time)
            // 格式化时间
          })).slice(0, 8);
          recommend_lecture.value = lectures.value.slice(0, 8);
          console.log("All Lecture", lectures.value);
          console.log("New Lecture:", new_lecture.value);
          console.log("Hot Lecture:", hot_lecture.value);
          console.log("Recommend Lecture:", recommend_lecture.value);
        },
        fail(err) {
          common_vendor.index.showToast({
            title: "糟糕 页面走丢了",
            icon: "loading"
          });
          console.error("Failed to fetch lectures:", err);
        }
      });
      student_id.value = store.getters.studentId;
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(swiper_index.value, (item, k0, i0) => {
          return {
            a: item.pic,
            b: item.id
          };
        }),
        b: common_vendor.f(function_index, (item, index, i0) => {
          return {
            a: item.pic,
            b: common_vendor.t(item.name),
            c: common_vendor.t(item.note_text),
            d: common_vendor.n(`vague_${index + 1}`),
            e: index,
            f: common_vendor.n(`function_${index + 1}_item`),
            g: common_vendor.o(($event) => student_id.value ? navigateTo(item.url) : showModal(), index)
          };
        }),
        c: common_vendor.t(hotText.value),
        d: common_vendor.o(navigaToActivity),
        e: common_vendor.f(hot_lecture.value, (item, k0, i0) => {
          return {
            a: item.lecture_image_url,
            b: common_vendor.t(item.lecture_name),
            c: common_vendor.t(item.lecture_time),
            d: common_vendor.o(($event) => navigateToDetail(item), item.id),
            e: item.id
          };
        }),
        f: common_vendor.t(newText.value),
        g: common_vendor.o(navigaToActivity),
        h: common_vendor.f(new_lecture.value, (item, k0, i0) => {
          return {
            a: item.lecture_image_url,
            b: common_vendor.t(item.lecture_name),
            c: common_vendor.t(item.lecture_time),
            d: common_vendor.o(($event) => navigateToDetail(item), item.id),
            e: item.id
          };
        }),
        i: common_vendor.t(reconmmandText.value),
        j: common_vendor.o(navigaToActivity),
        k: common_vendor.f(typeSelect.value, (item, index, i0) => {
          return {
            a: common_vendor.t(item),
            b: currentTypeIndex.value === index ? 1 : "",
            c: common_vendor.o(($event) => typeSelectChangeHot(index))
          };
        }),
        l: common_vendor.f(filterRecommend.value, (item, k0, i0) => {
          return {
            a: item.lecture_image_url,
            b: common_vendor.t(item.lecture_name),
            c: common_vendor.o(($event) => navigateToDetail(item), item.id),
            d: item.id
          };
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/Aser/Uniapp_project/Lecture/pages/index/index.vue"]]);
wx.createPage(MiniProgramPage);

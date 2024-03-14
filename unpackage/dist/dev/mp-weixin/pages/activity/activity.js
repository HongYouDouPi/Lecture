"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  // data里面只能有return的返回值，是用来记录有哪些数据可以被上面调用的 类似于js
  data() {
    return {
      // 屏幕宽高
      WindowHeight: 0,
      WindowWidth: 0,
      //滚动栏高度 动态变化
      scroll_height: 0,
      //显示回到顶部
      showToTop: false,
      //一些图标
      search_img: "https://www.freeimg.cn/i/2024/02/07/65c2f021a2f3f.png",
      shift_img: "https://www.freeimg.cn/i/2024/02/07/65c2f021a1f61.png",
      visit_img: "https://www.freeimg.cn/i/2024/02/07/65c2f021a265e.png",
      time_img: "https://www.freeimg.cn/i/2024/02/07/65c2f021a28a5.png",
      location_img: "https://www.freeimg.cn/i/2024/02/07/65c2f021a2b30.png",
      // 讲座信息
      // 用数组存放中括号表示包含所有数据 大括号表示一个对像
      lecture: [
        { id: 1, name: "宣讲会", time: "2024/2/10", brief: "快来看看准研究生们都具备哪些品质吧！(不超过25个字)", pic: "https://www.freeimg.cn/i/2024/01/31/65b9dea2d7399.jpg", location: "理科南", visitor: "82", way: "线上" },
        { id: 2, name: "茶话会", time: "2024/2/11", brief: "有你up的茶品嘛？", pic: "https://www.freeimg.cn/i/2024/01/31/65b9de9f76e3b.jpg", location: "风雨走廊", visitor: "12", way: "线下" },
        { id: 3, name: "品牌会", time: "2024/2/12", brief: "这些品牌居然是黑榜！", pic: "https://www.freeimg.cn/i/2024/01/31/65b9de9e09908.jpg", location: "北区篮球场", visitor: "10222", way: "线下" },
        { id: 4, name: "研讨会", time: "2024/2/13", brief: "俗话说:俗话说的好！", pic: "https://www.freeimg.cn/i/2024/01/31/65b9de9bc4c2d.jpg", location: "理科北", visitor: "112", way: "线上" },
        { id: 5, name: "茶话会", time: "2024/2/11", brief: "有你up的茶品嘛？", pic: "https://www.freeimg.cn/i/2024/01/31/65b9de9d992d7.jpg", location: "文俊楼", visitor: "122", way: "线下" },
        { id: 6, name: "品牌会", time: "2024/2/12", brief: "这些品牌居然是黑榜！", pic: "https://www.freeimg.cn/i/2024/01/31/65b9de9c64d6f.jpg", location: "田径场", visitor: "123", way: "线下" }
      ]
    };
  },
  computed: {
    // 计算scroll高度
    calculate_scrollHeight() {
      return {
        height: (this.WindowHeight - 110) * 2 + "rpx"
      };
    }
  },
  //一些方法
  methods: {
    // 回到顶部
    slideToTop() {
      common_vendor.index.pageScrollTo({
        scrollTop: 0,
        duration: 260
      });
    },
    //获取页面滑动位置 当 是否显示回到顶部的图标
    onPageScroll(e) {
      this.showToTop = e.scrollTop > 100;
    },
    // 跳转到讲座详情
    navigateToDetail() {
      common_vendor.index.navigateTo({
        url: "/pages/lectureDetail/lectureDetail"
      });
    }
  },
  // onload生命周期函数只会被调用一次
  onLoad() {
    common_vendor.index.getSystemInfo({
      success: (res) => {
        this.WindowHeight = res.windowHeight;
        this.WindowWidth = res.windowWidth;
        console.log("页面高度" + this.WindowHeight, "页面宽度" + this.WindowWidth);
      }
    });
  },
  //onready 生命周期函数 当页面已经渲染的差不多的时候 也就是图片 网页都快加载好了 这个函数就出现(可获取加载完的窗口等) 且只进行一次
  onReady() {
  },
  onUnload() {
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $data.search_img,
    b: $data.shift_img,
    c: common_vendor.f($data.lecture, (lecture, index, i0) => {
      return {
        a: lecture.pic,
        b: common_vendor.t(lecture.name),
        c: common_vendor.t(lecture.brief),
        d: common_vendor.t(lecture.time),
        e: common_vendor.t(lecture.location),
        f: common_vendor.t(lecture.visitor),
        g: index
      };
    }),
    d: $data.time_img,
    e: $data.location_img,
    f: $data.visit_img,
    g: common_vendor.o((...args) => $options.navigateToDetail && $options.navigateToDetail(...args)),
    h: $data.showToTop
  }, $data.showToTop ? {
    i: common_vendor.o((...args) => $options.slideToTop && $options.slideToTop(...args))
  } : {});
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/Aser/Graduation_project/Lecture/pages/activity/activity.vue"]]);
_sfc_main.__runtimeHooks = 1;
wx.createPage(MiniProgramPage);

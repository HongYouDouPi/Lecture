"use strict";
const common_vendor = require("../common/vendor.js");
const store = common_vendor.createStore({
  state() {
    return {
      // 全局变量
      studentId: ""
    };
  },
  mutations: {
    setStudentId(state, studentId) {
      state.studentId = studentId;
    }
  },
  actions: {
    updateStudentId(context, studentId) {
      context.commit("setStudentId", studentId);
    }
  },
  getters: {
    studentId: (state) => state.studentId
  }
});
exports.store = store;

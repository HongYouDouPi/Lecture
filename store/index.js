// store/index.js
import { createStore } from 'vuex';

const store = createStore({
  state() {
    return {
		// 全局变量
	  studentId: ''
    };
  },
  mutations: {
	setStudentId(state, studentId) {
	  state.studentId = studentId;
	}
  },
  actions: {
	updateStudentId(context, studentId) {
	  context.commit('setStudentId', studentId);
	}
  },
  getters: {
	studentId: state => state.studentId
  }
});

export default store;

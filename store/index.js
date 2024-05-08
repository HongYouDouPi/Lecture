// store/index.js
import { createStore } from 'vuex';

const store = createStore({
  state() {
    return {
		// 全局变量
	  studentId: '',
	  port : '121.37.45.61:45065'
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
	studentId: state => state.studentId,
	port: state => state.port
  }
});

export default store;

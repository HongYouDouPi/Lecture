import App from './App'

// #ifndef VUE3
import Vue from 'vue'
import store from './store' // 引入 Vuex 的配置文件

import './uni.promisify.adaptor'
Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
  ...App,
   store // 注册 Vuex Store
})
// 地图挂载
var amapFile = require('@/libs/amap-wx.130.js');
Vue.prototype.myAmapFun = new amapFile.AMapWX({
	key: 'c0ef501fdeb710a906f74359b8c97a40'
});

app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
// 引入 Vuex 的配置文件
import store from './store' 
export function createApp() {
  const app = createSSRApp(App)
  app.use(store) // 注册 Vuex store
  return {
    app
  }
}

// #endif
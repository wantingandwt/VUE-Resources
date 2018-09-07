// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App'
import router from './router'

// 引入mockjs
require('./mock.js')

// 引用API文件
import api from './axios/api.js'
// 将API方法绑定到全局
Vue.prototype.$api = api

Vue.config.productionTip = false
Vue.use(ElementUI);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

//时间整理过滤器
Vue.filter('getYMD', function(input) {
  return input.split(' ')[0];
})
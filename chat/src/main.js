// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import store from '@/vuex/store'
import router from './router'
import axios from 'axios'
import $jquery from 'jquery'
Vue.config.productionTip = false
Vue.prototype.$ajax = axios;
Vue.prototype.$jquery = $jquery

new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})

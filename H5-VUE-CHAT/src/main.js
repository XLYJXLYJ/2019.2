// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import FastClick from 'fastclick'
import router from '@/router'
import App from '@/App'
import store from '@/vuex/store'
import 'lib-flexible/flexible.js'
import {Alert, Loading, Swiper, SwiperItem,Previewer,TransferDom} from 'vux'
import axios from 'axios'

Vue.prototype.axios = axios

Vue.component('alert', Alert)

Vue.component('loading', Loading)

Vue.component('swiper', Swiper)

Vue.component('SwiperItem', SwiperItem)

Vue.component('previewer', Previewer)

Vue.directive('transfer-dom', TransferDom)

axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded'

Vue.prototype.BackFunction = function () {
  this.$router.go(-1)
}

FastClick.attach(document.body)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app-box')

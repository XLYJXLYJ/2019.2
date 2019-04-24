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
import VueAxios from 'vue-axios'

// import vConsole from 'vconsole'
// import EXIF from 'exif-js'

// Vue.prototype.$vconsole = new vConsole()

// Vue.prototype.EXIF = EXIF
Vue.use(VueAxios, axios)

Vue.component('alert', Alert)

Vue.component('loading', Loading)

Vue.component('swiper', Swiper)

Vue.component('SwiperItem', SwiperItem)

Vue.component('previewer', Previewer)

Vue.directive('transfer-dom', TransferDom)

axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded'

// Vue.prototype.urlMsg= function (msg) {
//   if (browser.versions.mobile) {//判断是否是移动设备打开。browser代码在下面
//     var ua = navigator.userAgent.toLowerCase();//获取判断用的对象
//     if (ua.match(/MicroMessenger/i) == "micromessenger") {
//       //在微信中打开
//     }else{
//       return msg.replace(/^(?!.*<a href=.*)[0-9]{5,15}$/g, "<a href='tel:" + "$&" + "'>" + "$&" + "</a>").replace(/\<br \/\>/g, "\<br").replace(/(?!.*?(\"|\')+)(.+?)((https|ftp|http):\/\/[^\u4e00-\u9fa5\s]*)/g, "$2<a href='$3' target='_blank'>" + "$3" + "</a>").replace(/\<br/g, "\<br \/\>")
//     }
//   } else {
//     //否则就是PC浏览器打开
//     return msg.replace(/^(?!.*<a href=.*)[0-9]{5,15}$/g, "<a href='tel:" + "$&" + "'>" + "$&" + "</a>").replace(/\<br \/\>/g, "\<br").replace(/(?!.*?(\"|\')+)(.+?)((https|ftp|http):\/\/[^\u4e00-\u9fa5\s]*)/g, "$2<a href='$3' target='_blank'>" + "$3" + "</a>").replace(/\<br/g, "\<br \/\>")
//   }
// };

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

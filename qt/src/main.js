// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import axios from 'axios'
import VueAxios from 'vue-axios'
import uploader from 'vue-simple-uploader'
import store from '@/vuex/store'
import '@/common/font.css'

Vue.use(uploader)

Vue.use(VueAxios, axios)

Vue.use(ElementUI);

Vue.config.productionTip = false

Vue.prototype.setCookie = function (c_name, value, expiredays){
　　var exdate=new Date();
　　exdate.setDate(exdate.getDate() + expiredays);
　　document.cookie=c_name+ "=" + value + ((expiredays==null) ? "" : ";expires="+exdate.toGMTString());
}

Vue.prototype.getCookie = function (cookieName) {
  var strCookie = document.cookie;
  var arrCookie = strCookie.split("; ");
  for (var i = 0; i < arrCookie.length; i++) {
    var arr = arrCookie[i].split("=");
    if (cookieName == arr[0]) {
      return arr[1];
    }
  }
  return "";
}

Vue.prototype.delCookie = function (name){
  var exp = new Date();
  exp.setTime(exp.getTime() - 1);
  var cval=getCookie(name);
  if(cval!=null)
      document.cookie= name + "="+cval+";expires="+exp.toGMTString();
}


/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
})

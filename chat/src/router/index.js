import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/login/login'
import aside from '@/components/aside/aside'
import chat from  '@/components/chat/chat'
import user from '@/components/user/user'
import record from '@/components/record/record'
import answer from '@/components/answer/answer'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: login
    },{
      path: '/chat',
      name: 'chat',
      component: chat
    },{
      path: '/user',
      name: 'user',
      component: user,
    },{
      path: '/record',
      name: 'record',
      component: record,
    },{
      path: '/answer',
      name: 'answer',
      component:  answer
    }
  ],
  mode: 'hash',
  linkActiveClass:'active'
  //history
})

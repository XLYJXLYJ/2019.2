import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/login/login'
import chat from  '@/components/chat/chat'
import user from '@/components/user/user'
import record from '@/components/record/record'

Vue.use(Router)

export default new Router({
  routes: [
    //登录
    {
      path: '/',
      name: 'login',
      component: login
    },
    // 聊天
    {
      path: '/chat',
      name: 'chat',
      component: chat
    },
    // 用户中心
    {
      path: '/user',
      name: 'user',
      component: user,
    },
    // 历史对话
    {
      path: '/record',
      name: 'record',
      component: record,
    }
  ],
  mode: 'hash',
  linkActiveClass:'active'
  //history
})

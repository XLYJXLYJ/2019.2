import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: resolve =>require(['@/components/Task'],resolve)
    }, 
    {
      path: '/Qt',
      name: 'Index',
      component: resolve =>require(['@/components/Task'],resolve)
    }, 
    {
      path: '/Task',
      name: 'Task',
      component: resolve =>require(['@/components/Index'],resolve)
    },
    {
      path: '/Result/:id',
      name: 'Result',
      component: resolve =>require(['@/components/Result'],resolve)
    }
  ]
})

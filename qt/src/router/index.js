import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/Qt',
      name: 'Index',
      component: resolve =>require(['@/components/Index'],resolve)
    }, 
    {
      path: '/Task',
      name: 'Task',
      component: resolve =>require(['@/components/Task'],resolve)
    },
    {
      path: '/Result',
      name: 'Result',
      component: resolve =>require(['@/components/Result'],resolve)
    }
  ]
})

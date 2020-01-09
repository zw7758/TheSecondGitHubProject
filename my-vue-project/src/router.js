import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import index from '@/view/index'
import index2 from '@/view/index2'
import index3 from '@/view/index3'
import index4 from '@/view/index4'
import login from '@/view/login'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: login
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/HelloWorld',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/index',
      name: 'index',
      component: index
    },
    {
      path: '/index2',
      name: 'index2',
      component: index2
    },
    {
      path: '/index3',
      name: 'index3',
      component: index3
    } ,
    {
      path: '/index4',
      name: 'index4',
      component: index4
    }
  ]
})

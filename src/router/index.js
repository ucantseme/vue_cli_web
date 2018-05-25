import Vue from 'vue'
import Router from 'vue-router'
import home from '@/components/home'
import todo from '@/components/todo'
import '@/assets/css/normalize.css'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: home
    },
    {
      path: '/todo',
      name: 'todo',
      component: todo
    },
  ]
})

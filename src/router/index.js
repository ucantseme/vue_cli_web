import Vue from 'vue'
import Router from 'vue-router'
import home from '@/components/home'
import todo from '@/components/todo'
import chatroom from '@/components/chatroom'
import photo from '@/components/photo'
import '@/assets/css/normalize.css'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: home
    },
    {
      path: '/todo',
      component: todo
    },
    {
      path: '/chatroom',
      component: chatroom
    },
    {
      path: '/photo',
      component: photo
    },
  ]
})

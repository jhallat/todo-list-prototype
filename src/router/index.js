import Vue from 'vue'
import VueRouter from 'vue-router'
import ToDoList from '../views/to-do-list'
import Goals from '../views/goals'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/to-do-list'
  },
  {
    path: '/to-do-list',
    name: 'to-do-list',
    component: ToDoList
  },
  {
    path: '/goals',
    name: 'goals',
    component: Goals
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

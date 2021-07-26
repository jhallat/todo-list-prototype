import Vue from 'vue'
import VueRouter from 'vue-router'
import ToDoList from '../views/to-do-list'
import Goals from '../views/goals'
import Tasks from '../views/tasks'
import Schedule from '../views/schedule'
import AdvancedEdit from '../views/advanced-task-edit'

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
  {
    path: '/tasks',
    name: 'tasks',
    component: Tasks
  },
  {
    path: '/schedule',
    name: 'schedule',
    component: Schedule
  },
  {
    path: '/advanced-edit/:id',
    name: 'advanced-edit',
    component: AdvancedEdit,
    props: r => ({id: parseInt(r.params.id)})
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

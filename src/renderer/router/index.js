import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)



export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: require('@/components/home.vue').default,
    },
    {
      path: '/note',
      name: 'note',
      component: require('@/components/note.vue').default,
    },
    {
      path: '/todo',
      name: 'todo',
      component: require('@/components/todo.vue').default,
    },
    {
      path: '/home',
      name: 'home',
      component: require('@/components/home.vue').default,
    },
    {
      path: '/editAndCreate',
      name: 'editAndCreate',
      component: require('@/components/editAndCreate.vue').default,
    },
    {
      path: '/setting',
      name: 'setting',
      component: require('@/components/setting.vue').default,
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})

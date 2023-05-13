import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Detail from '../views/Detail.vue'
import Create from '../views/Create.vue'
import Tag from '../views/Tag.vue'


const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path : '/posts/:id',
    name : 'detail',
    component : Detail,
    props : true
  },
  {
    path : '/create',
    name : 'create',
    component : Create
  },
  {
    //prps should true when we use dynamic tag 
    // if you don't wanna use true use userRoute form vue-router
    path :'/tags/:tag',
    name :'tag',
    component:Tag,
    props : true
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router

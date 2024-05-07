// router.js

import { createRouter, createWebHistory } from 'vue-router'
import Homepage from '../components/Homepage.vue' // Import Homepage component

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/home', // Set the path to /home
      name: 'home',
      component: Homepage // Use the Homepage component for this route
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/addProduct',
      name: 'addProduct',
      component: () => import('../components/AddProduct.vue')
    },
    {
      path:'/parent',
      name: 'parent',
      component:()=>import('../components/ParentComponent.vue')
    },
  ]
})

export default router

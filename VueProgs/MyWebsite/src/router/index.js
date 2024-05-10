import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/books',
      name: 'Books',
      component: () => import('../views/BooksView.vue')
    },
    {
      path:'/mugs',
      name:'Mugs',
      component:()=>import('../views/MugsView.vue')
    },
    {
      path: '/pads',
      name: 'Pads',
      component: () => import('../views/PadsView.vue')

    },
    {
      path:'/tags',
      name:'Tags',
      component:()=>import('../views/TagsView.vue')
    }
  ]
})

export default router

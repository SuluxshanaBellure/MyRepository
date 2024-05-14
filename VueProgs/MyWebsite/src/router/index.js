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
      path:'/coffeemugs',
      name:'Mugs',
      component:()=>import('../views/MugsView.vue')
    },
    {
      path: '/mousepads',
      name: 'Pads',
      component: () => import('../views/PadsView.vue')
    },
    {
      path:'/luggagetags',
      name:'Tags',
      component:()=>import('../views/TagsView.vue')
    },
    { 
      path: '/books/:sku',
      name: 'booksDetail',
      component: () => import('../views/ProductDetail.vue'),
      props: true
    },
    { 
      path: '/coffeemugs/:sku',
      name: 'coffeemugsDetail',
      component: () => import('../views/ProductDetail.vue'),
      props: true
    } ,
    { 
      path: '/mousepads/:sku',
      name: 'mousepadsDetail',
      component: () => import('../views/ProductDetail.vue'),
      props: true
    } ,
    { 
      path: '/luggagetags/:sku',
      name: 'luggagetagsDetail',
      component: () => import('../views/ProductDetail.vue'),
      props: true
    } 
  ]
})

export default router

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
      path: '/books/:pid/:pname',
      name: 'booksDetail',
      component: () => import('../views/ProductDetail.vue'),
      props: route => ({
        sku: route.params.pid,
        productName:route.params.pname,
        category_id:1 
      })
    },
    {
      path: '/coffeemugs/:pid/:pname',
      name: 'coffeemugsDetail',
      component: () => import('../views/ProductDetail.vue'),
      props: route => ({
        sku: route.params.pid,
        productName: route.params.pname,
        category_id: 2 
      })
    },
    {
      path: '/mousepads/:pid/:pname',
      name: 'mousepadsDetail',
      component: () => import('../views/ProductDetail.vue'),
      props: route => ({
        sku: route.params.pid,
        productName: route.params.pname,
        category_id: 3 
      })
    },
    {
      path: '/luggagetags/:pid/:pname',
      name: 'luggagetagsDetail',
      component: () => import('../views/ProductDetail.vue'),
      props: route => ({
        sku: route.params.pid,
        productName: route.params.pname,
        category_id: 4 
      })
    },
    {
      path:'/login',
      name:'login',
      component:()=>import('../views/SignInForm.vue'),
    },
    {
      path:'/register',
      name:'register',
      component:()=>import('../views/RegisterForm.vue'),
    },
    {
      path: '/weather',
      name: 'Weather',
      component: ()=>import('../views/WeatherView.vue'),
    },
    {
      path:'/leave',
      name:'leave',
      component:()=>import('../views/Leaves.vue'),
    }      
  ]
})

export default router

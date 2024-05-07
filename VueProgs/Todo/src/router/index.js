import { createRouter, createWebHistory } from 'vue-router';
import Dashboard from '../components/Dashboard.vue';
import Active from '../components/Active.vue';
import Completed from '../components/Completed.vue';
import Signin from '../components/Signin.vue';

const routes = [
  { path: '/signup', name: 'signup', component: Signin },
  { path: '/dashboard', name: 'dashboard', component: Dashboard, meta: { requiresAuth: true } },
  { path: '/active', name: 'active', component: Active, meta: { requiresAuth: true },props: true },
  { path: '/completed', name: 'completed', component: Completed, meta: { requiresAuth: true } }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;

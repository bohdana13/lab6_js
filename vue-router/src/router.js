import { createRouter, createWebHistory } from 'vue-router';
import Home from '../src/views/Home.vue';
import Lottery from '../src/views/Lottery.vue';
import UserDetails from '../src/views/UserDetails.vue';
import Login from '../src/components/Login.vue';

const routes = [
  {
    path: '/home',
    name: 'Home',
    component: Home,
  },
  {
    path: '/lottery',
    name: 'Lottery',
    component: Lottery,
  },
  { path: '/login', name: 'Login', component: Login },

  {
    path: '/',
    redirect: '/home',
  },
  {
    path: "/users/:id",
    name: "UserDetails",
    component: UserDetails,
    props: true,
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});


export default router;

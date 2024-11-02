import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import './style.css'
import 'bootstrap/dist/css/bootstrap.min.css';

import App from './App.vue'
import Home from './views/Home.vue'
import About from './views/About.vue'
//import Lottery from '../views/Lottery.vue';
//import Login from '../views/Login.vue';

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/about', name: 'About', component: About },
 // { path: '/lottery', name: 'Lottery', component: Lottery },
  //{ path: '/login', name: 'Login', component: Login },
];

const router = createRouter ({
    history: createWebHistory(),
    routes,
});



createApp(App).use(router).mount('#app')

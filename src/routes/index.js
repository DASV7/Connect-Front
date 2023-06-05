import { createWebHistory, createRouter } from "vue-router";
import Login from "../components/login/Login.vue";
import Home from '../views/Home.vue'
const routes = [
  {
    path: "/home",
    name: "home",
    component: Home,
  },
  {
    path: "/",
    name: "login",
    component: Login,
  },  
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

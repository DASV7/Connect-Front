import { createWebHistory, createRouter } from "vue-router";
import Login from "../components/login/Login.vue";
import join from "../components/login/Join.vue";
import Home from "../views/Home.vue";
const routes = [
  {
    path: "/",
    name: "login",
    component: Login,
  },

  {
    path: "/join",
    name: "Join",
    component: join,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

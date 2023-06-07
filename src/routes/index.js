import { createWebHistory, createRouter } from "vue-router";
import Login from "../components/login/Login.vue";
import JoinLogin from "../components/login/JoinLogin.vue";
import home from "../components/connect/home.vue";
import register from "../components/flowRegister/register.vue"

const ifAuthenticated = (to, from, next) => {
  // if (!store.getters["user/isAuthenticated"]) {
  //   next("/login");
  //   return;
  // }
  // next();
};


const routes = [
  {
    path: "/",
    name: "login",
    component: Login,
  },

  {
    path: "/JoinLogin",
    name: "JoinLogin",
    component: JoinLogin,
  },
  {
    path: "/register",
    name: "register",
    component: register,
  },
  {
    path: "/home",
    name: "home",
    component: home,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

import { createWebHistory, createRouter } from "vue-router";
import Login from "../components/login/Login.vue";
import JoinLogin from "../components/login/JoinLogin.vue";
import home from "../components/connect/homeConnect.vue";
import register from "../components/flowRegister/register.vue"
import gps from "../components/gps/gps.vue";
import profile from "../components/profile/profile.vue";
import preferences from "../components/preferencesFlow/preferences.vue"


const ifAuthenticated = (to, from, next) => {
  if (!localStorage.getItem("vinc-jwt")) {
    next("/");
    return;
  }
  next();
};
const ifIsAuthenticated = (to, from, next) => {
  if (localStorage.getItem("vinc-jwt")) {
    next("/home");
    return;
  }
  next();
};


const routes = [
  {
    path: "/",
    name: "login",
    component: Login,
    beforeEnter: ifIsAuthenticated,
  },

  {
    path: "/JoinLogin",
    name: "JoinLogin",
    component: JoinLogin,
    beforeEnter: ifIsAuthenticated,
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
    beforeEnter: ifAuthenticated,
  },
  {
    path: "/gps",
    name: "hogpsme",
    component: gps,
    beforeEnter: ifAuthenticated,
  },
  {
    path: "/profile",
    name: "profile",
    component: profile,
    beforeEnter: ifAuthenticated,
  },
  {
    path: "/preferences",
    name: "preferences",
    component: preferences,
    // beforeEnter: ifAuthenticated,
  },
  {
    path: '/:catchAll(.*)',
    redirect: '/'
  }
];

const router = createRouter({
  mode: "history",
  base: import.meta.env.BASE_URL,
  history: createWebHistory(),
  routes,
});

export default router;

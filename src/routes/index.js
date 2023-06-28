import { createWebHistory, createRouter } from "vue-router";
import Login from "../components/login/Login.vue";
import JoinLogin from "../components/login/JoinLogin.vue";
import home from "../components/connect/homeConnect.vue";
import register from "../components/flowRegister/register.vue";
import gps from "../components/gps/gps.vue";
import profile from "../components/profile/profile.vue";
import preferences from "../components/preferencesFlow/preferences.vue";
import editProfile from "../components/editProfile/editProfile.vue";

import messages from "../components/messages/messages.vue";
import intoMessages from "../components/messages/intoMessagesView.vue";
import whoLikesMe from "../components/likes/whoLikesMe.vue";
import videoCall from "../components/video/videoCall.vue";
import settings from "../components/settings/setting.vue"

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
    path: "/video",
    name: "video",
    component: videoCall,
    beforeEnter: ifAuthenticated,
  },
  {
    path: "/gps",
    name: "hogpsme",
    component: gps,
    beforeEnter: ifAuthenticated,
  },
  {
    path: "/likes",
    name: "likes",
    component: whoLikesMe,
    beforeEnter: ifAuthenticated,
  },
  {
    path: "/messages",
    name: "messages",
    component: messages,
    beforeEnter: ifAuthenticated,
  },
  {
    path: "/messages/:id",
    name: "message",
    component: intoMessages,
    beforeEnter: ifAuthenticated,
  },
  {
    path: "/profile",
    name: "profile",
    component: profile,
    beforeEnter: ifAuthenticated,
  },
  {
    path: "/editProfile",
    name: "editProfile",
    component: editProfile,
    // beforeEnter: ifAuthenticated,
  },
  {
    path: "/preferences",
    name: "preferences",
    component: preferences,
    // beforeEnter: ifAuthenticated,
  },
  {
    path: "/settings",
    name: "settings",
    component: settings,
    // beforeEnter: ifAuthenticated,
  },
  {
    path: "/:catchAll(.*)",
    redirect: "/",
  },
];

const router = createRouter({
  mode: "history",
  base: import.meta.env.BASE_URL,
  history: createWebHistory(),
  routes,
});

export default router;

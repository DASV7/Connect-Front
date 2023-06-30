<script setup>
import MenuHome from "./components/menu/menu.vue";
import { useRoute } from "vue-router";
import { ref, watchEffect, computed, onMounted, onUnmounted } from "vue";
import { useCounterStore } from "../src/store/users";
import jwt_decode from "jwt-decode";
import notificati from "./components/notifications/alertNotification.vue";
import EventEmittler from "../src/utils/events/customEvents";
import { useSocketStore } from "../src/store/socketStore";
import { Notivue, notifications } from "notivue";

const socket = useSocketStore();
const route = useRoute();
const fullPath = ref(route.fullPath);

watchEffect(() => {
  fullPath.value = route.fullPath;
});

const EventUser = new EventEmittler();

const userStore = useCounterStore();

const routePermission = computed(() => {
  const diferents = ["/", "/Register", "/JoinLogin", "/preferences"];
  return !diferents.includes(fullPath.value.split("?")[0]);
});

const options = { error: { duration: 2000, close: false } };
onMounted(async () => {
  const decodeToken = jwt_decode(localStorage.getItem("vinc-jwt"));
  if (decodeToken) userStore.$patch({ user: decodeToken });
  socket.userConnected();
  await socket.socket.on("connect/newLike", (user) => {
    EventUser.emit("newNotification", {
      notification: {
        title: "Le gustas a alguien",
        message: user.name + "",
        go: "/likes",
      },
      user: user,
    });
  });
});

onUnmounted(() => {
  socket.socket.disconnect();
});
</script>

<template>
  <div class="mainApp"></div>
  <notificati></notificati>
  <div class="mainApp__routerView">
    <router-view></router-view>
  </div>
  <Notivue :use="notifications" :options="options" />
  <MenuHome v-if="routePermission"> </MenuHome>
</template>

<style lang="scss">
.mainApp__routerView {
  height: 93vh;
}

@media screen and (min-width: 1024px) {
  .mainApp__routerView {
    height: 100vh;
    overflow: hidden;
    margin-left: 70px;
  }
}
</style>

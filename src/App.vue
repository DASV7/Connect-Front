<script setup>
import MenuHome from "./components/menu/menu.vue";
import { useRoute } from "vue-router";
import { ref, watchEffect, computed, onMounted, onUnmounted } from "vue";
import { useCounterStore } from "../src/store/users";
import jwt_decode from "jwt-decode";
import notifications from "./components/notifications/alertNotification.vue";
import EventEmittler from "../src/utils/events/customEvents";
import { useSocketStore } from "../src/store/socketStore";

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
  <notifications></notifications>
  <MenuHome v-if="routePermission"> </MenuHome>
  <router-view></router-view>
</template>

<style lang="scss"></style>

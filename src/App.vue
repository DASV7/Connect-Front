<script setup>
import MenuHome from "./components/menu/menu.vue";
import { useRoute } from "vue-router";
import { ref, watchEffect, computed, onMounted } from "vue";
import { useCounterStore } from "../src/store/users";
import jwt_decode from "jwt-decode";
import notifications from "./components/notifications/alertNotification.vue";
import EventEmittler from "../src/utils/events/customEvents";

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
onMounted(() => {
  const decodeToken = jwt_decode(localStorage.getItem("vinc-jwt"));
  if (decodeToken)
    userStore.$patch({
      user: decodeToken,
    });

  setTimeout(() => {
    console.log("Evento personalizadoEnviadp:");
    EventUser.emit("newNotification", {
      notification: {
        title: "Bienvenido",
        message: "Bienvenido a Vinc",
      },
    });
  }, 1000);
});
</script>
<template>
  <div class="mainApp"></div>
  <notifications></notifications>
  <MenuHome v-if="routePermission"> </MenuHome>
  <router-view></router-view>
</template>
<style lang="scss"></style>

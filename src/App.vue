<script setup>
import MenuHome from "./components/menu/menu.vue";
import { useRoute } from "vue-router";
import { ref, watchEffect, computed } from "vue";
const route = useRoute();
const fullPath = ref(route.fullPath);

watchEffect(() => {
  fullPath.value = route.fullPath;
});

const routePermission = computed(() => {
  const diferents = ["/", "/Register", "/JoinLogin", "/preferences"];
  return !diferents.includes(fullPath.value.split("?")[0]);
});
</script>
<template>
  <div class="mainApp"></div>
  <MenuHome v-if="routePermission"> </MenuHome>
  <router-view></router-view>
</template>
<style lang="scss"></style>

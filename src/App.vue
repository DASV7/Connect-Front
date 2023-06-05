<script setup>
import { computed, ref,watchEffect } from "vue";
import { useRoute } from "vue-router";
// import headerComp from "./components/header.component/component.Header.vue";

// const route = useRoute();
// const fullPath = ref(route.fullPath);

// watchEffect(() => {
//   fullPath.value = route.fullPath;
// });

</script>

<template>
  <div class="mainApp"></div>
  <headerComp v-if="fullPath != '/'"></headerComp>
  <router-view></router-view>
</template>

<style lang="scss"></style>

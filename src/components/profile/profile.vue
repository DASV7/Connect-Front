<template>
  <div class="profileUser">
    <h1>Profile</h1>
    <button class="homeVinc__buttonsAction-button" @click="closeSesion()">
      <i class="fa fa-sign-out" aria-hidden="true"></i>
    </button>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
const router = useRouter();
const closeSesion = () => {
  localStorage.clear();
  router.push("/");
};
</script>

<style></style>

<template>
  <div>
    <button class="editProfile__top-btn" @click="$router.push('/profile')"><i class="fa-solid fa-arrow-left"></i></button>
    <button class="profileUser__header-btn" @click="closeSesion()">
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
  window.location.reload();
};
</script>

<style></style>

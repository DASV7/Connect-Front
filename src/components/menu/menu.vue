<script setup>
import { onMounted } from "vue";

onMounted(() => {});

const routers = [
  { path: "/messages", icon: "fa-solid fa-comment" },
  { path: "/video", icon: "fa fa-video-camera" },
  { path: "/likes", icon: "fa fa-eye" },
  { path: "/home", icon: "fa-solid fa-barcode" },
  { path: "/profile", icon: "fa-solid fa-user" },
];
</script>

<template>
  <div class="menu">
    <div
      class="menu__container"
      v-for="(router, index) in routers"
      :key="index"
    >
      <button @click="$router.push(router.path)" class="menu__container-btn">
        <i :class="router.icon"></i>
      </button>
    </div>
  </div>
</template>

<style lang="scss">
.menu {
  display: flex;
  justify-content: space-between;
  z-index: 1;
  width: 100%;
  position: fixed;
  margin-top: 15px;
  bottom: 0;
  border-top: 1px solid #000;

  &__container {
    width: 100%;
    &-btn {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 50px;
      background-color: #f9f9f9;
      color: $primary-color;
      border: none;
      font-size: 20px;
    }
  }
}
</style>

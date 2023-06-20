<script setup>
import { onMounted, ref } from "vue";

const activeRote = ref();
onMounted(() => {});

const routers = [
  { path: "/messages", icon: "fa-solid fa-comment" },
  { path: "/video", icon: "fa fa-video-camera" },
  { path: "/likes", icon: "fa fa-eye" },
  { path: "/home", icon: "fa-solid fa-barcode" },
  { path: "/profile", icon: "fa-solid fa-user" },
];

const goRouter = (index) => {
  console.log("si entra");
  activeRote.value = index;
};
</script>

<template>
  <div class="menu">
    <div class="menu__container">
      <div class="menu__items" v-for="(router, index) in routers" :key="index" :class="activeRote == index ? 'menu__container-btn-active' : ''">
        <button @click="$router.push(router.path), goRouter(router.path)" class="menu__container-btn">
          <i :class="router.icon"></i>
        </button>
      </div>
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

  &__items {
    width: 100%;
    display: flex;
  }

  &__container {
    display: flex;
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
      &-active {
        background-color: $primary-color;
      }
    }
  }
}
</style>

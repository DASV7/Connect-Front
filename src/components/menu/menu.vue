<template>
  <div class="menu">
    <div class="menu__container">
      <button @click="$router.push('/messages')" class="menu__container-btn">
        <i class="fa-solid fa-comment"></i>
      </button>
    </div>
    <div class="menu__container">
      <button @click="$router.push('/gps')" class="menu__container-btn">
        <i class="fa-solid fa-location-dot"></i>
      </button>
    </div>
    <div class="menu__container">
      <button @click="$router.push('/home')" class="menu__container-btn">
        <i class="fa-solid fa-barcode"></i>
      </button>
    </div>
    <div class="menu__container">
      <button @click="$router.push('/profile')" class="menu__container-btn">
        <i class="fa-solid fa-user"></i>
      </button>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from "vue";

onMounted(() => {});
</script>

<style lang="scss">
.menu {
  display: flex;
  justify-content: space-between;
  z-index: 1;
  width: 100%;
  height: 10%;
  position: fixed;
  margin-top: 15px;
  left: -1px;
  border-top: 1px solid #000;
  bottom: -16px;

  &__container {
    width: 100%;
    &-btn {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 73%;
      padding: 0%;
      background-color: #f9f9f9;
      color: #886eea;
      border: none;
      font-size: 20px;
    }
  }
}
</style>

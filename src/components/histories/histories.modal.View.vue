<script setup>
const props = defineProps(["showModal"]);
</script>

<template>
  <div v-if="props.showModal" @click="$emit('closeOnClick')" class="viewHistoriesModal">
    <div class="viewHistoriesModal__container">
      <div class="viewHistoriesModal__header">
        <button class="viewHistoriesModal__header-btn" @click="$emit('closeModal')">
          <i class="fa-regular fa-x"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<style lang="scss">

.viewHistoriesModal {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 50;
  overflow: hidden;
  background-color: #000000dd;


  &__container {
    width: 380px;
    height: 95%;
    background-color: #000;
    border-radius: 20px;
    margin-left: 70px;
    z-index: 100;
    padding: 10px;
  }
  &__header {
    display: flex;
    justify-content: end;
    width: 100%;

    &-btn {
      background-color: transparent;
      border: none;
      color: #fff;
      font-size: 25px;
      cursor: pointer;
    }
  }
}
</style>

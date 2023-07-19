<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import connect from "../connect/connect.vue";
const props = defineProps(["showModal", "user"]);
const emit = defineEmits(["changeModal"]);

onMounted(() => {
  document.addEventListener("keydown", actions);
});
const closeModal = () => {
  // emit("changeModal", true);
  props.showModal = !props.showModal
};
const actions = ({ key }) => {
  if (key == "Escape") closeModal();
};
onUnmounted(() => {
  document.removeEventListener("keydown", actions);
});
</script>

<template>

  <div class="modal" v-if="props.showModal" @keypress.esc="closeModal()">
    <div class="modal__wrapper">
      <connect :user="props.user" :hiddeActions="false"></connect>
      <button class="modal__closeMenu" @click="$emit('changeModal')">
        <i class="fa-solid fa-x"></i></button>
    </div>
  </div>

</template>

<style lang="scss">

.modal {
  display: flex;
  justify-content: center;
  // width: 100%;
  // height: 100%;
  background-color: #ffffff;
  z-index: 400;
  position: absolute;

  &__wrapper {
    display: flex;
    justify-content: center;
    overflow: hidden;
    position: relative;
    overflow: hidden;
    margin: auto;
    @include dynamicScreen(650px) {
      box-shadow: #000 0px 5px 10px;
      border-radius: 20px;
      height: 90vh;
      width: 400px;
    }
  }
  &__closeMenu {
    width: 40px;
    height: 40px;
    position: absolute;
    right: 10px;
    top: 10px;
    border: none;
    border-radius: 100px;
    background-color: #000;
    font-size: 20px;
    cursor: pointer;
    color: #ffffff;
  }
}
</style>

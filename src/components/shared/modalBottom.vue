<script setup>
import { ref, defineProps, onMounted, onUnmounted } from "vue";
const props = defineProps(["showModal"]);
const emit = defineEmits(["changeModal"]);
const closeModal = () => {
  emit("changeModal");
};
onMounted(() => {
  document.addEventListener("keydown", actions);
});
const actions = ({ key }) => {
  if (key == "Escape") closeModal();
};

onUnmounted(() => {
  document.removeEventListener("keydown", actions);
});
</script>
<template>
  <section class="modalBotton" v-if="props.showModal" @keypress.esc="closeModal()">
    <div class="modalBotton__wrapper fadeInUp">
      <div class="modalBotton__container">
        <vue-feather @click="closeModal()" type="x-circle"></vue-feather>
        <div class="modalTotal__content">
          <slot name="content"></slot>
        </div>
      </div>
    </div>
  </section>
</template>
<style lang="scss">
.modalBotton {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;
  background-color: #a0a0a03b;

  &__wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 98%;
    height: 70%;
    max-width: 800px;
    max-width: 700px;
    position: absolute;
    bottom: 0;
    background-color: white;
    border-radius: 20px 20px 0 0;
    z-index: 300;
  }

  &__container {
    width: auto;
    overflow: hidden;
    height: auto;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
    overflow-y: auto;
    object-fit: cover;
  }

  &__content {
    padding: 12px;
  }
}

[data-name="x-circle"] {
  z-index: 2;
  position: absolute;
  top: 20px;
  right: 20px;
  cursor: pointer;
  font-size: 30px;
  color: #fff;
  z-index: 1;
  color: $primary-color;

  &:hover {
    color: rgba(255, 0, 0, 0.709);
  }
}
</style>

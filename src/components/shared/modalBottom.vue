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
        <i @click="closeModal()" class="fa fa-window-close" aria-hidden="true"></i>
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
    height: 85%;
    max-width: 800px;
    max-width: 700px;
    position: absolute;
    bottom: 0;
    background-color: white;
    border-radius: 20px 20px 0 0;
    z-index: 300;
    @media screen and (min-width: 1024px) {
      height: 66%;
      width: 55%;
      margin-left: 70px;
    }
  }

  &__container {
    width: auto;
    overflow: hidden;
    height: auto;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
    overflow-y: auto;
    object-fit: cover;
    margin-top: 20px;
  }

  &__content {
    padding: 12px;
  }
}

.fa-window-close {
  z-index: 2;
  position: absolute;
  top: 10px;
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

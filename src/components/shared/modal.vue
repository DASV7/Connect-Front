<script setup>
import { ref } from "vue";

const props = defineProps(["showModal"]);
const emit = defineEmits(["changeModal"]);

const closeModal = () => {  
  emit('changeModal', true)
};
</script>
<template>
  <div class="modalTotal fadeInUp" v-if="props.showModal">
    <div class="modalTotal__wrapper">
      <div class="modalTotal__container">
        <i @click="closeModal()" class="fa fa-window-close" aria-hidden="true"></i>
        <div class="modalTotal__content">
          <slot name="content"></slot>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss">
.modalTotal {
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 400;
  background-color: rgba(0, 0, 0, 0.876);

  &__wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    position: relative;
  }

  &__container {
    width: auto;
    height: auto;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
    overflow-y: auto;
  }

  &__content {
    padding: 12px;
  }
}

.fa-window-close {
  z-index: 2;
  position: absolute;
  top: 20px;
  right: 20px;
  cursor: pointer;
  font-size: 30px;
  color: #fff;
  z-index: 1;
  &:hover {
    color: rgba(255, 0, 0, 0.709);
  }
}
</style>

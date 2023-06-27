<script setup>
import miniLoading from "../shared/miniLoading.vue";
</script>

<template>
  <div class="totalLoading">
    <miniLoading :width="40" :height="40" />
  </div>
</template>
<style lang="scss">
.totalLoading {
  height: 100vh;
  width: 100vw;
  background-color: rgba(12, 12, 12, 0.616);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  z-index: 20;
  &__messages {
    color: rgba(255, 255, 255, 0.178);
    font-weight: 800;
    font-size: 25px;
    box-shadow: 0 0 10px rgba(128, 128, 128, 0.062);
  }
}
</style>

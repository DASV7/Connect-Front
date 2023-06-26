<script setup>
const props = defineProps(["width", "height", "color"]);
</script>
<template>
  <div class="miniLoader">
    <div class="miniLoader__dot" :style="{ width: (width || 20) + 'px', height: (height || 20) + 'px', color: (color || '#4caf50') + 'px' }"></div>
    <div class="miniLoader__dot" :style="{ width: (width || 20) + 'px', height: (height || 20) + 'px', color: (color || '#4caf50') + 'px' }"></div>
    <div class="miniLoader__dot" :style="{ width: (width || 20) + 'px', height: (height || 20) + 'px', color: (color || '#4caf50') + 'px' }"></div>
  </div>
</template>

<style lang="scss">
.miniLoader {
  width: 150px;
  height: 100px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  &__dot {
    width: 40px;
    height: 40px;
    background-color: #50bded;
    border-radius: 50%;
    animation: shapeAnimation 1.5s ease-in-out infinite;
  }
}

@keyframes shapeAnimation {
  0%,
  100% {
    transform: scale(1);
  }
  50% {
    transform: scale(0.5);
  }
}
</style>

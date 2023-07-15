<script setup>
import buttonsRandom from './buttonsRandom.vue';

</script>

<template>
  <div class="callRandom">
      <div class="callRandom__container">
        <!-- <div class="callRandom__content"> -->
          <!-- </div> -->
          <img class="callRandom__img" src="https://i.pinimg.com/originals/57/00/c0/5700c04197ee9a4372a35ef16eb78f4e.png" alt="">
          <buttonsRandom></buttonsRandom>
        </div>
  </div>
</template>

<style lang="scss">
.callRandom {
  width: 100%;
  height: 100%;
  background-color: $primary-color;
  
  &__container {
    @include Column;
    width: 55%;
    height: 100%;
    margin: auto;
 
  }
  &__img {
    width: 200px;
    height: 200px;
  }
  

}
</style>

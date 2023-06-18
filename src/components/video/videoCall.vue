<script setup>


</script>
<template>
  <div class="videoCall">
    <div class="videoCall__container">
        <div class="videoCall__imgOne"></div>
        <div class="videoCall__imgTwo"></div>
    </div>
  </div>
</template>
<style lang="scss">
.videoCall {
  display: flex;
  justify-content: center;
  align-items: center;
  
  &__container {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 10px;
    
  }

  &__imgOne{
    min-width: 300px;
    min-height: 300px;
    border-radius: 10px;
    border: 1px solid #000;
  }

  &__imgTwo{
    border-radius: 10px;
    border: 1px solid #000;
    width: 300px;
    height: 300px;
  }
}
</style>

<template>
  
  <div class="buttonsRandom__buttons">
        <button class="buttonsRandom__buttons-btn1">Stop<i class="fa-sharp fa-solid fa-ban"></i></button>
        <button class="buttonsRandom__buttons-btn2">Like<i class="fa-solid fa-heart"></i></button>
        <button class="buttonsRandom__buttons-btn3">Next<i class="fa-solid fa-right-long"></i></button>
      </div>
</template>

<script setup>

</script>

<style lang="scss">
.buttonsRandom{ 

  &__buttons {
    display: flex;
    justify-content: center;
    margin-top: 10px;
    gap: 30px;
    @media screen and  (max-width: 1024px){
      gap: 0px;
    }
    &-btn1,
    &-btn2,
    &-btn3 {
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 30px;
      border: solid 2px #50bded;
      gap: 10px;
      width: 100px;
      height: 35px;
      background-color: #000;
      font-size: 15px;
      font-weight: 600;
      color: #fff;
      cursor: pointer;
    }
    &-btn1 {
      color: #ff0000;
    }
    &-btn2 {
      color: #50bded;
    }
    &-btn3 {
      color: #35e743;
    }
  }
}

</style>
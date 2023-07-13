<script setup>
import { ref, defineEmits, defineProps, onMounted } from "vue";
const props = defineProps(["showModal", "user"]);

const userAndhistories = ref()
onMounted(() => {
  console.log("este es el log ",props.user);
  userAndhistories.value = props.user;
});

</script>

<template>
  <div v-if="props.showModal && props.user" @click="$emit('closeOnClick')" class="viewHistoriesModal">
    <div class="viewHistoriesModal__container">
      <div class="viewHistoriesModal__header">
        <button class="viewHistoriesModal__header-btn" @click="$emit('closeModal')">
          <i class="fa-regular fa-x"></i>
        </button>
      </div>
      <div class="viewHistoriesModal__historie" v-if="userAndhistories?.histories">
        <img class="viewHistoriesModal__historie-img" :src="userAndhistories?.histories[0]?.url" alt="" />
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
  
  &__historie { 
    width: 100%;
    height: 100%;
    
    &-img {
      width: 100%;
      height: 95%;
      object-fit: cover;
      border-radius: 20px;
    }
  }

}
@media (max-width: 1024px) {
  .viewHistoriesModal__container {
    width: 80%;
    margin-left: 0px;
  }

}

@media (max-width: 524px) {
  .viewHistoriesModal__container {
    width: 100%;
    margin-left: 0px;
    padding: 0%;
  }

}
</style>

<script setup>
import { useCounterStore } from "../../store/users";

const userStore = useCounterStore();
let imgProfile = ["https://firebasestorage.googleapis.com/v0/b/connect-e76fc.appspot.com/o/icons%2F2466249.jpg?alt=media&token=57fdb4ee-8650-4ccc-a841-d04ba7816556z"];
</script>
<template>
  <div class="editProfile">
    <div class="editProfile__top">
      <button class="editProfile__top-btn" @click="$router.push('/profile')"><i class="fa-solid fa-arrow-left"></i></button>
      <p class="editProfile__top-tittle">Edita tu perfil</p>
    </div>
    <div class="editProfile__album">
      <div class="editProfile__album-item">Celda1</div>
      <div class="editProfile__album-item">Celda2</div>

    </div>
    <div class="editProfile__btn">
      <button class="editProfile__btn-add">Añadir Fotos</button>
    </div>
    <div class="editProfile__info">
      <div class="editProfile__tags"></div>
      <div class="editProfile__tags"></div>
      <div class="editProfile__tags"></div>
      <div class="editProfile__tags"></div>
    </div>
  </div>
</template>

<style lang="scss">
.editProfile {
  width: 100%;
  height: 100vh;

  &__album {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr;
    grid-gap: 10px;
    width: 100%;
    height: 50%;

    &-item {
    border: 1px solid black;
    padding: 10px;
  }
  }
  &__btn {
    display: flex;
    justify-content: center;
    margin-top: 10px;

    &-add {
      width: 70%;
      height: 35px;
      border: none;
      background-color: $primary-color;
      color: #fff;
      border-radius: 30px;
    }
  }
  &__info {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    margin-top: 5px;
  }
  &__tags {
    width: 97%;
    border-radius: 10px;
    height: 45px;
    background-color: #ece5e5;
  }
  &__top {
    display: flex;
    // align-items: center;
    justify-content: space-between;
    padding: 5px;
    width: 96%;

    &-btn {
      border: none;
      background-color: $primary-color;
      width: 45px;
      height: 30px;
      text-align: center;
      color: #fff;
      border-radius: 30px;
    }
    &-tittle {
      font-size: 13px;
      font-weight: 700;
      color: #bfbaba;
    }
  }
}
</style>

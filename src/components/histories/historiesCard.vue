<script setup>
import { ref, defineProps } from "vue";
import viewHistoriesModal from "./histories.modal.View.vue";
const props = defineProps(["user"]);
const emit = defineEmits(["changeModal"]);

const openModal = () => {
  emit("changeModal", true);
};
</script>

<template>
  <div class="historiesCard__multimedia">
    <div v-for="(item, index) in 17" :key="index" class="historiesCard__multimedia-card" @click="openModal()">
      <img class="historiesCard__multimedia-img" src="https://www.clarin.com/img/2022/01/18/hbk6uZTaw_720x0__1.jpg" alt="" />
      <div class="historiesCard__multimedia-play">
        <i @click="openModal()" class="fa-solid fa-play"></i>
      </div>
      <div class="historiesCard__info">
        <p class="historiesCard__info-name">Sara, 18</p>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.historiesCard {
  &__multimedia {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 10px;
    position: absolute;
    padding: 10px;
    overflow: hidden;
    

    &-card {
      // @include Column;
      display: flex;
      width: 150px;
      height: 180px;
      border: 3px solid rgb(0, 0, 0);
      border-radius: 10px;
      font-size: 40px;
      overflow: hidden;
    }
    i {
      color: #00b7ff;
      cursor: pointer;
    }
    &-img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    &-play {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 150px;
      height: 180px;
      position: absolute;
      cursor: pointer;
    }
    @media screen and (max-width: 510px) {
      &-play,
      &-card {
        width: 295px;
        min-width: 295px;
      }
    }
    @media screen and (max-width: 668px) {
      &-play,
      &-card {
        width: 250px;
      }
    }
    @media screen and (min-width: 668px) {
      &-play,
      &-card {
        width: 250px;
      }
    }
    @media screen and (min-width: 1160px) {
      width: 70%;
    }
  }
  &__info {
    display: flex;
    justify-content: center;
    align-items: center;
    // width: 96%;
    position: absolute;
    background-color: rgba(0, 0, 0, 0.566);
    border-radius: 20px;
    padding: 3px;
    text-align: center;
    margin-top: 5px;
    margin-left: 5px;

    &-name {
      font-size: 13px;
      color: #ffffff;
      cursor: pointer;
    }
  }
}

</style>

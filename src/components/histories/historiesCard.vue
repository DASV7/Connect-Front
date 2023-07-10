<script setup>
import { ref, defineProps } from "vue";
const props = defineProps(["user"]);
</script>

<template>
  <div class="historiesCard__multimedia">
    <div v-for="(item, index) in 20" :key="index" class="historiesCard__multimedia-card">
      <img class="historiesCard__multimedia-img" src="https://upload.wikimedia.org/wikipedia/commons/c/c2/Anime_Girl.svg" alt="" />
      <div class="historiesCard__multimedia-play">
        <i class="fa-solid fa-play"></i>
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
    // width: 100%;
    // height: 30%;
    padding: 10px;

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
    }
  }
}
@media screen and (max-width: 510px) {
  .historiesCard__multimedia-play,
  .historiesCard__multimedia-card {
    width: 295px;
    min-width: 295px;
  }
}
@media screen and (max-width: 668px) {
  .historiesCard__multimedia-play,
  .historiesCard__multimedia-card {
    width: 250px;
  }
}
@media screen and (min-width: 668px) {
  .historiesCard__multimedia-play,
  .historiesCard__multimedia-card {
    width: 250px;
  }
}
</style>

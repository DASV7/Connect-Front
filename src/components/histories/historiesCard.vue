<script setup>
import { ref, defineProps, onMounted } from "vue";
import { calculateAge } from "../../utils/calculateAge";

const props = defineProps(["user"]);
const emit = defineEmits(["changeModal"]);

const userAndhistories = ref();
// console.log(userAndhistories.value );
const openModal = () => {
  emit("changeModal",userAndhistories.value);
};

onMounted(()=>{
  userAndhistories.value = props.user
  // console.log(userAndhistories.value);
})
</script>

<template>
  <div class="historiesCard__multimedia" v-if="userAndhistories">
    <div class="historiesCard__multimedia-card" @click="openModal()">
      <img class="historiesCard__multimedia-img" :src="userAndhistories?.histories[0]?.url" alt="" />

      <div class="historiesCard__info">
        <p class="historiesCard__info-name">{{ userAndhistories.name }}, {{ calculateAge(userAndhistories.birthday) }}</p>
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
    // position: absolute;
    padding: 5px;
    overflow: hidden;
    max-width: 280px;
    max-height: 180px;
    position: relative;
    overflow: hidden;

    &-card {
      // @include Column;
      display: flex;
      width: 150px;
      height: 180px;
      border: 3px solid $primary-color;
      border-radius: 10px;
      font-size: 40px;
      overflow: hidden;
      cursor: pointer;
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
        width: 150px;
      }
    }
    @media screen and (max-width: 668px) {
      &-play,
      &-card {
        width: 150px;
      }
    }
    @media screen and (min-width: 668px) {
      &-play,
      &-card {
        width: 150px;
      }
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

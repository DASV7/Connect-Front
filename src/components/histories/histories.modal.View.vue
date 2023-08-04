<script setup>
import { ref, defineEmits, defineProps, onMounted } from "vue";
import { calculateAge } from "../../utils/calculateAge";
import axios from "../..//api/axios";

const props = defineProps(["showModal", "user"]);

const userAndhistories = ref();
onMounted(() => {
  userAndhistories.value = props.user;
});

const follow = async (otherId) => {
  const response = await axios.post("/followers", { userBeingFollowed: otherId   });

  console.log(response);
};
</script>

<template>
  <div v-if="props.showModal && props.user" @click="$emit('closeOnClick')" class="viewHistoriesModal">
    <div class="viewHistoriesModal__container">
      <!-- header  -->

      <div class="viewHistoriesModal__header">
        <button class="viewHistoriesModal__header-btn" @click="$emit('closeModal')">
          <i class="fa-regular fa-x"></i>
        </button>
      </div>

      <!-- historie  -->

      <div class="viewHistoriesModal__historie" v-if="userAndhistories?.histories">
        <!-- img historie  -->

        <img class="viewHistoriesModal__historie-img" :src="userAndhistories?.histories[0]?.url" alt="" />

        <!-- data user hisotrie  -->

        <div class="viewHistoriesModal__historie-container">
          <div class="viewHistoriesModal__historie-user">
            <p class="viewHistoriesModal__historie-info">{{ userAndhistories?.name }}, {{ calculateAge(userAndhistories?.birthday) }}</p>
            <span class="viewHistoriesModal__historie-description">{{ userAndhistories?.histories[0]?.description }}</span>
          </div>
          <button @click="follow(userAndhistories?._id)"><i class="fa-solid fa-plus"></i> Seguir</button>
        </div>

        <p class="viewHistoriesModal__historie-status">{{ userAndhistories?.histories[0]?.status }}</p>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
* {
  margin: 0%;
}
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
  background-color: rgb(0 0 0 / 71%);

  &__container {
    width: 380px;
    // height: 90%;
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
    display: flex;
    flex-direction: column;
    gap: 5px;
    width: 100%;
    height: 100%;

    &-container {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 10px;

      button {
        cursor: pointer;
        font-family: monospace;
        padding: 3px;
        border-radius: 5px;
        border: none;
        outline: none;
      }
    }
    &-description {
      color: white;
    }

    &-user {
      display: flex;
    }
    &-info {
      font-size: 10px;
      font-weight: 700;
      padding: 4px;
      border-radius: 10px;
      width: fit-content;
      color: #fff;
    }
    &-description {
      background-color: #a19d9d;
      padding: 4px;
      border-radius: 5px;
      width: fit-content;
      font-family: monospace;
    }
    &-status {
      background-color: $primary-color;
      font-family: monospace;
      font-size: 15px;
      font-weight: 700;
      width: fit-content;
      padding: 4px;
      border-radius: 10px;
    }
    &-img {
      width: 100%;
      height: 95%;
      object-fit: contain;
      border-radius: 20px;
    }
  }
}
@media (max-width: 1024px) {
  .viewHistoriesModal__container {
    // width: 80%;
    margin-left: 0px;
  }
}

@media (max-width: 524px) {
  .viewHistoriesModal__container {
    width: 100%;
    margin-left: 0px;
  }
}
</style>

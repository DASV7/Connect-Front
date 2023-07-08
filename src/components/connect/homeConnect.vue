<script setup>
import connect from "./connect.vue";
import axios from "../../api/axios";
import { onMounted, ref, computed } from "vue";
import { useSocketStore } from "../../store/socketStore";
import { useCounterStore } from "../../store/users";
import miniLoading from "../shared/miniLoading.vue";
const isLoading = ref(false);
const users = ref([]);
import jwt_decode from "jwt-decode";
import { useRouter } from "vue-router";

const userStore = useCounterStore();

const router = useRouter();

const socket = useSocketStore().socket;

const getListUsers = async () => {
  isLoading.value = true;
  const response = await axios.post("/connect");
  users.value = response.data.data;
  isLoading.value = false;
  // console.log(users.value.map((e) => e.preferences));
};
const index = ref(0);
const total = ref(users.value.length);

const sendLike = async (user) => {
  isLoading.value = true;
  if (index.value < users.value.length) {
    const response = await axios.post(`/connect/like/`, {
      userWhoLike: user._id,
    });
    index.value++;
  }
  isLoading.value = false;
};

const sendDislike = async (user) => {
  isLoading.value = true;
  if (index.value < users.value.length && index.value >= 0) {
    const response = await axios.post(`/connect/dislike`, {
      userRejected: user._id,
    });
    index.value++;
  }
  isLoading.value = false;
};

const sendMessage = async (user) => {};

onMounted(() => {
  const isNew = router.currentRoute.value.query.reg;
  if (isNew) {
    const decodeToken = jwt_decode(localStorage.getItem("vinc-jwt"));
    if (decodeToken) userStore.$patch({ user: decodeToken });
  }
  getListUsers();
});
</script>

<template>
  <div class="homeConnect">
    <div class="homeConnect__header">
      <p>Encuentros</p>
      <img class="homeConnect__img" src="../../../public/svgLogoComplete.svg" alt="" srcset="" />
      <div class="homeConnect__header-icons">
        <i class="fa fa-undo" aria-hidden="true"></i>
        <i class="fa fa-sliders" aria-hidden="true"></i>
      </div>
    </div>
    <div class="homeConnect__content">
      <div class="homeConnect__container">
        <div class="homeConnect__component" v-if="users[index]">
          <connect v-if="!isLoading" :user="users[index]" @like="sendLike($event)" @dislike="sendDislike($event)" @message="sendMessage($event)" />
        </div>
        <div class="homeConnect__notAvaliable" v-if="!users[index] && !isLoading">
          <i class="fa fa-exclamation-triangle" aria-hidden="true"></i>
          Vas muy rapido, Vuelve en un momento.
        </div>
        <miniLoading v-if="isLoading"></miniLoading>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
* {
  font-family: sans-serif;
}
.homeConnect {
  overflow: hidden;
  width: 100%;
  height: 100%;

  &__content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    // max-height: 91vh;
  }

  &__notAvaliable {
    display: flex;
    flex-direction: column;
    border: 1px solid rgba(128, 128, 128, 0.027);
    height: 80vh;
    border-radius: 5px;
    text-align: center;
    padding: 5px;
    background-color: $primary-color;
    color: white;
    font-size: 20px;
    font-weight: bold;
    box-shadow: 0px 0px 10px 0px rgba(0, 0, 10, 0.2);

    i {
      font-size: 120px;
    }
  }

  &__img {
    width: 98px;
    position: relative;
    left: -25px;
    margin: 5px 0;
  }
  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 24px;
    font-size: 20px;
    font-weight: bold;
    &-icons {
      display: flex;
      gap: 10px;
    }
  }

  &__container {
    display: flex;
    justify-content: center;
    overflow: hidden;
    position: relative;
    overflow: hidden;
    @include dynamicScreen(650px) {
      box-shadow: #000 0px 5px 10px;
      border-radius: 20px;
      height: 94vh;
      width: 400px;
    }
  }

  &__component {
    width: 100%;
    border-radius: 10px 10px 0px 0px;
    width: 94%;
  }
}
// @media screen and (min-width: 650px) {
//   .homeConnect__content {
//     height: 100vh;
//   }
// }
</style>

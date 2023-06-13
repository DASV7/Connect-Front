<script setup>
import connect from "./connect.vue";
import axios from "../../api/axios";
import { onMounted, ref } from "vue";
import Modal from "../shared/modal.vue";
const isLoading = ref(false);
const users = ref([]);

const getListUsers = async () => {
  isLoading.value = true;
  const response = await axios.post("/connect");
  users.value = response.data;
  isLoading.value = false;
};
const index = ref(0);
const total = ref(users.value.length);
onMounted(() => {
  getListUsers();
});

const sendLike = async (user) => {
  isLoading.value = true;
  // const response = await axios.post(`/connect/like/${id}`);
  if (index.value <= users.value.length) {
    console.log("Juliana esta gorda", user);
    index.value++;
  }
  isLoading.value = false;
};

const sendDislike = async (user) => {
  isLoading.value = true;
  if (index.value < users.value.length && index.value >= 0) {
    console.log(index);
    index.value--;
  }
  isLoading.value = false;
  // const response = await axios.post(`/connect/dislike/${id}`);
};

const sendMessage = async (user) => {
  // const response = await axios.post(`/connect/message/${id}`);
};
</script>

<template>
  <div class="homeConnect">
    <div class="homeConnect__header">
      <p>Encuentros</p>
      <img
        class="homeConnect__img"
        src="../../../public/svgLogoComplete.svg"
        alt=""
        srcset=""
      />
      <div class="homeConnect__header-icons">
        <i class="fa fa-undo" aria-hidden="true"></i>
        <i class="fa fa-sliders" aria-hidden="true"></i>
      </div>
    </div>

    <div class="homeConnect__container">
      <div class="homeConnect__component">
        <connect
          v-if="!isLoading"
          :user="users[index]"
          @like="sendLike($event)"
          @dislike="sendDislike($event)"
          @message="sendMessage($event)"
        />
      </div>
    </div>
  </div>
</template>

<style lang="scss">
* {
  font-family: sans-serif;
}
.homeConnect {
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
  }

  &__component {
    width: 100%;
    border-radius: 10px 10px 0px 0px;
    width: 94%;
  }
}
</style>

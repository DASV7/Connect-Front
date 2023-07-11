<script setup>
import { onMounted, ref } from "vue";
import axios from "../../api/axios";
import Swal from "sweetalert2";
import avatarUser from "../shared/avatarUser.vue";
import { useCounterStore } from "../../store/users.js";
import whoLikesMe from "../likes/whoLikesMe.vue";
const users = ref([]);
const usersStore = useCounterStore();
const avatarUsers = ref({});

const otherAvatar = (users) => {
  const valor = users.find((user) => {
    return user._id != usersStore.user._id;
  });
  // console.log(valor);
  return valor || {};
};
const loading = ref(true);
onMounted(async () => {
  const user = await axios.get("/messages/conversations").catch((error) => {
    loading.value;
    Swal.fire({
      icon: "error",
      title: "Ocurrio un error",
      text: "Error al solicitar los mensajes",
      showConfirmButton: false,
      timer: 2000,
    });
  });
  const response = user.data.data;
  users.value = response;
  loading.value = false;
});
let usersLike = ref([]);

const isLoading = ref(false);
onMounted(async () => {
  isLoading.value = true;
  await axios
    .get("/viewlikes")
    .then((res) => {
      usersLike.value = res.data;
      isLoading.value = false;
    })
    .catch((error) => {
      isLoading.value = false;
    });
});
</script>
<i class="fa-solid fa-heart"></i>
<template>
  <div class="messagesView" v-if="!loading">
    <p>Hoy sera un excelente día...</p>
    <div class="messagesView__wrapper" v-if="users.length">
      <div class="messagesView__container">
        <div class="messagesView__likes" scrollDefalult>
          <p @click="$router.push('likes')">Likes</p>
          <div class="messagesView__likes-card" v-for="(user, index) in usersLike" :key="index">
            <img class="messagesView__likes-img" :src="user?.pictures[0].url" alt="" />
          </div>
        </div>
        <div class="messagesView__cardChat" v-for="(user, index) in users" :key="index" @click="$router.push(`/messages/${user._id}`)">
          <div class="messagesView__cardChat-img">
            <avatarUser :user="otherAvatar(user.members)" :size="40" />
          </div>

          <div class="messagesView__cardChat-info">
            <div class="messagesView__cardChat-userName">
              {{ otherAvatar(user.members).name }}
            </div>
            <div class="messagesView__cardChat-text">
              {{ user.ultimateMessage || "Da el primer paso" }}
            </div>
          </div>
          <div class="messagesView__cardChat-countMessages">
            {{ user.countMessages || 0 }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.messagesView {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  padding: 10px;
  width: 100%;
  height: 100%;

  &__likes {
    display: flex;
    align-items: center;
    gap: 10px;
    width: 100%;
    height: 70px;
    // border: solid 1px #000;
    overflow-x: auto;

    p {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 50px;
      height: 60%;
      // border: 2px solid #000;
      border-radius: 10px;
      cursor: pointer;
      background-color: $primary-color;
      color: #fff;
      font-weight: 500;
    }

    &-card {
      width: 60px;
      height: 60px;
      border: solid 1px #000;
      border-radius: 100px;
      overflow: hidden;
    }
    &-img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  &__wrapper {
    display: flex;
    width: 100%;
    height: 100%;

    @media screen and (min-width: 1024px) {
      width: 55%;
      height: 93%;
      margin: auto;
      margin-top: 10px;
      background-color: #ffffff;
      box-shadow: #000 0px 5px 10px;
      border-radius: 20px;
    }
  }

  &__container {
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: 100%;
    height: 100%;

    @media screen and (min-width: 1024px) {
      padding: 10px;
    }
  }

  &__cardChat {
    display: flex;
    justify-content: space-between;
    align-self: center;
    gap: 10px;
    border-bottom: 1px solid #5e5e5ec9;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    border-radius: 10px;
    cursor: pointer;
    padding: 10px;
    height: 40px;
    width: 300px;

    &-userName {
      font-weight: bold;
    }

    &-text,
    &-userName {
      max-width: 204px;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
    }

    &-countMessages {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 25px;
      width: 25px;
      text-align: center;
      font-size: 12px;
      background-color: $primary-color;
      border-radius: 50%;
    }
  }
}
</style>

<script setup>
import { onMounted, ref, onUnmounted } from "vue";
import axios from "../../api/axios";
import Swal from "sweetalert2";
import avatarUser from "../shared/avatarUser.vue";
import { useCounterStore } from "../../store/users.js";
import whoLikesMe from "../likes/whoLikesMe.vue";
import { useRouter } from "vue-router";

const users = ref([]);
const usersStore = useCounterStore();
const avatarUsers = ref({});
const router = useRouter();
const otherAvatar = (users) => {
  const valor = users.find((user) => {
    return user._id != usersStore.user?._id;
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

// Cuando la resolucion sea menor que 1024 
// aJUSTE DE RESOLUCION
const isGreaterThan1024 = ref(false);
const handleResize = () => {
  isGreaterThan1024.value = window.innerWidth >= 1024;
};

onMounted(() => {
  // ... (otros códigos)

  handleResize();
  window.addEventListener("resize", handleResize);

  // ... (otros códigos)
});

onUnmounted(() => {
  window.removeEventListener("resize", handleResize);
});

</script>
<i class="fa-solid fa-heart"></i>

<template>

<div class="messagesView" v-if="!loading" v-bind:style="{ background: isGreaterThan1024 ? 'none' : '#fff' }">

    <p>Hoy sera un excelente día...</p>
    <div class="messagesView__wrapper" v-if="users.length">
      <div class="messagesView__container">

        <!-- View like -->

        <div class="messagesView__likes" scrollDefalult>
          <p @click="$router.push('likes')">Likes</p>
          <div class="messagesView__likes-card" v-for="(user, index) in usersLike" :key="index">
            <img @click="$router.push('likes')" class="messagesView__likes-img" :src="user?.pictures[0].url" alt="" />
          </div>
        </div>
        
        <!-- messages -->
        
        <div class="messagesView__cardChat" v-for="(user, index) in users" :key="index" @click="$router.push(`/messages/${user._id}`)">
          <div class="messagesView__cardChat-img">
            <avatarUser :user="otherAvatar(user.members)" :size="40" />
          </div>
            
          <!-- avatar USer  -->

          <div class="messagesView__cardChat-info">
            <div class="messagesView__cardChat-userName">
              {{ otherAvatar(user.members).name }}
            </div>
            <div class="messagesView__cardChat-text">
              {{ user.ultimateMessage || "Da el primer paso" }}
            </div>
          </div>

          <!-- Count Mesages -->

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
  // padding: 10px;
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
    background-color: #5699d46e;
    border-radius: 20px;

    @media (max-width: 1024px) {
      width: 50%;
      margin: auto;
      margin-bottom: 0px;
      margin-top: 10px;
      min-width: 320px;
    } 

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
      color: #454242;
      font-weight: 500;
      margin-left: 10px;
    }

    &-card {
      width: 60px;
      height: 60px;
      border: solid 2px #fff;
      border-radius: 100px;
      overflow: hidden;
    }
    &-img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      cursor: pointer;
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

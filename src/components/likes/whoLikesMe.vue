<script setup>
import { onMounted, ref } from "vue";
import axios from "../../api/axios.js";
import miniLoading from "../shared/miniLoading.vue";
import connect from "../../components/connect/connect.vue";
import Modal from "../shared/modal.vue";
import { calculateAge } from "../../utils/calculateAge";

const usersLike = ref([]);

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

const sendLike = async (user) => {
  const response = await axios.post(`/connect/like/`, {
    userWhoLike: user._id,
  });
  const toDelete = usersLike.value.findIndex((item) => item._id == user._id);
  usersLike.value.splice(toDelete, 1);
};

const sendRejected = async (user) => {
  const response = await axios.post(`/connect/dislike`, {
    userRejected: user._id,
  });
  const toDelete = usersLike.value.findIndex((item) => item._id == user._id);
  usersLike.value.splice(toDelete, 1);
};
let hiddenProfile = ref(false);

function changeModal(user) {
  hiddenProfile.value = !hiddenProfile.value;
  console.log(user);
  userModal.value = user || null;
}
let userModal = ref(null);
</script>

<template>
  <div class="whoLikesMe">
    <div class="whoLikesMe__logo">
      <button class="whoLikesMe__logo-back" @click="$router.push('/messages')"><i class="fa-solid fa-arrow-left"></i></button>
      <img class="whoLikesMe__logo-img" src="/public/svgLogoComplete.svg" alt="" />
      <p class="whoLikesMe__tittle">LIKES</p>
      <p class="whoLikesMe__tittle-sub">Cobrar por los "me gusta" limita el amor. Dejemos que fluya sin barreras.</p>
    </div>
    <div class="whoLikesMe__container">
      <!-- Modal -->

      <miniLoading v-if="isLoading"></miniLoading>
      <Modal v-if="userModal" :showModal="!!userModal" @changeModal="changeModal()">
        <template v-slot:content>
          <connect class="whoLikesMe__modal" :user="userModal" :hiddeActions="false" />
        </template>
      </Modal>

      <!-- Card User Like  -->
      <div class="whoLikesMe__containerUser">
        <div class="whoLikesMe__user" v-for="(user, index) in usersLike" :key="index">
          <div class="whoLikesMe__user-img">
            <img @click="changeModal(user)" class="whoLikesMe__user-img" :src="user?.pictures[0].url" alt="" />
          </div>
          <div class="whoLikesMe__user-cont">
            <p class="whoLikesMe__user-name">
              {{ user.name }}
            </p>
            <div class="whoLikesMe__user-actions">
              <button class="whoLikesMe__user-btn" @click="sendRejected(user)">
                <i class="fa fa-times" aria-hidden="true"></i>
              </button>
              <button @click="sendLike(user)" class="whoLikesMe__user-btn">
                <i class="fa fa-heart"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.whoLikesMe {
  width: 100%;
  height: 100%;
  padding: 0px 10px 10px 10px;

  &__modal {
    background-color: #fff;
    width: 400px;
    max-width: 100%;
  }
  &__containerUser {
    widows: 100%;
    display: flex;
    flex-wrap: wrap;
    gap: 15px;
    
    
  }
  &__logo {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    margin-top: 10px;
    gap: 10px;
    width: 100%;

    &-img {
      width: 100px;
    }
    &-back {
      border: none;
      background-color: #50bded;
      width: 45px;
      height: 30px;
      text-align: center;
      color: #fff;
      border-radius: 30px;
      cursor: pointer;
    }
  }
  &__tittle {
    font-size: 12px;
    font-weight: 600;

    &-sub {
      font-size: 9px;
      font-weight: 600;
      background-color: #bababa8b;
      padding: 3px;
      border-radius: 5px;
      text-align: center;
      @media screen and (max-width: 1024px) {
        margin-bottom: 10px;
      }
    }
  }

  &__container {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 40px;

    @media screen and (min-width: 1024px) {
      display: flex;
      align-items: start;
      flex-wrap: wrap;
      width: 55%;
      height: 85%;
      margin: auto;
      margin-top: 10px;
      background-color: #ffffff;
      box-shadow: #000 0px 5px 10px;
      border-radius: 20px;
      padding: 10px;
    }
  }

  &__user {
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: hidden;
    border-radius: 10px;
    width: 130px;
    height: 160px;
    box-shadow: 0px 2px 6px;
    
  

    &-cont {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 100%;
    }

    &-img {
      width: 100%;
      height: 110px;
      object-fit: cover;
      border-radius: 5px;
    }
    &-name {
      font-size: 15px;
      font-weight: 400;
      max-width: 160px;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
    }
    &-actions {
      display: flex;
      gap: 10px;
    }
    &-btn {
      border: 2px solid #bababa;
      border-radius: 100%;
      width: 30px;
      height: 30px;
      text-align: center;
      background-color: transparent;
      cursor: pointer;
      outline: none;
      font-size: 20px;
      color: $primary-color;

      .fa-times {
        color: red;
      }
    }
  }
}
</style>

<script setup>
import axios from "../../api/axios";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { goToGo, interest } from "../../utils/sharedObjects";
import { calculateAge } from "../../utils/calculateAge";
import { useCounterStore } from "../../store/users";
import advanges from "../advanges/advanges.vue";
const userStore = useCounterStore();
const router = useRouter();

onMounted(() => {
  userProfile();
});
let isLoading = ref(true);

let dataUser = ref({});
let user = ref({});
let preferences = ref({});

const userProfile = () => {
  isLoading.value = true;
  const info = axios
    .get("/profile")
    .then((response) => {
      dataUser.value = response.data;
      user.value = dataUser.value.user;
      preferences.value = dataUser.value.preferences;
      isLoading.value = false;
      userStore.$patch({ user: user.value, preferences: preferences.value });
    })
    .catch((error) => console.error(error));
};

const closeSesion = () => {
  localStorage.clear();
  router.push("/");
  window.location.reload();
};

const hereFor = {
  relationship: interest[0],
  chat: interest[1],
  contact: interest[2],
};
</script>

<template>
  <div v-if="!isLoading" class="profileUser" scrollDefault>
    <div class="profileUser__wrapper" scrollDefault>
      <!-- header profile  -->

      <div class="profileUser__container">
        <div class="profileUser__header">
          <p class="profileUser__header-p">Perfil</p>
          <div class="profileUser__header-settings"></div>
        </div>
        <div class="profileUser__info" v-if="user?.name">
          <button @click="$router.push('/settings')" class="profileUser__header-btn">
            <i class="fa fa-cog" aria-hidden="true"></i></button>
          <div class="profileUser__info-container">
            <div class="profileUser__photoProfile">
              <div class="profileUser__photoProfile-cont">
                <img @click="$router.push('/editProfile')" class="profileUser__photoProfile-img" :src="user?.pictures[0].url" />
              </div>
            </div>
            <div class="profileUser__info-name">
              <p class="profileUser__info-p">{{ user.name }}, {{ calculateAge(user?.birthday) }}</p>
              <p class="profileUser__info-txt">
                <i class="fa-solid fa-message"></i>
                Estas aqui {{ hereFor[user.hereFor]?.text }}
              </p>
            </div>
          </div>
          <button @click="$router.push('/editProfile')" class="profileUser__header-btn"><i class="fa-solid fa-user-pen"></i></button>
        </div>
      </div>

      <!-- andvangesb and premium  -->

      <div class="infoPremium">
        <div class="infoPremium__vinc">
          <div class="infoPremium__vinc-tittle">
            <img class="infoPremium__vinc-logo" src="../../../public/svgLogoComplete.svg" alt="" />
            <p class="infoPremium__vinc-txt">PREMIUM</p>
          </div>
          <div class="infoPremium__txt">
            <p class="infoPremium__txt-exp">Controla toda tu experiencia con Premium y obten hasta 12 + 1 mas matches* que la gente sin Premium</p>
          </div>
          <button class="infoPremium__txt-btn" @click="$router.push('/premium')">Suscribete</button>
        </div>
        <advanges></advanges>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.profileUser {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  overflow: auto;

  &__wrapper {
    width: 100%;
    height: 100%;
  }
  &__container {
    width: 100%;
    height: 34%;

  }
  &__header {
    display: flex;
    justify-content: space-between;
    align-items: end;
    width: 100%;
    height: 12%;

    &-p {
      font-size: 15px;
      font-weight: 700;
      margin-left: 10px;
    }
    &-settings {
      display: flex;
      gap: 5px;
      margin-right: 10px;
    }
    &-btn {
      text-align: center;
      width: 40px;
      height: 40px;
      font-size: 20px;
      border-radius: 30px;
      color: #3e4446;
      background-color: #f8f4f4;
      border: none;
      cursor: pointer;
    }
  }
  &__photoProfile {
    @include flexCenter;
    flex-direction: column;
    width: 65%;
    height: 90%;
    max-width: 100px;
    min-height: 110px;
    cursor: pointer;

    &-cont {
      @include flexCenter;
      width: 100px;
      height: 110px;
      max-width: 100px;
      max-height: 110px;
      border-radius: 100%;
      overflow: hidden;
      border: 4px solid $primary-color;
    }

    &-img {
      width: 108%;
      height: 100%;
      // border-radius: 100%;
      object-fit: cover;
    }
  }
  &__info {
    @include flexCenter;
    width: 100%;
    height: 60%;

    &-p {
      margin-top: 5px;
      font-weight: 700;
      font-size: 14px;
    }
    &-txt {
      background-color: #dadada;
      color: #000;
      border-radius: 40px;
      font-size: 9px;
      font-weight: 700;
      padding: 5px 5px 5px 5px;
      margin-top: 5px;
      width: 70%;
      min-width: 150px;
    }
    &-container {
      display: flex;
      align-items: center;
      flex-direction: column;
      // width: 100%;
      height: 100%;
    }
  }
  &__info-name {
    text-align: center;
  }
}
.infoPremium {
  display: flex;
  flex-direction: column;
  align-items: center;
  // width: 100%;
  // height: 112%;
  margin-top: 20px;

  &__vinc {
    @include flexCenter;
    flex-direction: column;
    width: 90%;
    height: 25%;
    max-width: 600px;
    max-height: 40%;
    border-radius: 20px;
    gap: 15px;
    background-image: linear-gradient(to top, rgba(80, 189, 237, 0.8), #50bded);
    padding: 5px;
    max-width: 430px;

    &-tittle {
      @include flexCenter;
      width: 80%;
      height: 35px;
      border-radius: 20px;
      background-color: #ffffff;
      max-width: 270px;
      margin-top: 10px;
    }
    &-logo {
      width: 90px;
    }
    &-txt {
      font-size: 17px;
      font-weight: 700;
      color: #50bded;
    }
  }
  &__txt {
    @include flexCenter;
    flex-direction: column;
    width: 85%;
    // background-color: #fff;
    border-radius: 20px;
    margin-top: 5px;
    &-exp {
      font-size: 9px;
      font-weight: 900;
      color: #fff;
      text-align: center;
      margin-bottom: 10px;
    }
    &-btn {
      width: 80%;
      height: 35px;
      border: solid 3px #fff;
      background-color: #50bded;
      color: #fff;
      border-radius: 20px;
      font-weight: 800;
      max-width: 290px;
      cursor: pointer;
    }
  }
}

@media (max-width: 1000px) {
  .infoPremium {
    margin-top: 0px;
  }
}

@media (min-width: 1000px) {
  .infoPremium {
    margin-top: 0px;
  }
  .profileUser {
    // display: flex;
    // flex-direction: column;
    // align-items: center;
    &__container {
      display: flex;
      flex-direction: column;
    }
  }
  .infoPremium__advantages {
    // width: 40%;

    &-txt {
      font-size: 14px;
      font-weight: 100;
    }
  }
  .infoPremium__vinc {
    height: 100%;
    // width: 40%;
    max-width: 480px;

    &-tittle {
      margin-top: 10px;
      font-size: 50%;
      width: 50%;
    }
  }
  .infoPremium__txt-btn {
    margin-bottom: 10px;
    width: 60%;
  }

  .infoPremium__txt-exp {
    font-size: 12px;
  }
  .profileUser__wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 55%;
    height: 95%;
    // box-shadow: 0px 5px 15px #9e9c9c8d;
    box-shadow: #000 0px 5px 10px;
    overflow-y: scroll;
    border-radius: 20px;
  }
}
</style>

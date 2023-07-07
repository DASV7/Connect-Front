<template>
  <div v-if="!isLoading" class="profileUser"  scrollDefault>
    <div class="profileUser__wrapper" scrollDefault>
    <div class="profileUser__container">
      <div class="profileUser__header">
        <p class="profileUser__header-p">Perfil</p>
        <div class="profileUser__header-settings"></div>
      </div>
      <div class="profileUser__info" v-if="user?.name">
        <button @click="$router.push('/settings')" class="profileUser__header-btn"><i class="fa fa-cog" aria-hidden="true"></i></button>
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
    <div class="infoPremium">
      <div class="infoPremium__vinc">
        <div class="infoPremium__vinc-tittle">
          <img class="infoPremium__vinc-logo" src="../../../public/svgLogoComplete.svg" alt="" />
          <p class="infoPremium__vinc-txt">PREMIUM</p>
        </div>
        <div class="infoPremium__txt">
          <p class="infoPremium__txt-exp">Controla toda tu experiencia con Premium y obten hasta 12 + 1 mas matches* que la gente sin Premium</p>
        </div>
        <button class="infoPremium__txt-btn">Suscribete</button>
      </div>
      <div class="infoPremium__advantages">
        <div class="infoPremium__advantages-target" v-for="(item, index) in advantages" :key="index">
          <div class="infoPremium__advantages-cont">
            <i :class="item.icon" aria-hidden="true"></i>
            <p class="infoPremium__advantages-txt">{{ item.txt }}</p>
          </div>
          <div class="infoPremium__advantages-cont2">
            <i :class="item.checkOn" aria-hidden="true"></i>
            <i :class="item.checkOff" aria-hidden="true"></i>
          </div>
        </div>
      </div>
      <button class="profileUser__header-btn" @click="closeSesion()">
        <i class="fa fa-sign-out" aria-hidden="true"></i>
      </button>
    </div>
    </div>
  </div>
</template>

<script setup>
import axios from "../../api/axios";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { goToGo, interest } from "../../utils/sharedObjects";
import { calculateAge } from "../../utils/calculateAge";
import { useCounterStore } from "../../store/users";

const userStore = useCounterStore();
const router = useRouter();

onMounted(() => {
  userProfile();
});
let isLoading = ref(true);

let dataUser = ref({});
let user = ref({});
let preferences = ref({});

const userProfile = async () => {
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
  // console.log(info);
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

const advantages = [
  {
    icon: "fa fa-heart",
    txt: "Descubre a quien le gustas",
    checkOn: "fa fa-check",
    checkOff: "fa fa-check-square-o",
  },
  {
    icon: "fa fa-commenting",
    txt: "Desbloquea 2 chats cada semana sin match",
    checkOn: "fa fa-check",
    checkOff: "fa fa-check-square-o",
  },
  {
    icon: "fa fa-bolt",
    txt: "1 Vizualizacion extra cada semana",
    checkOn: "fa fa-check",
    checkOff: "fa fa-check-square-o",
  },
  {
    icon: "fa-solid fa-check-double",
    txt: "Ver mesajes leidos",
    checkOn: "fa fa-check",
    checkOff: "fa fa-check-square-o",
  },
  {
    icon: "fa fa-arrow-circle-up",
    txt: "Dar prioridad a tus mensajes",
    checkOn: "fa fa-check",
    checkOff: "fa fa-check-square-o",
  },
  {
    icon: "fa-solid fa-bars",
    txt: "Nunca te quedas sin votos",
    checkOn: "fa fa-check",
    checkOff: "fa fa-check-square-o",
  },
  {
    icon: "fa-solid fa-rotate-left",
    txt: "Anula tus votos a la izquierda",
    checkOn: "fa fa-check",
    checkOff: "fa fa-check-square-o",
  },
  {
    icon: "fa-solid fa-sliders",
    txt: "Filtros sin limites",
    checkOn: "fa fa-check",
    checkOff: "fa fa-check-square-o",
  },
  {
    icon: "fa-solid fa-user-ninja",
    txt: "Vista de perfiles sin que te vean",
    checkOn: "fa fa-check",
    checkOff: "fa fa-check-square-o",
  },
  {
    icon: "fa-solid fa-ban",
    txt: "Nunca te quedas sin votos",
    checkOn: "fa fa-check",
    checkOff: "fa fa-check-square-o",
  },
  {
    icon: "fa-solid fa-bars",
    txt: "Elimina toda la publicidad",
    checkOn: "fa fa-check",
    checkOff: "fa fa-check-square-o",
  },
];
</script>

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
    // display: flex;
    // justify-content: center;
    // flex-direction: column;
    width: 100%;
    height: 100%;
  }
  &__container {

    width: 100%;
    height: 34%;
    // border-bottom: 2px solid $primary-color;
    // box-shadow: 0 2px 15px $primary-color;
    // max-width: 500px;
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
    max-width: 111px;
    min-height: 111px;
    cursor: pointer;

    &-cont {
      @include flexCenter;
      width: 100%;
      height: 100%;
      max-width: 150px;
      max-height: 150px;
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
  width: 100%;
  height: 112%;
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
      width: 90%;
      height: 35px;
      border-radius: 20px;
      background-color: #ffffff;
      max-width: 270px;
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
      width: 100%;
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
  &__advantages {
    display: flex;
    flex-direction: column;
    gap: 5px;
    gap: 10px;
    width: 80%;
    margin-top: 15px;
    max-width: 480px;

    &-target {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 10px;
      width: 100%;
      max-width: 600px;
      height: 30px;
      border-bottom: solid 1px #d0cece;
      margin: auto;
      // color: #50bded;
    }
    &-cont {
      display: flex;
      align-items: center;
      gap: 10px;
    }
    &-cont2 {
      display: flex;
      gap: 15px;
    }
    &-txt {
      color: #000;
      font-size: 8px;
      font-weight: 600;
    }
  }
}
@media (min-width: 1000px) {
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
  .infoPremium__txt-btn{
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
    border: #c3bebe7c solid 2px;
    box-shadow: 0px 5px 15px #9e9c9c8d;
    overflow-y: scroll;
    border-radius: 20px;
  }

}
</style>

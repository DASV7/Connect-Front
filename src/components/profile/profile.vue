<template>
  <div class="profileUser">
    <div class="profileUser__container">
      <div class="profileUser__header">
        <p class="profileUser__header-p">Profile</p>
        <div class="profileUser__header-settings">
          <button class="profileUser__header-btn"><i class="fa fa-cog" aria-hidden="true"></i></button>
          <button @click="$router.push('/editProfile')" class="profileUser__header-btn"><i class="fa-solid fa-user-pen"></i></button>
          <button class="profileUser__header-btn" @click="closeSesion()">
      <i class="fa fa-sign-out" aria-hidden="true"></i>
    </button>
        </div>
      </div>
      <div class="profileUser__info">
        <div class="profileUser__photoProfile">
          <div class="profileUser__photoProfile-cont">
            <img
              class="profileUser__photoProfile-img"
              src="https://scontent.fpei3-1.fna.fbcdn.net/v/t1.6435-9/144497356_2781816275366132_2569166611012571515_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=8bfeb9&_nc_eui2=AeFPMtG-r1dYyuuSv_Q9K7svpkNvGSurx4OmQ28ZK6vHg5KzvRRn7dYxnkiq10XUhOddCNb9tclirBfJ1B-ESB-M&_nc_ohc=8VwUS4iDoC8AX-iXdSN&_nc_ht=scontent.fpei3-1.fna&oh=00_AfCBXHbriqLbowCfsPIEWwBTjtK0EUtEgogZFdS8z6ZBIA&oe=64C31F0F"
            />
          </div>
        </div>
        <div class="profileUser__info-name">
          <p class="profileUser__info-p">Emanuel, 18</p>
          <p class="profileUser__info-txt">
            <i class="fa-solid fa-message"></i>
            Hablar y conocer gente nueva
          </p>
        </div>
      </div>
    </div>
    <div class="infoPremium">
      <div class="infoPremium__vinc">
        <div class="infoPremium__vinc-tittle">
          <img class="infoPremium__vinc-logo" src="../../../public/svgLogoComplete.svg" alt="" />
          <p class="infoPremium__vinc-txt">VINC PREMIUM</p>
        </div>
        <div class="infoPremium__txt">
          <p class="infoPremium__txt-exp">Controla toda tu experiencia con Premium y obten hasta 12 + 1 mas matches* que la gente sin Premium</p>
          <button class="infoPremium__txt-btn">Suscribete</button>
        </div>
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
    </div>

  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import { goToGo, interest } from "../../utils/sharedObjects";
const router = useRouter();
const closeSesion = () => {
  localStorage.clear();
  router.push("/");
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
  width: 100%;
  height: 100vh;
  // overflow: hidden;

  &__container {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 185px;
    border-bottom: 2px solid $primary-color;
    box-shadow: 0 2px 15px $primary-color;
    gap: 10px;
  }
  &__header {
    display: flex;
    justify-content: space-between;
    align-items: end;
    width: 100%;
    height: 30px;

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
      width: 30px;
      height: 20px;
      font-size: 16px;
      border: none;
      background-color: #fff;
    }
  }
  &__photoProfile {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 10px;
    margin-left: 20px;
    height: 75%;

    &-cont {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 100%;
      border-radius: 100%;
      overflow: hidden;
      border: 2px solid #fff;
      outline: solid 4px $primary-color;
    }

    &-img {
      height: 100%;
      // border-radius: 100%;
      object-fit: cover;
    }
  }
  &__info {
    display: flex;
    align-items: center;
    gap: 10px;
    width: 100%;
    height: 125px;
    
    &-p {
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
    }
  }
  // &__info-name {

  // }
}
.infoPremium {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  margin-top: 20px;

  &__vinc {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 90%;
    height: 180px;
    border-radius: 20px;
    gap: 15px;
    background-image: linear-gradient(to top, rgba(80, 189, 237, 0.8), #50bded);

    &-tittle {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 90%;
      height: 35px;
      border-radius: 20px;
      background-color: #ffffff;
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
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
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
    }
  }
  &__advantages {
    display: flex;
    flex-direction: column;
    gap: 5px;
    gap: 10px;
    width: 90%;
    margin-top: 15px;
    &-target {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 10px;
      width: 100%;
      height: 30px;
      border-bottom: solid 1px #d0cece;
      color: #50bded;
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
</style>

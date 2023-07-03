<script setup>
import { ref, onBeforeMount, computed } from "vue";
import { Carousel, Slide } from "vue3-carousel";
import "vue3-carousel/dist/carousel.css";
import interestingIn from "../profile/interestingIn.vue";
import Modal from "../shared/modal.vue";
import { useRouter } from "vue-router";
import { calculateAge } from "../../utils/calculateAge";
import { interest } from "../../utils/sharedObjects";

const isLoading = ref(true);

const props = defineProps(["user", "hiddeActions"]);
const router = useRouter();

onBeforeMount(() => {
  userCard.value = props.user;
  isLoading.value = false;
});

const settings = {
  itemsToShow: 1,
  snapAlign: "center",
  infinity: true,
};
const hereFor = {
  relationship: interest[0],
  chat: interest[1],
  contact: interest[2],
};

const breakpoints = {
  700: {
    itemsToShow: 3.5,
    snapAlign: "center",
  },
  1024: {
    itemsToShow: 5,
    snapAlign: "start",
  },
};

let userCard = computed(() => {
  console.log(props.user);
  return props.user;

});

const buttonsActions = [
  { text: "Ignorar", icon: "fa fa-times-circle", action: "dislike" },
  { text: "Mensaje", icon: "fa fa-paper-plane", action: "message" },
  { text: "Like", icon: "fa fa-heart-o", action: "like" },
];
const preferencesUser = [
  { name: "Soltero", icon: "fa-solid fa-heart" },
  { name: "Bebé", icon: "fa-solid fa-baby" },
  { name: "1.67m", icon: "fa-solid fa-ruler" },
  { name: "Gato(s)", icon: "fa-solid fa-paw" },
  { name: "Idioma", icon: "fa-solid fa-language" },
];
let startTouch = ref(null);
let touchEndX = ref(null);
const showModal = ref(false);
const touchCurrentX = ref(null);
const changeModal = () => {
  showModal.value = !showModal.value;
};

/*const touchStart = (event) => {
  startTouch.value = event.touches[0].clientX;
};

const touchMove = (event) => {
  touchCurrentX.value = event.touches[0].clientX;
  let touchDiff = touchCurrentX.value - startTouch.value;
  const card = document.querySelector(".homeVinc");
  card.style.transform = `translateX(${touchDiff + 20}px)`;
};

const handleTouchEnd = (event) => {
  touchEndX.value = event.changedTouches[0].clientX;
  let touchDiff = touchEndX.value - startTouch.value;
  const card = document.querySelector(".homeVinc");

  if (touchDiff > 100) {
    card.classList.add("like");
  } else if (touchDiff < -100) {
    card.classList.add("dislike");
  }

  card.style.transform = "";
@touchstart="touchStart($event)" @touchmove="touchMove($event)" @touchend="handleTouchEnd($event)"
};*/
</script>
<template>
  <div class="homeVinc" v-if="!isLoading">
    <div class="homeVinc__Container">
      <div class="homeVinc__userInfo">
        <div class="homeVinc__userInfo-user">
          <div class="homeVinc__userInfo-profile">
            <i class="fa-solid fa-user"></i>
            <p class="homeVinc__userInfo-p">{{ userCard?.name }},{{ calculateAge(userCard?.birthday) }}</p>
            <div class="homeVinc__userInfo.status"></div>
          </div>
          <div class="homeVinc__userInfo-interesting">
            <i class="fa fa-commenting-o"></i>
            <p class="">Abierto a una relación</p>
          </div>
        </div>
      </div>
      <div class="carousel__item" @click="changeModal()">
        <img class="carousel__item-img" :src="userCard?.pictures[0]?.url" alt="imgUser" />
      </div>

      <!-- Carousel -->
      <Modal :showModal="true" @changeModal="changeModal()" v-if="showModal">
        <template v-slot:content>
          <Carousel v-bind="settings" :breakpoints="breakpoints" v-if="showModal">
            <Slide v-for="img of userCard.pictures" :key="img">
              <div class="carousel__item">
                <img class="carousel__item-img" :src="img?.url" alt="imgUser" />
              </div>
            </Slide>
          </Carousel>
        </template>
      </Modal>

      <!-- Carousel -->

      <!-- Reason for interest-->
      <div class="information__user-p">
        <p class="information__user-txt">{{ userCard?.name.split(" ")[0] }} esta aqui para...</p>
        <div class="information__state">
          <div class="flowRegister__interest">
            <i :class="hereFor[userCard?.hereFor]?.icon"></i>
            <span> {{ hereFor[userCard?.hereFor]?.text }}</span>
          </div>
        </div>
      </div>
      <!-- Reason for interest-->

      <!-- Description-->
      <div class="information__description">
        <p class="information__description-txt">
          <i class="information__description-i">Sobre mi:</i> <br />
          {{ userCard?.description }}
        </p>
      </div>
      <!-- Description-->

      <interestingIn :hereFor="userCard" />

      <p class="information__InfoUser-tittle">Información de "Nombre usuario":</p>
      <div class="information__InfoUser" v-if="preferencesUser">
        <p class="information__InfoUser-preferences" v-for="(item, index) in preferencesUser" :key="index">
          <i :class="item.icon"></i>
          {{ item.name }}
        </p>
      </div>
      <div class="information__album">
        <div class="information__album-container">
          <img class="information__album-img" :src="userCard.pictures[1]?.url" alt="" />
        </div>
      </div>

      <!-- Buttons actions-->
      <div v-if="props.hiddeActions != false" class="homeVinc__buttonsAction">
        <button class="homeVinc__buttonsAction-button" v-for="(item, index) of buttonsActions" :key="index" @click="$emit(item.action, userCard)">
          <i class="homeVinc__buttonsAction-icon" :class="item.icon"></i>
        </button>
      </div>
      <!-- Buttons actions-->

      <div class="homeVinc__security">
        <p class="homeVinc__security-txt">Bloquear</p>
        <p class="homeVinc__security-txt">Reportar</p>
      </div>
    </div>
  </div>
</template>
v-for="(item, index) of userCard?.pictures"
<style lang="scss">
* {
  font-family: sans-serif;
}

.homeVinc {
  width: 100%;
  height: 100vh;
  position: relative;
  overflow: hidden;

  &__Container {
    position: relative;
    overflow: hidden;
    text-align: center;
    border-radius: 20px 20px 0 0;
    border: solid 1px #00000014;
    &::-webkit-scrollbar-thumb {
      height: 80px;
    }

    scrollbar-width: thin;
    scrollbar-color: #bbbbbb transparent;

    &::-webkit-scrollbar {
      width: 6px;
    }

    &::-webkit-scrollbar-thumb {
      background-color: #bbbbbb;
      border-radius: 3px;
    }

    &::-webkit-scrollbar-track {
      background-color: transparent;
    }
  }

  &__buttonsAction {
    position: fixed;
    display: flex;
    justify-content: center;
    gap: 5px;
    z-index: 100;
    bottom: 70px;
    width: 100%;
    right: 0;
    left: 0;
    cursor: pointer;


    &-button {
      background-color: #f9f9f9;
      border: 1px solid $primary-color;
      color: $primary-color;
      height: 40px;
      width: 40px;
      border-radius: 50%;

      &:hover {
        transform: scale(1.2);
      }
    }
  }
  &__userInfo {
    display: flex;
    justify-content: space-around;
    align-items: center;
    text-align: center;
    position: absolute;
    top: 0;
    // z-index: 1;
    width: 100%;

    background: linear-gradient(to bottom, rgba(0, 0, 0, 0.724), rgba(0, 0, 0, 0));

    &-p {
      font-weight: 500;
      font-size: 13px;
    }
    &-status {
      background-color: rgb(0, 255, 0);
      width: 10px;
      height: 10px;
    }
    &-user {
      display: flex;
      flex-direction: column;
      gap: 5px;
      margin-top: 10px;
    }
    &-profile {
      display: flex;
      align-items: center;
      color: white;
      gap: 10px;
    }
    &-interesting {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 5px;
      border-radius: 30px;
      padding: 3px;
      background-color: white;
      font-size: 12px;
      height: 15px;
    }
  }

  &__containertittle {
    width: 100%;
    padding: 10px;

    &-p {
      font-weight: 700;
      margin: 0% 0px 10px 0px;
    }

    &-text {
      margin: 0%;
      font-size: 10px;
      font-weight: 800;
    }
  }

  &__information {
    height: 100%;
  }

  &__info-txt {
    font-size: 12px;
    font-weight: 700;
  }
}

.information {
  display: flex;
  justify-content: center;
  width: 93%;
  padding: 10px;

  &__user {
    width: 100%;
    height: 100vh;

    &-p {
      text-align: start;
      margin-top: 5px;
    }
    &-txt {
      font-size: 10px;
      font-weight: 700;
      margin-bottom: 5px;
      margin-left: 20px;
    }
  }
  &__description {
    width: 100%;
    border-radius: 10px;
    text-align: start;
    background-color: #ffffff3c;

    &-txt {
      font-size: 10px;
      font-weight: 500;
      padding: 5px;
      margin: 0%;
    }
    &-i {
      margin: 0%;
      text-align: start;
      font-size: 15px;
      color: $primary-color;
    }
  }
  &__InfoUser {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 5px;
    margin-left: 10px;

    &-preferences {
      display: flex;
      background-color: rgba(231, 223, 223, 0.2196078431);
      font-size: 13px;
      border-radius: 30px;
      padding: 4px;
      margin: 0%;
    }
    &-tittle {
      font-size: 10px;
      color: $primary-color;
    }
  }
  &__interest {
    display: flex;
  }

  &__album-container {
    gap: 5px;
    width: 100%;
  }
  &__album-img {
    max-width: 500px;
    width: 100%;
    border-radius: 30px;
  }
  &__state,
  &__album-container {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
}

.img-card {
  width: 100%;
}

.homeVinc__Container {
  height: 88vh;
  overflow-x: hidden;
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.carousel * {
  border-radius: 20px 20px 0 0;
  height: 100%;
  width: 100%;
}

.carousel {
  &__item {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;
    margin-top: -16px;

    &-img {
      display: flex;
      max-width: 97vw;
      height: 100%;
    }
  }
}

.like {
  transform: translateX(200px);
  background-color: #4caf50;
}

.dislike {
  transform: translateX(-200px);
  background-color: #ff1100;
  color: #ffffff;
  z-index: 100;
}
</style>

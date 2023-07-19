<script setup>
import { ref, onBeforeMount, computed } from "vue";
import { Carousel, Slide } from "vue3-carousel";
// import "vue3-carousel/dist/carousel.css";
import interestingIn from "../profile/interestingIn.vue";
import Modal from "../shared/modal.vue";
import { useRouter } from "vue-router";
import { calculateAge } from "../../utils/calculateAge";
import { interest } from "../../utils/sharedObjects";

const isLoading = ref(true);

const props = defineProps(["user", "hiddeActions"]);
const router = useRouter();

const preferencesValues = ref([]);

const dictionary = {
  drink: "Bebe",
  education: "Estudios",
  feelings: "Estado",
  height: "Altura",
  sexuality: "Horientación Sexual",
  smoke: "Fuma",
};

const preferencesKey = ref([]);
onBeforeMount(() => {
  userCard.value = props.user;
  if (userCard.value.preferences?.length) {
    delete userCard.value.preferences[0].createdAt;
    delete userCard.value.preferences[0].updatedAt;
    delete userCard.value.preferences[0]._id;
    delete userCard.value.preferences[0].idUser;
    delete userCard.value.preferences[0].__v;    
    preferencesValues.value = userCard.value.preferences[0];
    preferencesKey.value = Object.keys(userCard.value.preferences[0]);

    if (preferencesUser) {
    }
  }

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
  // console.log(props.user);
  return props.user;
});

const buttonsActions = [
  { text: "Ignorar", icon: "fa fa-times-circle", action: "dislike" },
  { text: "Mensaje", icon: "fa fa-paper-plane", action: "message" },
  { text: "Like", icon: "fa fa-heart-o", action: "like" },
];
const preferencesUser = [{ icon: "fa-solid fa-heart" }, { icon: "fa-solid fa-baby" }, { icon: "fa-solid fa-ruler" }, { icon: "fa-solid fa-paw" }, { icon: "fa-solid fa-language" }];
let startTouch = ref(null);
let touchEndX = ref(null);
const showModal = ref(false);
const touchCurrentX = ref(null);

const changeModal = () => {
  showModal.value = !showModal.value;
};

// const touchStart = (event) => {

//   startTouch.value = event.touches[0].clientX;
// };

// const touchMove = (event) => {
//   touchCurrentX.value = event.touches[0].clientX;
//   let touchDiff = touchCurrentX.value - startTouch.value;
//   const card = document.querySelector(".homeVinc");
//   card.style.transform = `translateX(${touchDiff + 20}px)`;
// };

// const handleTouchEnd = (event) => {
//   touchEndX.value = event.changedTouches[0].clientX;
//   let touchDiff = touchEndX.value - startTouch.value;
//   const card = document.querySelector(".homeVinc");

//   if (touchDiff > 100) {
//     card.classList.add("like");
//   } else if (touchDiff < -100) {
//     card.classList.add("dislike");
//   }

//   card.style.transform = "";
// // @touchstart="touchStart($event)" @touchmove="touchMove($event)" @touchend="handleTouchEnd($event)"
// };

function getIcon(index) {
  return preferencesUser[index].icon;
}
</script>

<template>
  <div class="homeVinc" v-if="!isLoading">
    <div class="homeVinc__Container">
      <!-- info USer  -->

      <div class="homeVinc__userInfo">
        <div class="homeVinc__userInfo-user">
          <div class="homeVinc__userInfo-profile">
            <i class="fa-solid fa-user"></i>
            <p class="homeVinc__userInfo-p">{{ userCard?.name }}, {{ calculateAge(userCard?.birthday) }}</p>

            <div class="homeVinc__userInfo.status"></div>
          </div>
          <div class="homeVinc__userInfo-interesting">
            <i class="fa fa-commenting-o"></i>
            <p class="">{{ hereFor[userCard?.hereFor]?.text }}</p>
          </div>
        </div>
      </div>

      <!-- view Img  -->

      <div class="carousel__item" @click="changeModal()">
        <img class="carousel__item-img" :src="userCard?.pictures[0]?.url" alt="imgUser" />
      </div>

      <!-- Carousel -->
      <!-- <Modal :showModal="true" @changeModal="changeModal()" v-if="showModal">
        <template v-slot:content>
            <Slide v-for="img of userCard.pictures" :key="img">
              <div class="carousel__item">
                <img class="carousel__item-img" :src="img?.url" alt="imgUser" />
              </div>
            </Slide>
        </template>
      </Modal>  -->

      <!-- Carousel -->

      <!-- Reason for interest-->
      <div class="information__user-p">
        <p class="information__user-txt">{{ userCard?.name.split(" ")[0] }} es lista para...</p>
        <div class="information__state">
          <div class="flowRegister__interest">
            <i :class="hereFor[userCard?.hereFor]?.icon"></i>
            <span> {{ hereFor[userCard?.hereFor]?.text }}</span>
          </div>
        </div>
      </div>
      <!-- Reason for interest-->

      <!-- Description-->
      <div v-if="userCard.description" class="information__description">
        <p class="information__description-txt">
          <i class="information__description-i">Sobre mi:</i> <br />
          {{ userCard?.description }}
        </p>
      </div>
      <!-- Description-->

      <!-- <interestingIn :hereFor="userCard" /> -->

      <!-- prefrences User  -->

      <p class="information__InfoUser-tittle">Información de {{ userCard.name }}:</p>
      <div class="information__InfoUser" v-if="preferencesValues">
        <p class="information__InfoUser-preferences" v-for="(item, index) in preferencesValues" :key="index">
          <i :class="getIcon[index]"></i>
          {{ dictionary[index] }}:{{ item }}
        </p>
      </div>

      <!-- First Photo  -->

      <div class="information__album">
        <img class="information__album-img" :src="userCard.pictures[1]?.url" alt="" />
      </div>

      <!-- Buttons actions-->
      <div v-if="props.hiddeActions != false" class="homeVinc__buttonsAction">
        <div class="homeVinc__buttonsAction-wrapper">
          <button class="homeVinc__buttonsAction-button" v-for="(item, index) of buttonsActions" :key="index" @click="$emit(item.action, userCard)">
            <i class="homeVinc__buttonsAction-icon" :class="item.icon"></i>
          </button>
        </div>
      </div>

      <!-- Buttons actions-->
      <div class="homeVinc__security">
        <button class="homeVinc__security-txt">Bloquear</button>
        <button class="homeVinc__security-txt">Reportar</button>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
* {
  font-family: sans-serif;
}

.homeVinc {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
  background-color: #fff;

  &__Container {
    width: 100%;
    height: 100%;
    position: relative;
    overflow: hidden;
    text-align: center;
    border-radius: 20px 20px 0 0;
    min-width: 230px;
    max-width: 500px;
    margin-top: 10px;
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
    background-color: transparent;
    // &-wrapper {
    // }
    &-button {
      background-color: #f9f9f9;
      border: 3px solid $primary-color;
      color: $primary-color;
      height: 45px;
      width: 45px;
      border-radius: 50%;

      &:hover {
        transform: scale(1.2);
      }
    }
  }
  &__userInfo {
    display: flex;
    justify-content: start;
    align-items: center;
    text-align: center;
    position: fixed;
    margin-left: 15px;
    // top: 50px;
    color: #000;

    &-p {
      font-weight: 700;
      font-size: 13px;
      color: #000;
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
      color: #000;
      gap: 10px;
      background-color: #eee8e8a3;
      box-shadow: 0px 0px 10px 5px #eee8e8a3;
      padding: 3px;
      border-radius: 5px;
    }
    &-interesting {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 5px;
      border-radius: 30px;
      padding: 3px;
      background-color: #eee8e8;
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

  &__security {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 5px;
    width: 100%;
    margin-bottom: 90px;
    &-txt {
      width: 100px;
      height: 30px;
      background-color: #000;
      color: #fff;
      border-radius: 10px;
      border: none;
      cursor: pointer;
    }
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
      background-color: rgb(231, 223, 223);
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

  &__album {
    width: 98%;
    margin: auto;
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
  width: 98%;
  height: 100%;
  margin: auto;
  overflow-x: hidden;
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.carousel {
  &__item {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;
    // margin-top: -16px;

    &-img {
      display: flex;
      width: 98%;
      // max-width: 97vw;
      height: 98%;
      border-radius: 20px;
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

@media (max-width: 600px) {
  .carousel__item-img {
    object-fit: cover;
  }
}
@media (min-width: 1024px) {

  .homeVinc__buttonsAction-wrapper {
    display: flex;
    gap: 5px;
    margin-left: 85px;
  }
}
</style>

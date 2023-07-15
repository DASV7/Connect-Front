<script setup>
import { onMounted, ref, onUnmounted } from "vue";
import { useRouter } from "vue-router";
import { useCounterStore } from "../../store/users";
const userStore = useCounterStore();

const router = useRouter();

const activeRote = ref();
onMounted(() => {});

// const routers = [
//   { path: "/functionsapp", icon: "fa-solid fa-video", name: "Random" },
//   { path: "/histories", icon: "fa fa-camera", name: "HIstorias" },
//   { path: "/home", icon: "fa fa-handshake-o", name: "Home" },
//   { path: "/messages", icon: "fa-solid fa-comment", name: "Mensajes" },
//   // { path: "/profile", icon: "fa-solid fa-user", name: "Perfil" },
// ];

const routers = [
  { path: "/functionsapp", icon: "fa-solid fa-video", name: "Random", color: "red" },
  { path: "/histories", icon: "fa fa-camera", name: "Historias", color: "blue" },
  { path: "/home", icon: "fa fa-handshake-o", name: "Home", color: "green" },
  { path: "/messages", icon: "fa-solid fa-comment", name: "Mensajes", color: "yellow" },
];
const goRouter = (index) => {
  activeRote.value = index;
};

// aJUSTE DE RESOLUCION
let userPicture = ref();
onMounted(() => {
  const actualRoute = router.currentRoute.value.path;
  goRouter(actualRoute);
  handleResize();
  window.addEventListener("resize", handleResize);
  userPicture.value = userStore.user.pictures[0];
});
const isGreaterThan1024 = ref(false);
const handleResize = () => {
  isGreaterThan1024.value = window.innerWidth >= 1024;
};
onUnmounted(() => {
  window.removeEventListener("resize", handleResize);
});

// avartar profile
</script>

<template>
  <nav class="menu">
    <div class="menu__container">
      <!-- Menu for 1024px >  -->
      <div v-if="isGreaterThan1024" class="menu__header">
        <img class="menu__header-logo" src="/public/svgLogoComplete.svg" alt="" />
      </div>
      <div v-if="isGreaterThan1024" class="menu__items">
        <div v-for="(router, index) in routers" :key="index" class="menu__items-btn">
          <button
            @click="$router.push(router.path), goRouter(router.path)"
            class="menu__container-btn"
            :class="router.path.includes(activeRote) ? 'menu__container-btn-active' : ''"
          >
            <i :class="router.icon"></i>
            <p class="menu__container-p">{{ router.name }}</p>
          </button>
        </div>
      </div>
      <div v-if="isGreaterThan1024" class="menu__container-bottom">
        <button class="menu__container-btn" @click="router.push('profile')">
          <img class="menu__container-imgProfile" :src="userPicture.url" alt="" />
          <p class="menu__container-p">Perfil</p>
        </button>
      </div>

      <!-- Menu for < 1024px  -->
      <div class="menu__items" v-if="!isGreaterThan1024">
        <div class="menu__items" v-for="(router, index) in routers" :key="index">
          <button @click="$router.push(router.path), goRouter(router.path)" class="menu__container-btn" :class="{ 'menu__container-btn-active': router.path.includes(activeRote) }">
            <i :class="router.icon"></i>
          </button>
        </div>
        <button class="menu__container-btn" @click="router.push('profile')">
          <i class="fa-solid fa-user"></i>
        </button>
      </div>
    </div>
  </nav>
</template>

<style lang="scss">
.menu {
  display: flex;
  justify-content: space-between;
  z-index: 1;
  width: 100%;
  position: fixed;
  margin-top: 15px;
  bottom: 0;
  border-top: 1px solid #0000003f;
}

.menu__items {
  width: 100%;
  display: flex;
}

.menu__container {
  display: flex;
  width: 100%;

  &-btn {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 50px;
    background-color: #f9f9f9;
    color: #000000b3;
    border: none;
    font-size: 20px;
    animation: fadeIn 1s ease-in-out;
    cursor: pointer;

    &-active {
      color: $primary-color;
      animation: fadeIn 1s ease-in-out;
    }
  }

  &-imgProfile {
    width: 20px;
    height: 20px;
    border-radius: 100px;
    border: solid 2px #000;
    object-fit: cover;
  }
}
@media (min-width: 1024px) {
  .menu {
    flex-direction: column;
    height: 100%;
    width: 100px;
    top: -15px;
    background-color: rgb(255, 255, 255);

    &__header {
      width: 100%;
      &-logo {
        width: 90%;
        height: 100%;
        margin-left: 10px;
        margin-top: 10px;
      }
    }
  }

  .menu__container {
    gap: 25px;
    flex-direction: column;
    width: 100%;
    height: 100%;

    &-bottom {
      width: 150px;
      height: 35px;
      position: relative;
      bottom: 0px;
      margin-bottom: 20px;
    }
  }
  .menu__items {
    display: flex;
    flex-direction: column;
    height: 100%;
    // outline: solid #000 1px;
    &-btn {
      width: 100%;
      height: 35px;
      margin-bottom: 20px;
    }
  }
  .menu__container-btn {
    justify-content: start;
    padding-left: 10px;
    cursor: pointer;
    // height: 100%;
    // border-right: 1px solid #c1bfbf6c;
    gap: 10px;
    background-color: transparent;
    font-size: 15px;

    .menu__container-p {
      font-size: 10px;
    }
  }
}
</style>

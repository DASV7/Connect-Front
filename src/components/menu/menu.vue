<script setup>
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();

const activeRote = ref();
onMounted(() => {});

const routers = [
  { path: "/messages", icon: "fa-solid fa-comment" },
  { path: "/functionsapp", icon: "fa fa-video-camera" },
  { path: "/home", icon: "fa fa-handshake-o" },
  { path: "/likes", icon: "fa fa-eye" },
  { path: "/profile", icon: "fa-solid fa-user" },
];

const goRouter = (index) => {
  activeRote.value = index;
};

onMounted(() => {
  const actualRoute = router.currentRoute.value.path;
  goRouter(actualRoute);
});
</script>

<template>
  <nav class="menu">
    <div class="menu__container">
      <div class="menu__items" v-for="(router, index) in routers" :key="index">
        <button @click="$router.push(router.path), goRouter(router.path)" class="menu__container-btn" :class="router.path.includes(activeRote) ? 'menu__container-btn-active' : ''">
          <i :class="router.icon"></i>
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
  border-top: 1px solid #5050503f;
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
    color: rgba(128, 128, 128, 0.384);
    border: none;
    font-size: 20px;
    animation: fadeIn 1s ease-in-out;
    &-active {
      color: $primary-color;
      animation: fadeIn 1s ease-in-out;
    }
  }
}
@media (min-width: 1024px) {
  .menu {
    flex-direction: column ;
    height: 100%;
    width: 50px;
    top: -15px;
  }
  .menu__container {
    position: absolute;
    flex-direction: column;
    width: 70px;
    height: 100%;
  }
  .menu__items {
    height: 100%;
  }
  .menu__container-btn {
    height: 100%;
    cursor: pointer;

  }
}
</style>

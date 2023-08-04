<script setup>
import { onMounted, ref } from "vue";
const searchPeople = ref(false);

onMounted(() => {});

let warning = [
  {
    tittle: "Recuerda:",
    text: "Estás hablando con personas reales.",
    icon: "fa fa-exclamation-circle fa-3x",
  },
  {
    icon: "fa fa-camera fa-3x",
    tittle: "Reporte:",
    text: "Si alguien comparte escenas sexuales, se tomará una captura de pantalla.",
  },
  {
    icon: "fa fa-check-circle fa-3x",
    tittle: "Evaluación:",
    text: "El contenido se evaluará para determinar si es obsceno.",
  },
  {
    icon: "fa-sharp fa-solid fa-circle-xmark",
    tittle: "Contenido explícito:",
    text: "No está permitido ningún tipo de contenido explícito.",
  },
  {
    icon: "fa fa-ban fa-3x",
    tittle: "Al reportar un usuario:",
    text: "Si se confirma que es contenido obsceno, se bloqueará al usuario.",
  },
];

const functions = ref([
  { text: "Chat", path: "/chat" },
  // { text: "Llamadas", path: "/call" },
  // { text: "Video Chat", path: "/videocall" },
]);
const indexIIcon = ["fa fa-phone-square", "fa fa-comments", "fa fa-video-camera"];

const routeTogo = ref("");
const clickGo = (path) => {
  routeTogo.value = path;
  console.log(routeTogo.value);
};
</script>

<template>
  <div class="videoCall__header">
    <img src="../../../public/svgLogoComplete.svg" alt="Vinc logo" />
  </div>
  <div class="videoCall">
    <div class="videoCall__functions" v-if="!routeTogo">
      <div class="videoCall__functions-item" v-for="(item, index) in functions" :key="index" @click="clickGo(item.path)">
        <i :class="indexIIcon[0]" aria-hidden="true"></i>
        <p class="videoCall__functions-text">{{ item.text }}</p>
      </div>
    </div>
    <!--alerts -->
    <div class="videoCall__alerts" v-else>
      <div class="videoCall__alertStart" style="color: white">
        <div v-for="(item, index) in warning" :key="index" class="videoCall__alertStart-message">
          <i :class="item.icon"></i>
          <div class="message-content">
            <p class="message-heading">{{ item.tittle }}</p>
            <p class="message-heading">{{ item.text }}</p>
          </div>
        </div>
        <button id="btn" class="videoCall__alertStart-continue" @click="$router.push({ path: routeTogo })">Empezar</button>
      </div>
    </div>
    <!--alerts -->

    <div class="videoCall__history" v-if="!routeTogo"></div>
  </div>
  <router-view></router-view>
</template>

<style lang="scss">
.videoCall {
  height: 100%;
  width: 100%;
  overflow: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  background-color: #000;

  &__video {
    display: flex;
    align-items: center;
    flex-direction: column;
  }

  &__containerVideo {
    display: grid;
    gap: 10px;
  }

  &__containerCalls {
    width: 100%;
    overflow: auto;
  }
  &__alerts {
    margin: auto;
    @include Column;
  }

  &__alertStart {
    display: flex;
    flex-direction: column;
    margin: 0 auto;
    gap: 10px;
    padding: 20px;
    color: #fff;

    p {
      font-size: 10px;
      font-weight: 700;
    }

    &-message {
      display: flex;
      align-items: center;
      margin-bottom: 10px;

      i {
        margin-right: 10px;
        color: #ff0000;
        font-size: 35px;
      }
    }

    &-messageContent {
      flex: 1;
    }

    &-message-heading {
      font-weight: bold;
      margin-bottom: 5px;
    }

    &-continue {
      width: 50%;
      height: 45px;
      border: none;
      background-color: #50bded;
      color: #fff;
      border-radius: 30px;
      font-weight: 700;
      margin: auto;
    }
  }

  &__history {
    width: 65%;
    background-color: #fff;
    border-radius: 10px;
    height: 50%;
  }

  &__functions {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    width: 100%;
    gap: 10px;

    &-item {
      display: flex;
      flex-direction: column;

      align-items: center;
      text-align: center;
      border-radius: 10px;
      background-color: aliceblue;
      border: 1px solid white;
      width: 150px;
      font-weight: bold;
      box-shadow: 0 0 10px $primary-color;
      transition: all 0.5s;
      cursor: pointer;

      i {
        font-size: 30px;
        color: $primary-color;
      }

      &:hover {
        background-color: $primary-color;
        color: white;

        i {
          color: white;
        }
      }
    }
  }

  &__logo {
    display: flex;
    justify-content: center;
    width: 100%;
    margin-top: 10px;
    margin-bottom: 10px;

    &-img {
      width: 100px;
      height: 26px;
      padding-top: 20px;
      margin-left: 20px;
    }
  }

  &__header {
    display: flex;
    justify-content: center;
    background-color: black;
    padding-top: 10px;
    width: 100%;

    img {
      height: 35px;
    }
  }
}
</style>

<script setup>
import { onMounted, ref } from "vue";
import { useSocketStore } from "../../store/socketStore";
import chatVideoCall from "../../components/chatVideoCall/chatVideoCall.vue";

const textStatus = ref("");
const video = ref(null);
const canvas = ref(null);
const context = ref(null);
const searchPeople = ref(false);

const socketStore = useSocketStore();
onMounted(() => {});

const startCalls = () => {
  canvas.value = document.querySelector("#preview");
  context.value = canvas.value.getContext("2d");
  // canvas.value.width = 250;
  // canvas.value.height = 250;
  context.value.width = canvas.value.width;
  context.value.height = canvas.value.height;
  video.value = document.querySelector("#video");
  searchPeople.value = true;
  loadCamerainfo();
};
const verVideo = () => {
  // Dibuja el video en el canvas
  context.value.drawImage(video.value, 0, 0, context.value.width, context.value.height);
  // Emite el stream a través del socket
  // socketStore.socket.emit("videoCall/streamVideoCall", canvas.value.toDataURL("image/webp"));
};

const loadCamera = function (stream) {
  video.value.srcObject = stream;
  textStatus.value = "Conecta";
  // Inicia la transmisión de video
  setInterval(verVideo, 10);
};

const loadCamerainfo = () => {
  navigator.getUserMedia = navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia || navigator.getUserMedia;
  if (navigator.getUserMedia) {
    navigator.getUserMedia(
      { video: true },
      (stream) => {
        loadCamera(stream);
      },
      errorCamara
    );
  }
};

const errorCamara = () => {
  textStatus.value = "Error EN la camara";
};

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
</script>

<template>
  <div class="videoCall">
    <!--alerts -->
    <div class="videoCall__alerts" v-if="!searchPeople">
      <div class="videoCall__header">
        <img src="../../../public/svgLogoComplete.svg" alt="Vinc logo" />
      </div>
      <div class="videoCall__alertStart">
        <div v-for="(item, index) in warning" :key="index" class="videoCall__alertStart-message">
          <i :class="item.icon"></i>
          <div class="message-content">
            <p class="message-heading">{{ item.tittle }}</p>
            <p class="message-heading">{{ item.text }}</p>
          </div>
        </div>
      </div>
      <button id="btn" class="videoCall__alertStart-continue" @click="startCalls()">Empezar</button>
    </div>
    <!--alerts -->

    <!--Video Chat-->
    <div class="videoCall__containerCalls" v-show="searchPeople">
      <div class="videoCall__video">
        <div class="videoCall__logo">
          <img class="videoCall__logo-img" src="../../../public/svgLogoComplete.svg" alt="" />
        </div>
        <div class="videoCall__container" v-show="searchPeople">
          <div class="videoCall__videoContainer">
            <div class="videoCall__containerVideo">
              <div class="videoCall__imgOne">
                <video class="videoCall__imgOne-stream" src="" id="video" autoplay="true"></video>
              </div>
              <div class="videoCall__imgTwo">
                <canvas class="videoCall__imgTwo-stream" id="preview"></canvas>
              </div>
            </div>
          </div>
          <chatVideoCall></chatVideoCall>
        </div>
      </div>
      <!--Video Chat-->

      <div class="videoCall__buttons">
        <button class="videoCall__buttons-btn1">Stop<i class="fa-sharp fa-solid fa-ban"></i></button>
        <button class="videoCall__buttons-btn2">Like<i class="fa-solid fa-heart"></i></button>
        <button class="videoCall__buttons-btn3">Next<i class="fa-solid fa-right-long"></i></button>
      </div>
      <!-- <div class="videoCall__chat" v-if="searchPeople">asdasd</div> -->
    </div>
  </div>
</template>

<style lang="scss">
.videoCall {
  height: 100%;
  width: 100%;
  display: flex;
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
    overflow: hidden;
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
    padding-top: 10px;
    img {
      height: 35px;
    }
  }

  &__buttons {
    display: flex;
    justify-content: center;
    margin-top: 10px;
    gap: 30px;

    &-btn1,
    &-btn2,
    &-btn3 {
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 30px;
      border: solid 2px #50bded;
      gap: 10px;
      width: 100px;
      height: 35px;
      background-color: #000;
      font-size: 15px;
      font-weight: 600;
      color: #fff;
    }
    &-btn1 {
      color: #ff0000;
    }
    &-btn2 {
      color: #50bded;
    }
    &-btn3 {
      color: #35e743;
    }
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
    }
  }
  &__imgOne,
  &__imgTwo {
    &-stream {
      height: 100%;
      width: 100%;
      border-radius: 10px;
    }
  }

  &__imgOne {
    width: 300px;
    height: 250px;
  }
  &__imgTwo {
    width: 300px;
    height: 200px;
  }

  @media screen and (min-width: 450px) {
    &__imgOne {
      overflow: hidden;
      // width: 356px;
      // height: 300px;
      width: 300px;
    height: 250px;
      max-height: 400px;
      max-width: 500px;

      &-stream {
        height: 100%;
        width: 100%;
      }
    }
    &__imgTwo {
      overflow: hidden;
      // width: 357px;
      // height: 300px;
      width: 300px;
    height: 200px;
      max-height: 400px;
      max-width: 500px;
      &-stream {
        height: 100%;
        width: 100%;
      }
    }
  }
}
</style>

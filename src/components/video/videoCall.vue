<script setup>
import { onMounted, ref } from "vue";
import { useSocketStore } from "../../store/socketStore";

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
  canvas.value.width = 300;
  canvas.value.height = 300;
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
    icon: "fa fa-exclamation-circle fa-3x" 
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
    icon: "fa-sharp fa-solid fa-circle-xmark" ,
    tittle: "Contenido explícito:", 
    text: "No está permitido ningún tipo de contenido explícito.", 
},
  { 
    icon: "fa fa-ban fa-3x" ,
    tittle: "Al reportar un usuario:", 
    text: "Si se confirma que es contenido obsceno, se bloqueará al usuario.", 
},
];
</script>

<template>
  <div class="videoCall">
    <div v-if="!searchPeople" class="videoCall__header">
      <img src="../../../public/svgLogoComplete.svg" alt="Vinc logo" />
    </div>
    <div v-if="!searchPeople" class="videoCall__alertStart" >
      <div  v-for="(item, index) in warning" :key="index" class="videoCall__alertStart-message">
        <i :class="item.icon"></i>
        <div class="message-content">
          <p class="message-heading">{{ item.tittle }}</p>
          <p class="message-heading">{{ item.text }}</p>
        </div>
      </div>

    </div>
    <button v-if="!searchPeople" id="btn" class="videoCall__alertStart-continue" @click="startCalls()">Empezar</button>
    <div class="videoCall__container" v-show="searchPeople">
      <div class="videoCall__imgOne">
        <video src="" id="video" style="width: 300px; height: 300px" autoplay="true"></video>
      </div>
      <div class="videoCall__imgTwo">
        <canvas id="preview"></canvas>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.videoCall {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 92vh;

  &__container {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 10px;
  }

  &__header {
    display: flex;
    padding-top: 10px;
    img {
      height: 35px;
    }
  }

  &__alertStart {
    display: flex;
    flex-direction: column;
    margin: 0 auto;
    gap: 10px ;
    padding: 20px;
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
    min-width: 320x;
    min-height: 300px;
    border-radius: 10px;
    border: 1px solid #000;
  }
}
</style>

<!-- <script setup>
import { onMounted, ref } from "vue";
import { useSocketStore } from "../../store/socketStore";

const textStatus = ref("");
const video = ref(null);
const canvas = ref(null);
const context = ref(null);

const socketStore = useSocketStore();
onMounted(() => {
  canvas.value = document.querySelector("#preview");
  context.value = canvas.value.getContext("2d");

  canvas.value.width = 300;
  canvas.value.height = 300;

  context.value.width = canvas.value.width;
  context.value.height = canvas.value.height;

  video.value = document.querySelector("#video");

  // Llama a verVideo() la primera vez para iniciar el streaming
  verVideo();
});

const verVideo = () => {
  // Dibuja el video en el canvas
  context.value.drawImage(video.value, 0, 0, context.value.width, context.value.height);
  // Emite el stream a través del socket
  socketStore.socket.emit("videoCall/streamVideoCall", canvas.value.toDataURL("image/webp"));
  // Pide al navegador que llame a verVideo() de nuevo en el siguiente fotograma
  window.requestAnimationFrame(verVideo);
};

const loadCamera = function (stream) {
  video.value.srcObject = stream;
  textStatus.value = "Conecta";
};

const loadCamerainfo = () => {
  navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
  if (navigator.getUserMedia) {
    navigator.getUserMedia({ video: true }, (stream) => {
      loadCamera(stream);
    }, errorCamara);
  }
};

const errorCamara = () => {
  textStatus.value = "Error EN la camara";
};
</script>

<template>
  <div class="videoCall">
    <div class="videoCall__container">
      <div class="videoCall__imgOne">
        <button id="btn" @click="loadCamerainfo">Emitir</button>
        <video src="" id="video" style="width: 260px; height: 250px" autoplay="true"></video>
        <div class="status">{{ textStatus }}</div>
      </div>
      <div class="videoCall__imgTwo">
        <canvas id="preview"></canvas>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.videoCall {
  display: flex;
  justify-content: center;
  align-items: center;

  &__container {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 10px;
  }

  &__imgOne {
    min-width: 300px;
    min-height: 300px;
    border-radius: 10px;
    border: 1px solid #000;
  }

  &__imgTwo {
    border-radius: 10px;
    border: 1px solid #000;
    width: 300px;
    height: 300px;
  }
}
</style> -->

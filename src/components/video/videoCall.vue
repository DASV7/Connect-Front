<script setup>
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
});

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
  navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
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

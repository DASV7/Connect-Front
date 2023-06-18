<script setup>
import { onMounted, ref } from "vue";
import { useSocketStore } from "../../store/socketStore";

const textStatus = ref("");
const video = ref(null);
const canvas = ref(null);
const context = ref(null);

const socketStore = useSocketStore();
onMounted(() => {
  // No es necesario esperar 500ms, ya que no estás haciendo ninguna animación
  canvas.value = document.querySelector("#preview");
  context.value = canvas.value.getContext("2d");

  canvas.value.width = 300;
  canvas.value.height = 300;

  context.value.width = canvas.value.width;
  context.value.height = canvas.value.height;

  video.value = document.querySelector("#video");
});

const verVideo = (context) => {
  context.drawImage(video.value, 0, 0, context.width, context.height);
  socketStore.socket.emit("videoCall/streamVideoCall", canvas.value.toDataURL("image/webp"));
};

const loadCamera = function (stream) {
  video.value.srcObject = stream;
  textStatus.value = "Conecta";
};

const loadCamerainfo = () => {
  navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
  if (navigator.getUserMedia) {
    navigator.getUserMedia(
      { video: true },
      (stream) => {
        loadCamera(stream);
        setInterval(() => {
          verVideo(context.value);
        }, 100);
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

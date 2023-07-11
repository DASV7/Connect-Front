<script setup>
import { onMounted, ref, onUnmounted, watchEffect } from "vue";
import { useSocketStore } from "../../store/socketStore";
import { socket, state } from "../../socket/socket";
import jwtDecode from "jwt-decode";
const textStatus = ref("");
const video = ref(null);
const canvas = ref(null);
const context = ref(null);

onMounted(() => {
  startCalls();
});

const mediaSource = new MediaSource();
video.src = URL.createObjectURL(mediaSource);

mediaSource.addEventListener("sourceopen", () => {
  const sourceBuffer = mediaSource.addSourceBuffer('video/webm; codecs="vp8"');
  sourceBuffer.addEventListener("updateend", () => {
    mediaSource.endOfStream();
    video.play();
  });
  sourceBuffer.appendBuffer(arrayBuffer);
});
watchEffect(() => {
  if (state.connected) {
    socket.off("videoCall/random");
    socket.on("videoCall/random", function (data) {
      // console.log("¡Ya funcionó esta sapa!", data);
      // const videoReceivedElement = document.getElementById("video2");
      // videoReceivedElement.setAttribute("crossorigin", "anonymous");
      // if (data) {
      //   const blob = new Blob([data], { type: "video/mp4" }); // Asegúrate de utilizar el tipo de archivo de video correcto
      //   const url = URL.createObjectURL(blob);
      //   videoReceivedElement.src = url;
      //   videoReceivedElement
      //     .play()
      //     .then(() => {})
      //     .catch((e) => {
      //       console.log(e);
      //     });
      // } else {
      //   // Fin del video
      //   videoReceivedElement.src = ""; // Detener el video
      // }
    });
  }
});

onUnmounted(() => {
  socket.off("videoCall/random");
});

const startCalls = () => {
  canvas.value = document.querySelector("#preview");
  context.value = canvas.value.getContext("2d");
  // canvas.value.width = 250;
  // canvas.value.height = 250;
  context.value.width = canvas.value.width;
  context.value.height = canvas.value.height;
  video.value = document.querySelector("#video");
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

const videoTracks = ref(null);

const loadCamerainfo = () => {
  navigator.getUserMedia = navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia || navigator.getUserMedia;
  if (navigator.getUserMedia) {
    navigator.getUserMedia(
      { video: true, audio: true },
      (stream) => {
        videoTracks.value = stream;
        console.log("esa");
        loadCamera(stream);
        const mediaRecorder = new MediaRecorder(stream);
        mediaRecorder.ondataavailable = function (e) {
          console.log();
          if (e.data.size > 0) {
            if (state.connected) {
              socket.emit("videoCall/random", { token: jwtDecode(localStorage.getItem("vinc-jwt")), video: e.data });
            }
          }
        };
        mediaRecorder.start(2000); // Enviar datos cada 1 segundo
        window.onbeforeunload = function () {
          mediaRecorder.stop();
          socket.emit("video", null); // Envía un dato nulo para indicar el fin del video
        };
      },
      errorCamara
    );
  }
};

function desactivarCamara() {
  if (videoTracks.value) {
    const video = videoTracks.value.getVideoTracks();
    video.forEach(function (track) {
      track.stop();
    });
  }
}

onUnmounted(() => {
  desactivarCamara();
});

const errorCamara = () => {
  console.log("Error");
  textStatus.value = "Error EN la camara";
};
</script>

<template>
  <div class="videoCall">
    <!--Video Chat-->
    <div class="videoCall__containerCalls" scrollDefault>
      <div class="videoCall__video">
        <div class="videoCall__logo">
          <img class="videoCall__logo-img" src="../../../public/svgLogoComplete.svg" alt="" />
        </div>
        <div class="videoCall__container">
          <div class="videoCall__videoContainer">
            <div class="videoCall__containerVideo">
              <div class="videoCall__imgOne">
                <video class="videoCall__imgOne-stream" style="display: none" src="" id="video" autoplay="true"></video>
                <video class="videoCall__imgOne-stream" src="" id="video2" autoplay="true"></video>
              </div>
              <div class="videoCall__imgTwo">
                <canvas class="videoCall__imgTwo-stream" id="preview"></canvas>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!--Video Chat-->

      <div class="videoCall__buttons">
        <button class="videoCall__buttons-btn1">Stop<i class="fa-sharp fa-solid fa-ban"></i></button>
        <button class="videoCall__buttons-btn2">Like<i class="fa-solid fa-heart"></i></button>
        <button class="videoCall__buttons-btn3">Next<i class="fa-solid fa-right-long"></i></button>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.videoCall {
  height: 100%;
  width: 100%;
  overflow: auto;
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
    overflow: auto;
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

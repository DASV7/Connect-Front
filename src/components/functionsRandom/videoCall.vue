<script setup>
import { onMounted, ref, onUnmounted, watchEffect } from "vue";
import { useSocketStore } from "../../store/socketStore";
import { socket, state } from "../../socket/socket";
import jwtDecode from "jwt-decode";
const textStatus = ref("");
const video = ref(null);
const canvas = ref(null);
const context = ref(null);

const localVideo = ref();
const remoteVideo = ref();
let localStream = ref(null);
let remoteStream = ref(null);
let peerConnection = ref();
const stream = ref();
onMounted(() => {
  getMediaStream();
  startSignaling();
  startPeerConnection();
});

async function getMediaStream() {
  try {
    stream.value = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
    localStream.value = stream;
    localVideo.value.srcObject = stream;
  } catch (error) {
    console.error("Error accessing media devices:", error);
  }
}
function startSignaling() {
  // Manejar el evento 'offer' cuando se recibe una oferta de conexión del servidor
  socket.on("offer", (offer) => {
    handleOffer(offer);
  });

  // Manejar el evento 'answer' cuando se recibe una respuesta de conexión del servidor
  socket.on("answer", (answer) => {
    handleAnswer(answer);
  });

  // Manejar el evento 'iceCandidate' cuando se recibe un candidato ICE del servidor
  socket.on("iceCandidate", (candidate) => {
    handleIceCandidate(candidate);
  });
}
async function sendOffer(offer) {
  socket.emit("offer", offer);
}

// Función para enviar una respuesta de conexión al servidor de señalización
async function sendAnswer(answer) {
  socket.emit("answer", answer);
}

// Función para enviar un candidato ICE al servidor de señalización
async function sendIceCandidate(candidate) {
  socket.emit("iceCandidate", candidate);
}

async function handleOffer(offer) {
  await peerConnection.setRemoteDescription(offer);

  const answer = await peerConnection.createAnswer();
  await peerConnection.setLocalDescription(answer);

  sendAnswer(answer);
}

// Función para manejar una respuesta de conexión recibida
async function handleAnswer(answer) {
  await peerConnection.setRemoteDescription(answer);
}

// Función para manejar un candidato ICE recibido
async function handleIceCandidate(candidate) {
  await peerConnection.addIceCandidate(candidate);
}

// Función para iniciar una conexión peer-to-peer
async function startPeerConnection() {
  try {
    peerConnection = new RTCPeerConnection();

    // Agregar las pistas de la cámara y el micrófono al objeto RTCPeerConnection
    localStream.value?.getTracks().forEach((track) => {
      peerConnection.addTrack(track, localStream.value);
    });

    // Establecer una función para manejar la llegada de la corriente remota
    peerConnection.ontrack = (event) => {
      remoteStream.value = event.streams[0];
      remoteVideo.value.srcObject = remoteStream.value;
    };

    // Establecer una función para manejar los candidatos ICE salientes
    peerConnection.onicecandidate = (event) => {
      if (event.candidate) {
        sendIceCandidate(event.candidate);
      }
    };

    // Crear y enviar una oferta de conexión
    const offer = await peerConnection.createOffer();
    await peerConnection.setLocalDescription(offer);
    sendOffer(offer);
  } catch (error) {
    console.error("Error starting peer connection:", error);
  }
}

// Llamar a las funciones de inicio

// onUnmounted(() => {
//   socket.off("videoCall/random");
// });

function desactivarCamara() {
  if (videoTracks.value) {
    const video = stream.value.getVideoTracks();
    video.forEach(function (track) {
      track.stop();
    });
  }
}

onUnmounted(() => {
  desactivarCamara();
});
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
                <video ref="localVideo"  id="localVideo" autoplay muted></video>
                <video ref="remoteVideo" id="remoteVideo" autoplay></video>
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

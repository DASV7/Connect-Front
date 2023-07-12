<script setup>
import { onMounted, ref, onUnmounted, watchEffect } from "vue";
import { useSocketStore } from "../../store/socketStore";
import { socket, state } from "../../socket/socket";
import jwtDecode from "jwt-decode";
const textStatus = ref("");
const video = ref(null);
const canvas = ref(null);
const context = ref(null);

const localVideoContainer = ref(null);
const remoteVideoContainer = ref(null);
onMounted(() => {
  startVideoChat();
});
let localStream;
let mediaUser = ref(null);
function startVideoChat() {
  const room = "room1"; // Nombre de la sala

  socket.emit("videoCall/join", room);

  const constraints = { video: true, audio: true };

  mediaUser.value = navigator.mediaDevices
    .getUserMedia(constraints)
    .then((stream) => {
      localStream = stream;

      const localVideoElement = document.createElement("video");
      localVideoElement.srcObject = localStream;
      localVideoElement.muted = true;
      localVideoElement.play();

      localVideoContainer.value.appendChild(localVideoElement);

      const pc = new RTCPeerConnection();

      pc.addStream(localStream);

      pc.onicecandidate = (event) => {
        if (event.candidate) {
          socket.emit("videoCall/iceCandidate", { room: room, candidate: event.candidate });
        }
      };

      socket.on("videoCall/iceCandidate", (candidate) => {
        pc.addIceCandidate(new RTCIceCandidate(candidate));
      });

      pc.createOffer()
        .then((offer) => {
          return pc.setLocalDescription(offer);
        })
        .then(() => {
          socket.emit("videoCall/offer", { room: room, offer: pc.localDescription });
        });

      socket.on("videoCall/offer", (offer) => {
        pc.setRemoteDescription(new RTCSessionDescription(offer));

        pc.createAnswer()
          .then((answer) => {
            return pc.setLocalDescription(answer);
          })
          .then(() => {
            socket.emit("videoCall/answer", { room: room, answer: pc.localDescription });
          });
      });

      socket.on("videoCall/answer", (answer) => {
        pc.setRemoteDescription(new RTCSessionDescription(answer));
      });

      pc.onaddstream = (event) => {
        const remoteVideoElement = document.createElement("video");
        remoteVideoElement.srcObject = event.stream;
        remoteVideoElement.play();

        remoteVideoContainer.value.appendChild(remoteVideoElement);
      };
    })
    .catch((error) => {
      console.error("Error al obtener el acceso a la cámara y al micrófono:", error);
    });
}

function desactivarCamara() {
  if (mediaUser.value) {
    const video = mediaUser.value.getVideoTracks();
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
      <div class="videoCall__videos">
        <div class="videoCall__logo">
          <img class="videoCall__logo-img" src="../../../public/svgLogoComplete.svg" alt="" />
        </div>
        <div class="videoCall__container">
          <div class="videoCall__videoContainer">
            <div class="videoCall__containerVideo">
              <div class="videoCall__video" ref="remoteVideoContainer"></div>
              <div class="videoCall__video" ref="localVideoContainer"></div>
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

  &__videos {
    display: flex;
    align-items: center;
    flex-direction: column;
  }

  &__containerVideo {
    display: flex;
    gap: 10px;
  }
  &__containerCalls {
    width: 100%;
    height: 100%;
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

  &__video {
    width: 300px;
    height: 250px;
  }

  @media screen and (min-width: 450px) {
    &__containerVideo {
    }
    &__video {
      overflow: hidden;
      // width: 357px;
      // height: 300px;
      width: 300px;
      height: 200px;
      max-height: 400px;
      max-width: 500px;
      video {
        height: 100%;
        width: 100%;
      }
    }
  }
}
</style>

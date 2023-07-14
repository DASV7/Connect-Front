<script setup>
import { onMounted, ref, onUnmounted } from "vue";
import { socket, state } from "../../socket/socket";

const chatInputBox = ref();
const all_messages = ref();
const main__chat__window = ref();
const videoGrid = ref();
const myVideo = ref();
let localStream = ref();
let pc = ref();
let myVideoStream = ref();
const peer = ref();

var getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

onMounted(() => {
  chatInputBox.value = document.getElementById("chat_message");
  all_messages.value = document.getElementById("all_messages");
  main__chat__window.value = document.getElementById("main__chat__window");
  videoGrid.value = document.getElementById("video-grid");
  myVideo.value = document.createElement("video");

  myVideo.value.muted = true;

  peer.value = new Peer(undefined, {
    path: "/peerjs",
    host: import.meta.env.VITE_PEER,
    port: "5500",
  });

  navigator.mediaDevices
    .getUserMedia({
      video: true,
      audio: true,
    })
    .then((stream) => {
      myVideoStream.value = stream;
      addVideoStream(myVideo.value, stream);

      peer.value.on("call", (call) => {
        call.answer(stream);
        const video = document.createElement("video");

        call.on("stream", (userVideoStream) => {
          addVideoStream(video, userVideoStream);
        });
      });

      socket.on("user-connected", (userId) => {
        connectToNewUser(userId, stream);
      });

      document.addEventListener("keydown", (e) => {
        if (e.which === 13 && chatInputBox.value.value != "") {
          socket.emit("message", chatInputBox.value.value);
          chatInputBox.value.value = "";
        }
      });

      socket.on("createMessage", (msg) => {
        console.log(msg);
        let li = document.createElement("li");
        li.innerHTML = msg;
        all_messages.value.append(li);
        main__chat__window.value.scrollTop = main__chat__window.value.scrollHeight;
      });
    });

    peer.value.on("call", function (call) {
    getUserMedia(
      { video: true, audio: true },
      function (stream) {
        call.answer(stream); // Answer the call with an A/V stream.
        const video = document.createElement("video");
        call.on("stream", function (remoteStream) {
          addVideoStream(video, remoteStream);
        });
      },
      function (err) {
        console.log("Failed to get local stream", err);
      }
    );
  });

  peer.value.on("open", (id) => {
    socket.emit("join-room", "abc123", id);
  });
});

// CHAT

const connectToNewUser = (userId, streams) => {
  var call = peer.value.call(userId, streams);
  console.log(call);
  var video = document.createElement("video");
  call.on("stream", (userVideoStream) => {
    console.log(userVideoStream);
    addVideoStream(video, userVideoStream);
  });
};

const addVideoStream = (videoEl, stream) => {
  videoEl.srcObject = stream;
  videoEl.addEventListener("loadedmetadata", () => {
    videoEl.play();
  });

  videoGrid.value.append(videoEl);
  let totalUsers = document.getElementsByTagName("video").length;
  if (totalUsers > 1) {
    for (let index = 0; index < totalUsers; index++) {
      document.getElementsByTagName("video")[index].style.width = 100 / totalUsers + "%";
    }
  }
};

const playStop = () => {
  let enabled = myVideoStream.value.getVideoTracks()[0].enabled;
  if (enabled) {
    myVideoStream.value.getVideoTracks()[0].enabled = false;
    setPlayVideo();
  } else {
    setStopVideo();
    myVideoStream.value.getVideoTracks()[0].enabled = true;
  }
};

const muteUnmute = () => {
  const enabled = myVideoStream.value.getAudioTracks()[0].enabled;
  if (enabled) {
    myVideoStream.value.getAudioTracks()[0].enabled = false;
    setUnmuteButton();
  } else {
    setMuteButton();
    myVideoStream.value.getAudioTracks()[0].enabled = true;
  }
};

const setPlayVideo = () => {
  const html = `<i class="unmute fa fa-pause-circle"></i>
  <span class="unmute">Resume Video</span>`;
  document.getElementById("playPauseVideo").innerHTML = html;
};

const setStopVideo = () => {
  const html = `<i class=" fa fa-video-camera"></i>
  <span class="">Pause Video</span>`;
  document.getElementById("playPauseVideo").innerHTML = html;
};

const setUnmuteButton = () => {
  const html = `<i class="unmute fa fa-microphone-slash"></i>
  <span class="unmute">Unmute</span>`;
  document.getElementById("muteButton").innerHTML = html;
};
const setMuteButton = () => {
  const html = `<i class="fa fa-microphone"></i>
  <span>Mute</span>`;
  document.getElementById("muteButton").innerHTML = html;
};

function desactivarCamara() {
  if (localStream.value && localStream.value.getTracks().length > 0) {
    localStream.value.getTracks().forEach((track) => {
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
    <!-- header -->
    <div class="videoCall__containerCalls" scrollDefault>
      <div class="videoCall__videos">
        <div class="videoCall__logo">
          <img class="videoCall__logo-img" src="../../../public/svgLogoComplete.svg" alt="" />
        </div>
      </div>

      <!-- Live  -->
      <div class="main">
        <div class="main__left">
          <div class="main__videos">
            <div id="video-grid"></div>
          </div>
          <div class="main__controls">
            <div class="main__controls_block">
              <div class="main__controls_button" id="muteButton" @click="muteUnmute()">
                <i class="fa fa-microphone"></i>
                <span>Mute</span>
              </div>
              <div class="main__controls_button" id="playPauseVideo" @click="playStop()">
                <i class="fa fa-video-camera"></i>
                <span>Pause Video</span>
              </div>
            </div>

            <div class="main__controls_block">
              <div class="main__controls_button">
                <i class="fa fa-shield"></i>
                <span>Security</span>
              </div>
              <div class="main__controls_button">
                <i class="fa fa-users"></i>
                <span>Participants</span>
              </div>
              <div class="main__controls_button">
                <i class="fa fa-comment"></i>
                <span>Chat</span>
              </div>
            </div>

            <div class="main__controls_block">
              <div class="main__controls_button leaveMeeting" id="leave-meeting">
                <i class="fa fa-times"></i>
                <span class="">Leave Meeting</span>
              </div>
            </div>
          </div>
        </div>
        <div class="main__right">
          <div class="main__header">
            <h6>Chat</h6>
          </div>
          <div class="main__chat__window" id="main__chat__window">
            <ul class="messages" id="all_messages"></ul>
          </div>
          <div class="main__message_container">
            <input type="text" id="chat_message" placeholder="Type message here.." />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Roboto&display=swap");
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
html,
body {
  height: 100%;
  font-family: "Roboto", sans-serif;
}
#video-grid {
  display: flex;
  justify-content: center;
  height: 100%;
  width: 100%;
  align-items: center;
  flex-wrap: wrap;
  overflow-y: auto;
}
video {
  display: block;
  flex: 1;
  object-fit: cover;
  border: 5px solid #000;
  max-width: 600px;
}
.main {
  height: 100%;
  display: flex;
}
.main__left {
  flex: 0.8;
  display: flex;
  flex-direction: column;
}
.main__right {
  flex: 0.2;
  display: flex;
  flex-direction: column;
  background-color: #242324;
  border-left: 1px solid #3d3d42;
}
.main__videos {
  flex-grow: 1;
  background-color: #000;
  display: flex;
  align-items: center;
  justify-content: center;
}
.main__controls {
  display: flex;
  background-color: #1c1e20;
  color: #d2d2d2;
  padding: 5px;
  justify-content: space-between;
}
.main__controls_block {
  display: flex;
}
.main__controls_button {
  display: flex;
  flex-direction: column;
  cursor: pointer;
  padding: 10px;
  justify-content: center;
  align-items: center;
  min-width: 80px;
  transition: all 0.3s ease-in-out;
  border-radius: 10px;
  margin: 5px;
}
.main__controls_button span {
  margin-top: 10px;
  display: block;
}
.main__controls_button:hover {
  background-color: #34383b;
}
.main__controls_button i {
  font-size: 25px;
}
.leaveMeeting {
  background-color: red;
  color: #fff;
}
.main__header {
  color: #f5f5f5;
  text-align: center;
  padding: 20px;
  border-bottom: 2px solid #3d3d42;
}
.main__chat__window {
  flex-grow: 1;
  overflow: auto;
  padding: 20px 20px 0 20px;
}
.main__message_container {
  padding: 22px 11px;
  display: flex;
}
.main__message_container input {
  flex-grow: 1;
  background-color: transparent;
  border: none;
  color: #f5f5f5;
  user-select: none;
  outline: none;
}

#all_messages li {
  color: #fff;
  list-style: none;
  border-bottom: 1px solid #3d3d42;
  padding: 10px 0;
}
.unmute {
  color: red;
}
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
    justify-content: center;
    gap: 10px;
    width: 98%;
    // height: 61%;
    margin: auto;
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
      // padding-top: 20px;
      // margin-left: 20px;
      padding: 0%;
      margin: 0%;
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

  @media screen and (min-width: 1024px) {
    &__containerVideo {
      // flex-direction: column;
      height: 84%;
    }
    &__video {
      width: 100%;
      height: 100%;

      video {
        width: 100%;
        height: 100%;
      }
    }
  }

  @media screen and (max-width: 1024px) {
    .videoCall {
      &__containerVideo {
        flex-direction: column;
        height: 83%;
        margin: auto;
      }
      .videoCall__video {
        width: 35%;
        border: solid 1px #fff;
      }
      .videoCall__buttons {
        margin-top: 0px;
      }
      &__video {
        // overflow: hidden;
        width: 35%;
        height: 100%;
        min-width: 300px;
        margin: auto;
        // border: solid 1px #fff;
        video {
          width: 100%;
          height: 100%;
          min-width: 340px;
          min-height: 270px;
        }
      }
    }
  }
}
</style>

<script setup>

import { onMounted, onBeforeUnmount, ref, getCurrentInstance, computed, reactive } from "vue";
import axios from "../../api/axios";
import { useRoute, useRouter } from "vue-router";
import Swal from "sweetalert2";
import { useCounterStore } from "../../store/users";
import messageCard from "./messageCard.vue";
import AvatarUser from "../shared/avatarUser.vue";
import ModalMessages from "../messages/messasgesModal.vue";
import { calculateAge } from "../../utils/calculateAge";
import { state, socket } from "../../socket/socket";

import avatarUser from "../shared/avatarUser.vue";
import { useSocketStore } from "../../store/socketStore";
import connect from "../../components/connect/connect.vue";

const message = ref("");
let messagesUser = reactive([]);
const route = useRoute();
const router = useRouter();
const userSesion = useCounterStore();
const members = ref([]);

const isLoading = ref(true);
const bindRef = ref(true);
const userChat = ref({});

onMounted(async () => {
  const user = await axios.get("/messages?id=" + route.params.id).catch((error) => {
    Swal.fire({ icon: "error", title: "Ocurrio un error", text: "Error al solicitar los mensajes", showConfirmButton: false, timer: 2000 });
  });
  const response = user.data.data;
  if (!response) return;
  members.value = response.members;
  userChat.value = members.value.find((e) => e._id != userSesion.user?._id);
  messagesUser.splice(messagesUser.length, 0, ...response.messages);
  setTimeout(() => goToBottom(), 100);
  isLoading.value = false;
  if (state.connected) {
    socket.on("messages/newMessage/", async (message) => {
      messagesUser.push(message);
    });
  }
});

const deleteMatch = async (message) => {
  const undoMatch = await axios.get("/messages/undomatch?id=" + route.params.id).catch((error) => {
    Swal.fire({
      icon: "error",
      title: "Ocurrio un error",
      text: "Error al solicitar los mensajes",
      showConfirmButton: false,
      timer: 2000,
    });
  });
  if (undoMatch.data.data) router.push(`/messages`);
};
const filterMembers = (message) => {
  const filter = members.value.find((member) => member._id == message.sender);
  return filter;
};

const itsMe = (message) => {
  return message.sender == userSesion.user?._id;
};

const goToBottom = () => {
  const element = document.getElementById("elemento-final");
  if (element) element.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });
};

const newMessage = async () => {
  if (!message.value.trim()) return;
  const user = await axios.post("/messages", { message: message.value, conversationId: route.params.id }).catch((error) => {
    Swal.fire({
      icon: "error",
      title: "Ocurrio un error",
      text: "Error al enviar el mensaje",
      showConfirmButton: false,
      timer: 2000,
    });
  });

  message.value = "";
  messagesUser.splice(messagesUser.length, 0, user.data.data);
  setTimeout(() => goToBottom(), 150);
};

onBeforeUnmount(() => {
  socket.off("messages/newMessage");
});

let hiddenProfile = ref(false);
function changeModal() {
  hiddenProfile.value = !hiddenProfile.value;
}
let btnOptions = ref(false);
function openOptios(params) {
  btnOptions.value = params;
}
function closeOptions() {
  btnOptions.value = false;
}
</script>

<template>
  <div @click="closeOptions" v-if="btnOptions" class="intoMessages__header-fullscreen">
  </div>
  
  <div class="intoMessages__allPage">
    <div class="intoMessages" v-if="!isLoading && userChat?.name">
      
      <div v-if="hiddenProfile"  class="intoMessages__Modal">
        <ModalMessages  :user="userChat" :showModal="hiddenProfile" @changeModal="changeModal()" ></ModalMessages>
      </div>
      
      <!-- into messages  -->
      <div class="intoMessages__header">
        <button @click="$router.push('/messages')" class="intoMessages__header-btnBack">
          <i class="fa-sharp fa-solid fa-arrow-left"> </i>
        </button>
        <div class="intoMessages__header-info">
          <AvatarUser @openProfile="changeModal()" :user="userChat" :size="40"></AvatarUser>
          <p @openProfile="changeModal()" class="intoMessages__header-name">{{ userChat.name }}, {{ calculateAge(userChat.birthday) }}</p>
        </div>
        <!-- MODAL  -->

        <!-- BUttons Options  -->
        <button @click="openOptios(true)" class="intoMessages__header-btnBack">
          <i class="fa-sharp fa-solid fa-ellipsis-vertical"></i>
          <div v-if="btnOptions" class="intoMessages__header-options">
            <button class="header__options-undoMatch" @click="deleteMatch()">
              <i class="fa-solid fa-user-minus"></i>
              Eliminar Match
            </button>
            <button class="header__options-block">
              <i class="fa-solid fa-ban"></i>
              Bloquear Usuario
            </button>
            <button class="header__options-report">
              <i class="fa-regular fa-flag"></i>
              Reportar
            </button>
          </div>
        </button>

      </div>
      
      <!-- messages card  -->
      <div class="intoMessages__messages" scrollDefault>
        <div :id="index" class="intoMessages__messageItem" v-for="(message, index) in messagesUser" :key="message._id">
          <messageCard @openProfile="changeModal()" :message="message" :user="filterMembers(message)" :idx="itsMe(message)"></messageCard>
        </div>
        <div id="elemento-final"></div>
      </div>

        <!-- All messages  -->
      <div class="intoMessages__all">
        <!-- <div class="intoMessages__container"> -->
        <button class="intoMessages__container-send">
          <i class="fa-solid fa-gift"></i>
        </button>
        <input class="intoMessages__container-input" type="text" placeholder="Nuevo Mensaje " @keypress.enter="newMessage()" v-model="message" />
        <button class="intoMessages__container-send" @click="newMessage">
          <i class="fa fa-paper-plane" aria-hidden="true"></i>
        </button>
        <!-- </div>s -->
      </div>

    </div>
  </div>
</template>

<style lang="scss">
// body {
// background-color: #f0e9e99d;
// }

.intoMessages {
  width: 100%;
  height: 100%;
  box-shadow: 0px 5px 15px #9f9999;
  overflow: hidden;
  position: relative;
  
  &__Modal {
    width: 100%;
    height: 100%;
    position: absolute;
    display: flex;
    justify-content: center;
    overflow-y: auto;
    background-color: #0000006a;
    z-index: 100;
  }
  &__allPage {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: 100%;
  }
  &__header {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 50px;
    // position: fixed;
    border-bottom: #000 solid 1px;
    background-color: #fff;
    z-index: 10;
    border-radius: 20px 20px 0px 0px;

    &-btnBack {
      width: 50px;
      height: 35px;
      border: solid 1px #000;
      background: $primary-color;
      color: #fff;
      border: none;
      border-radius: 20px;
      margin-left: 4px;
      cursor: pointer;
    }
    &-info {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 10px;
      width: 80%;
      height: 100%;
      // border: solid 1px red;
    }
    &-name {
      font-size: 13px;
      font-weight: 600;
    }

    &-settings {
      width: 50px;
      height: 100%;
    }
    &-options {
      display: flex;
      flex-direction: column;
      justify-content: space-evenly;
      position: absolute;
      width: 127px;
      height: 100px;
      right: 42px;
      top: 32px;
      background-color: #ffffff;
      border: 1px solid #a09f9f6b;
      padding: 5px;
      border-radius: 10px;
      gap: 5px;
      z-index: 12;
    }
    &-fullscreen {
      position: absolute;
      width: 93vw;
      height: 100vh;
      z-index: 5;
    }
  }
  .header__options-undoMatch,
  .header__options-block,
  .header__options-report {
    width: 100%;
    height: 33px;
    cursor: pointer;
    border: none;
    border-radius: 5px;
    background-color: #dad8d85f;
    // border-bottom: solid 1px #000;
  }
  .header__options-undoMatch {
    color: #e61414;
  }
  .header__options-report {
    color: #0725d4;
  }
  &__messages {
    height: 83%;
    max-height: 83%;
    overflow-y: auto;
    overflow-x: hidden;
    // margin-bottom: 100px;
  }
  &__all {
    display: flex;
    justify-content: center;
    gap: 20px;
    z-index: 1;
    margin-bottom: 10px;
  }
  &__container {
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    width: 100%;
    bottom: 56px;
    gap: 10px;

    &-input {
      background-color: #96a0a77a;
      color: #000000;
      border: none;
      border-radius: 15px;
      width: 55%;
      height: 35px;
      font-size: 10px;
      cursor: text;
      transition: all 0.3s ease;
      text-align: start;
      padding-left: 15px;
      // max-width: 450px;
    }

    &-input:hover {
      // background-color: #0d8bff;
      outline: none;
    }

    &-send {
      align-items: center;
      background-color: $primary-color;
      color: #fff;
      border: none;
      border-radius: 20px;
      height: 35px;
      width: 50px;
      font-size: 13px;
      font-weight: bold;
      cursor: pointer;
      transition: all 0.3s ease;
    }

    &-send:hover {
      background-color: $primary-color;
    }
  }
}
@media screen and (min-width: 1000px) {
  .intoMessages {
    width: 60%;
    height: 95%;
    background-color: #fff;
    border-radius: 20px;
    margin: auto;
    border-right: 1px solid #0000001f;
    border-left: 1px solid #0000001f;
    border-top: 1px solid #0000001f;

    &__container {
      width: 700px;
      // bottom: 30px;

      &-input {
        width: 35%;
        min-width: 250px;
      }
    }
  }

  .intoMessages__header {

    &-container {
      display: flex;
      justify-content: center;
      width: 100%;
    }
  }
}



</style>

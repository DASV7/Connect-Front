<script setup>
import { onMounted, onBeforeUnmount, ref, getCurrentInstance, computed, reactive } from "vue";
import axios from "../../api/axios";
import avatarUser from "../shared/avatarUser.vue";
import { useRoute } from "vue-router";
import Swal from "sweetalert2";
import { useCounterStore } from "../../store/users";
import messageCard from "./messageCard.vue";
import { useSocketStore } from "../../store/socketStore";
import AvatarUser from "../shared/avatarUser.vue";
import connect from "../../components/connect/connect.vue";
import Modal from "../shared/modal.vue";
import { calculateAge } from "../../utils/calculateAge";

const message = ref("");
let messagesUser = reactive([]);
const route = useRoute();
const userSesion = useCounterStore();
const members = ref([]);
const socket = useSocketStore();
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
  userChat.value = members.value.find((e) => e._id != userSesion.user._id);
  console.log(userChat.value);
  messagesUser.splice(messagesUser.length, 0, ...response.messages);
  setTimeout(() => goToBottom(), 100);
  isLoading.value = false;
});

socket.socket.on("messages/newMessage/", async (message) => {
  messagesUser.push(message);
});

const filterMembers = (message) => {
  const filter = members.value.find((member) => member._id == message.sender);
  return filter;
};

const itsMe = (message) => {
  return message.sender == userSesion.user?._id;
};

const goToBottom = () => {
  const element = document.getElementById("elemento-final");
  element.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });
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
  socket.socket.disconnect();
});
let hiddenProfile = ref(false);

function changeModal() {
  hiddenProfile.value = !hiddenProfile.value;
}
</script>

<template>
  <div class="intoMessages__allPage">
    <div class="intoMessages" v-if="!isLoading">
      <Modal :showModal="hiddenProfile" @changeModal="changeModal()">
        <template v-slot:content>
          <connect :user="userChat" :hiddeActions="false" />
        </template>
      </Modal>
      <div class="intoMessages__header">
        <button @click="$router.push('/messages')" class="intoMessages__header-btnBack">
          <i class="fa-sharp fa-solid fa-arrow-left"> </i>
        </button>
        <div class="intoMessages__header-info">
          <AvatarUser @openProfile="changeModal()" :user="userChat" :size="40"></AvatarUser>
          <p @openProfile="changeModal()" class="intoMessages__header-name">{{ userChat.name }}, {{ calculateAge(userChat.birthday) }}</p>
        </div>
        <button class="intoMessages__header-btnBack"><i class="fa-sharp fa-solid fa-ellipsis-vertical"></i></button>
      </div>

      <div class="intoMessages__messages" scrollDefault>
        <div :id="index" class="intoMessages__messageItem" v-for="(message, index) in messagesUser" :key="message._id">
          <messageCard @openProfile="changeModal()" :message="message" :user="filterMembers(message)" :idx="itsMe(message)"></messageCard>
        </div>
        <div id="elemento-final"></div>
      </div>

      <div class="intoMessages__all">
        <div class="intoMessages__container">
          <input class="intoMessages__container-input" type="text" placeholder="Nuevo Mensaje " v-model="message" />
          <button class="intoMessages__container-send" @click="newMessage">
            <i class="fa fa-paper-plane" aria-hidden="true"></i>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
body {
  background-color: #f8f2f2;
}
.intoMessages {
  width: 100%;
  height: 100%;

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
    position: fixed;
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
  }
  // &__messageItem {
  // }

  &__messages {
    max-height: 83%;
    overflow-y: auto;
    overflow-x: hidden;
    margin-top: 50px;
  }
  &__all {
    display: flex;
    justify-content: center;
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
      width: 65%;
      height: 35px;
      font-size: 10px;
      cursor: text;
      transition: all 0.3s ease;
      text-align: start;
      padding-left: 15px;
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
        width: 70%;
        min-width: 250px;
      }
    }
  }

  .intoMessages__header {
    width: 56%;

    &-container {
      display: flex;
      justify-content: center;
      width: 100%;
    }
  }
}
@media screen and (min-width: 1300px) {
  .intoMessages {
    width: 50%;

    &__header {
      width: 47%;
    }
  }
}
</style>

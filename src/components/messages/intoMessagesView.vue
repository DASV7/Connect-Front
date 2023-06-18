<script setup>
import { onMounted, onBeforeUnmount, ref, getCurrentInstance, computed, reactive } from "vue";
import axios from "../../api/axios";
import avatarUser from "../shared/avatarUser.vue";
import { useRoute } from "vue-router";
import Swal from "sweetalert2";
import { useCounterStore } from "../../store/users";
import messageCard from "./messageCard.vue";
import { useSocketStore } from "../../store/socketStore";

const message = ref("");
let messagesUser = reactive([]);
const route = useRoute();
const userSesion = useCounterStore();
const members = ref([]);
const socket = useSocketStore();

const bindRef = ref(true);

onMounted(async () => {
  const user = await axios.get("/messages?id=" + route.params.id).catch((error) => {
    Swal.fire({ icon: "error", title: "Ocurrio un error", text: "Error al solicitar los mensajes", showConfirmButton: false, timer: 2000 });
  });

  const response = user.data.data;
  if (!response) return;
  members.value = response.members;
  messagesUser.splice(messagesUser.length, 0, ...response.messages);
});

socket.socket.on("messages/newMessage/", async (message) => {
  messagesUser.push(message);
});

const filterMembers = (message) => {
  const filter = members.value.find((member) => member._id == message.sender);
  return filter;
};

const itsMe = (message) => {
  return message.sender == userSesion.user._id;
};

const newMessage = async () => {
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
  goToBottom();
};

const goToBottom = () => {
  const element = document.querySelector(".intoMessages__messages");
  element.scrollTop = 0;
};

onBeforeUnmount(() => {
  socket.socket.disconnect();
});
</script>
<template>
  <div class="intoMessages">
    <div class="intoMessages__messages">
      <div :id="index" class="intoMessages__messageItem" v-for="(message, index) in messagesUser" :key="message._id">
        <messageCard :message="message" :user="filterMembers(message)" :idx="itsMe(message)"></messageCard>
      </div>
    </div>
    <div class="intoMessages__container">
      <input class="intoMessages__container-input" type="text" placeholder="Nuevo Mensaje " v-model="message" />
      <button class="intoMessages__container-send" @click="newMessage"><i class="fa fa-paper-plane" aria-hidden="true"></i></button>
    </div>
  </div>
</template>
<style lang="scss">
.intoMessages {
  height: 100vh;
  width: 100vw;

  &__messageItem {
  }

  &__messages {
    max-height: 85%;
    overflow-y: auto;
    overflow-x: hidden;
  }
  &__container {
    display: flex;
    align-items: center;
    &-input {
      display: flex;
      align-items: center;
      border: 1px solid #ccc;
      border-radius: 25px;
      margin-top: 20px;
      padding: 10px 20px;
      background-color: #f2f2f2;
    }

    &-input {
      flex: 1;
      border: none;
      outline: none;
      font-size: 16px;
      font-weight: bold;
      color: #333;
      background-color: transparent;
      margin-right: 10px;
    }

    &-input ::placeholder {
      color: #999;
    }

    &-input {
      background-color: #2195f37a;
      color: #000000;
      border: none;
      height: 20px;
      border-radius: 25px;
      padding: 10px 20px;
      font-size: 16px;
      font-weight: bold;
      cursor: pointer;
      transition: all 0.3s ease;
    }

    &-input:hover {
      background-color: #0d8bff;
    }

    &-send {
      background-color: #2196f3;
      color: #fff;
      border: none;
      border-radius: 25px;
      padding: 10px 20px;
      font-size: 16px;
      font-weight: bold;
      cursor: pointer;
      transition: all 0.3s ease;
    }

    &-send:hover {
      background-color: $primary-color;
    }
  }
}
</style>

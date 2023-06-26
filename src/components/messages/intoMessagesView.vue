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
  setTimeout(() => goToBottom(), 100);
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

const goToBottom = () => {
  const element = document.getElementById("elemento-final");
  element.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });
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
  setTimeout(() => goToBottom(), 150);
};

onBeforeUnmount(() => {
  socket.socket.disconnect();
});
</script>
<template>
  <div class="intoMessages">
    <div class="intoMessages__messages" scrollDefault>
      <div :id="index" class="intoMessages__messageItem" v-for="(message, index) in messagesUser" :key="message._id">
        <messageCard :message="message" :user="filterMembers(message)" :idx="itsMe(message)"></messageCard>
      </div>
      <div id="elemento-final"></div>
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
    max-height: 83%;
    overflow-y: auto;
    overflow-x: hidden;
  }

  &__container {
    display: flex;
    align-items: center;
    position: absolute;
    bottom: 55px;
    width: 100%;
    &-input {
      background-color: #2195f37a;
      color: #000000;
      border: none;
      border-radius: 25px;
      width: 100%;
      height: 30px;
      font-size: 16px;
      font-weight: bold;
      cursor: pointer;
      transition: all 0.3s ease;
      text-align: center;
    }

    &-input:hover {
      background-color: #0d8bff;
      outline: none;
    }

    &-send {
      background-color: #2196f3;
      color: #fff;
      border: none;
      border-radius: 25px;
      height: 30px;
      width: 40px;
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

<script setup>
import { onMounted, ref } from "vue";
import axios from "../../api/axios";
import avatarUser from "../shared/avatarUser.vue";
import { useRoute } from "vue-router";
import Swal from "sweetalert2";
import { useCounterStore } from "../../store/users";
const message = ref("");
const route = useRoute();
const messages = ref([]);

onMounted(async () => {
  const user = await axios
    .get("/messages?id=" + route.params.id)
    .catch((error) => {
      Swal.fire({
        icon: "error",
        title: "Ocurrio un error",
        text: "Error al solicitar los mensajes",
        showConfirmButton: false,
        timer: 2000,
      });
    });
  const response = user.data.data;
  console.log("mensajes", response);
  messages.value = response;
});

const newMessage = async () => {
  const user = await axios
    .post("/messages", {
      message: message.value,
      conversationId: route.params.id,
    })
    .catch((error) => {
      Swal.fire({
        icon: "error",
        title: "Ocurrio un error",
        text: "Error al enviar el mensaje",
        showConfirmButton: false,
        timer: 2000,
      });
    });
  messages.value.push(user.data.data);
};
</script>
<template>
  <div class="intoMessages">
    <div class="intoMessages__messages">
      <div
        class="intoMessages__messageItem"
        v-for="(message, index) in messages"
        :key="index"
      >
        {{ message.message }}
      </div>
    </div>
    <div class="intoMessages__container">
      <input type="text" placeholder="Buscar" v-model="message" />
      <button @click="newMessage">Enviar</button>
    </div>
  </div>
</template>
<style lang="scss">
.intoMessage {
}
</style>

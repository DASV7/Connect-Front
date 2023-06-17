<script setup>
import { onMounted, ref } from "vue";
import axios from "../../api/axios";
import avatarUser from "../shared/avatarUser.vue";
import { useRoute } from "vue-router";
import Swal from "sweetalert2";

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
  messages.value = response;

  console.log(route.params);
});
</script>
<template>
  <div class="intoMessages">
    <div class="intoMessages__container">
      Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sunt, quis
      voluptatum! Dolor reiciendis labore eveniet ex doloremque quam excepturi
      quasi, necessitatibus quis aliquam rerum nisi. Atque dolorum sequi unde
      dolore? Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sunt,
      quis voluptatum! Dolor reiciendis labore eveniet ex doloremque quam
      excepturi quasi, necessitatibus quis aliquam rerum nisi. Atque dolorum
      sequi unde dolore? Lorem ipsum, dolor sit amet consectetur adipisicing
      elit. Sunt, quis voluptatum! Dolor reiciendis labore eveniet ex doloremque
      quam excepturi quasi, necessitatibus quis aliquam rerum nisi. Atque
      dolorum sequi unde dolore? Lorem ipsum, dolor sit amet consectetur
      adipisicing elit. Sunt, quis voluptatum! Dolor reiciendis labore eveniet
      ex doloremque quam excepturi quasi, necessitatibus quis aliquam rerum
      nisi. Atque dolorum sequi unde dolore?
    </div>
  </div>
</template>
<style lang="scss">
.intoMessage {
}
</style>

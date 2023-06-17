<script setup>
import { onMounted, ref } from "vue";
import axios from "../../api/axios";
import Swal from "sweetalert2";
import avatarUser from "../shared/avatarUser.vue";
import { useCounterStore } from "../../store/users.js";
const users = ref([]);
const usersStore = useCounterStore();
const avatarUsers = ref({});
const otherAvatar = (users) => {
  return users.find((user) => {
    const val = user._id != usersStore.user._id;
    return val;
  });
};

onMounted(async () => {
  const user = await axios.get("/messages/conversations").catch((error) => {
    Swal.fire({
      icon: "error",
      title: "Ocurrio un error",
      text: "Error al solicitar los mensajes",
      showConfirmButton: false,
      timer: 2000,
    });
  });
  const response = user.data.data;
  console.log(response);
  users.value = response;
});
</script>
<template>
  <div class="messagesView" v-if="users.length">
    <div class="messagesView__container">
      <div
        class="messagesView__cardChat"
        v-for="(user, index) in users"
        :key="index"
        @click="$router.push(`/messages/${user._id}`)"
      >
        <div class="messagesView__cardChat-img">
          <avatarUser :user="otherAvatar(user.members)" :size="40" />
        </div>

        <div class="messagesView__cardChat-info">
          <div class="messagesView__cardChat-userName">
            {{ otherAvatar(user.members).name }}
          </div>
          <div class="messagesView__cardChat-text">
            {{ otherAvatar(user.members).message || "Da el primer paso" }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.messagesView {
  display: flex;
  justify-content: center;

  &__container {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  &__cardChat {
    display: flex;
    border: 1px solid #5e5e5ec9;
    border-radius: 10px;
    padding: 10px;
    height: 40px;
    min-width: 250px;
  }
}
</style>

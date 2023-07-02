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
  const valor = users.find((user) => {
    return user._id != usersStore.user._id;
  });
  console.log(valor);
  return valor || {};
};
const loading = ref(true);
onMounted(async () => {
  const user = await axios.get("/messages/conversations").catch((error) => {
    loading.value;
    Swal.fire({
      icon: "error",
      title: "Ocurrio un error",
      text: "Error al solicitar los mensajes",
      showConfirmButton: false,
      timer: 2000,
    });
  });
  const response = user.data.data;
  users.value = response;
  loading.value = false;
});
</script>
<template>
  <div class="messagesView" v-if="!loading">
    <h3>Hoy sera un excelente día...</h3>
    <div class="messagesView__wrapper" v-if="users.length">
      <div class="messagesView__container">
        <div class="messagesView__cardChat" v-for="(user, index) in users" :key="index" @click="$router.push(`/messages/${user._id}`)">
          <div class="messagesView__cardChat-img">
            <avatarUser :user="otherAvatar(user.members)" :size="40" />
          </div>

          <div class="messagesView__cardChat-info">
            <div class="messagesView__cardChat-userName">
              {{ otherAvatar(user.members).name }}
            </div>
            <div class="messagesView__cardChat-text">
              {{ user.ultimateMessage || "Da el primer paso" }}
            </div>
          </div>
          <div class="messagesView__cardChat-countMessages">
            {{ user.countMessages || 0 }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.messagesView {
  padding: 10px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;

  &__wrapper {
    display: flex;
    justify-content: center;
    padding: 20px;
  }

  &__container {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  &__cardChat {
    display: flex;
    justify-content: space-between;
    align-self: center;
    gap: 10px;
    border-bottom: 1px solid #5e5e5ec9;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    border-radius: 10px;
    cursor: pointer;
    padding: 10px;
    height: 40px;
    width: 300px;

    &-userName {
      font-weight: bold;
    }

    &-text,
    &-userName {
      max-width: 204px;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
    }

    &-countMessages {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 25px;
      width: 25px;
      text-align: center;
      font-size: 12px;
      background-color: $primary-color;
      border-radius: 50%;
    }
  }
}
</style>

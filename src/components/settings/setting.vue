<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import axios from "../../api/axios";
const router = useRouter();
const closeSesion = () => {
  localStorage.clear();
  router.push("/");
  window.location.reload();
};
let confirmationDelete = ref(false);
let modalConfirm = ref(false);

const deleteAccount = async () => {
  modalConfirm.value = !modalConfirm.value;
  if(!modalConfirm.value){
    confirmationDelete.value = !confirmationDelete.value
  }
  if (confirmationDelete.value) {
    const reponse = await axios.delete("/usersModule/deleteAccount");
    console.log(reponse.data);
    localStorage.clear();
    router.push("/");
    window.location
      .reload()

      .catch((error) => {
        push.error({});
      });
  }
};
// function yesDelete(){
//   confirmationDelete.value = !confirmationDelete.value
//   modalConfirm.value = !modalConfirm.value;
// }
function notDelete() {
  modalConfirm.value = !modalConfirm.value;
}
</script>

<template>
  <div class="settings">
    <div class="settings__header">
      <p>Configuración</p>
    </div>
    <button class="editProfile__top-btn" @click="$router.push('/profile')"><i class="fa-solid fa-arrow-left"></i></button>
    <button class="profileUser__header-btn" @click="closeSesion()">
      <i class="fa fa-sign-out" aria-hidden="true"></i>
    </button>

    <div v-if="modalConfirm">
      <p>Estas segudo de eliminar tu cuenta?</p>
      <button @click="deleteAccount(true)">Confirmar</button>
      <button @click="notDelete()">Cancelar</button>
    </div>
    <p>x</p>
    <p>x</p>
    <p>x</p>
    <p>x</p>
    <p>x</p>
    <p>x</p>
    <p>x</p>
    <button @click="deleteAccount()">Delete Account</button>
  </div>
</template>

<style lang="scss"></style>

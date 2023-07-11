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
  if (!modalConfirm.value) {
    confirmationDelete.value = !confirmationDelete.value;
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
let openSettingView = ref(false);
function openSetting() {
  openSettingView.value = !openSettingView.value;
}
</script>

<template>
  <div class="settings">
    <div class="settings__wrapper">
      <!-- back -->

      <div class="settings__header">
        <button class="editProfile__top-btn" @click="$router.push('/profile')"><i class="fa-solid fa-arrow-left"></i></button>
        <p>Configuración</p>
      </div>

      <!-- btns -->
      <div class="settings__containerBtn">
        <div class="settings__containerBtn-btn">
          <i class="fa-sharp fa-solid fa-gear"></i>
          <p>Informacion del perfil</p>
        </div>
        <div class="settings__containerBtn-btn">
          <i class="fa-sharp fa-solid fa-gear"></i>
          <p>Informacion de la cuenta</p>
        </div>
        <div @click="openSetting()" class="settings__containerBtn-btn">
          <i class="fa-sharp fa-solid fa-gear"></i>
          <p>Configuracion de la cuenta</p>
        </div>
     
        <div class="settings__containerBtn-btn">
          <i class="fa-sharp fa-solid fa-trash"></i>
          <button class="settings__delete" @click="deleteAccount()">
            Delete Account</button>
        </div>
        <div @click="closeSesion()" class="settings__containerBtn-btn">
          <i class="fa fa-sign-out" aria-hidden="true"></i>
          Cerrar Seccion
        </div>
      </div>

      <!-- openSettingView -->

      <div class="settings__openSettingView"></div>

      <!-- Modal -->

      <div class="settings__delete-modal" v-if="modalConfirm">
        <p>¿Estas seguro de eliminar tu cuenta?</p>
        <div>

          <button class="settings__delete-btnYes" @click="deleteAccount(true)">Confirmar</button>
          <button class="settings__delete-btnNo" @click="notDelete()">Cancelar</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.settings {
  display: flex;
  justify-items: center;
  align-items: center;
  width: 100vw;
  height: 100vh;

  &__wrapper {
    display: flex;
    align-items: center;
    flex-direction: column;
    width: 100%;
    height: 100%;
    background-color: #ffffff;
    box-shadow: #000 0px 5px 10px;
    border-radius: 20px;
    padding: 10px;

    @media screen and (min-width: 1024px) {
      width: 55%;
      height: 95%;
      margin: auto;
    }
  }
  &__header {
    display: flex;
    justify-content: space-between;
    width: 100%;
    margin-top: 10px;
  }
  &__containerBtn {
    width: 100%;

    &-btn {
      display: flex;
      align-items: end;
      gap: 10px;
      font-size: 20px;
      width: 100%;
      height: 40px;
      border-bottom: 1px solid #00000066;
      padding-bottom: 3px;
      cursor: pointer;
      p {
        font-size: 15px;
      }
    }
  }
  &__delete {
    background-color: #a60c0c;
    border: none;
    color: #ffffff;
    width: 100px;
    height: 25px;
    border-radius: 10px;
    font-weight: 700;
    font-size: 10px;
    cursor: pointer;
    
    &-modal {
      @include Column;
      width: 300px;
      height: 130px;
      background-color: #000;
      border-radius: 10px;
      padding: 10px;
      gap: 10px;
    
      p {
        font-size: 20px;
        text-align: center;
        font-weight: 700;
        color: #ffffff;

      }
      div {
        display: flex;
        gap: 10px;
      }
    }
    &-btnYes, &-btnNo {
      width: 90px;
      height: 35px;
      border-radius: 10px;
      background-color: #000;
      color: #ffffff;
      border: #fff solid 1px;
      cursor: pointer;
    }
    &-btnNo {
      background-color: #ffffff;
      color: #000;
    }
  }
}
</style>

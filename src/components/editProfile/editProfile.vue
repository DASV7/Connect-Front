<script setup>
import { onMounted, ref } from "vue";
import { useCounterStore } from "../../store/users";
import axios from "../../api/axios";
const userStore = useCounterStore();

let dateString = null;
let date = null;
let formattedDate = ref("");
let text = ref();

const sex = ref({ male: "Masculino", female: "Femenino" });
const description = ref("");
onMounted(() => {
  dateString = userStore.user.birthday;
  date = new Date(dateString);
  formattedDate.value = date.toDateString();
  description.value = userStore.user.description;
});

const updateProfile = async () => {
  const response = await axios.patch("/usersmodule/updateProfile", { description: description.value });
  localStorage.setItem("vinc-jwt", response.data);
  console.log(response.data);
  // console.log(response);
};
</script>

<template>
  <div class="editProfile" scrollDefault>
    <div class="editProfile__wrapper" scrollDefault>
      <div class="editProfile__top">
        <button class="editProfile__top-btn" @click="$router.push('/profile')"><i class="fa-solid fa-arrow-left"></i></button>
        <p class="editProfile__top-tittle">Edita tu perfil</p>
      </div>
      <div class="editProfile__album">
        <div class="editProfile__album-item">
          <img class="editProfile__album-img" :src="userStore.user.pictures[0].url" alt="" />
        </div>
        <div class="editProfile__album-item">
          <img class="editProfile__album-img" :src="userStore.user.pictures[1]?.url" alt="" />
        </div>
      </div>
      <div class="editProfile__btn">
        <button class="editProfile__btn-add">Cambiar Fotos</button>
      </div>
      <div></div>
      <div class="editProfile__info">
        <p class="editProfile__txt">Informacion Basica</p>
        <div class="editProfile__tags">
          <p class="editProfile__tags-p">Nombre:</p>
          <p class="editProfile__tags-p">{{ userStore.user.name }}</p>
        </div>
        <div class="editProfile__tags">
          <p class="editProfile__tags-p">Sexo:</p>
          <p class="editProfile__tags-p">{{ sex[userStore.user.biologicalSex] }}</p>
        </div>
        <div class="editProfile__tags">
          <p class="editProfile__tags-p">Fecha de cumpleaños:</p>
          <p class="editProfile__tags-p">{{ formattedDate }}</p>
        </div>
        <textarea resize="none" class="editProfile__tags-input" v-model="description" placeholder="Ingresa tu descripcion"> </textarea>
        <div>{{ text }}</div>
        <button class="editProfile__btn-save" @click="updateProfile()">Guardar</button>
      </div>
    </div>
  </div>
</template>

<style lang="scss">

.editProfile {
  width: 100%;
  height: 100%;
  overflow-y: scroll;


  &__wrapper {
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    width: 100%;
    // height: 100%;
    margin: auto;
    margin-top: 10px;
    background-color: #ffffff;
  }
  &__album {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 25px;
    width: 80%;
    // margin-top: 30px;
    // margin: auto;

    &-item {
      // width: 40%;
      border-radius: 15px;
      overflow: hidden;
      outline: solid 5px $primary-color;
      border: solid 2px #fff;
      max-width: 200px;
    }
    &-img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      max-height: 250px;
      min-height: 150px;
      // max-width: 200px;
      // min-width: 130px;
    }
  }
  &__btn {
    display: flex;
    justify-content: center;
    margin-top: 25px;

    &-add,
    &-save {
      width: 130px;
      height: 35px;
      border: none;
      background-color:$primary-color;
      color: #fff;
      border-radius: 30px;
      max-width: 150px;
    }
    &-save {
      background-color: $primary-color;
    }
  }
  &__info {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    margin-top: 5px;
    height: 50%;
    width: 100%;
    max-width: 513px;
    margin-bottom: 30px;
    // margin: auto;
  }
  &__tags {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 10px;
    width: 85%;
    padding: 4px 10px 4px 10px;
    border-radius: 10px;
    height: 20px;
    background-color: #ece5e554;

    &-p {
      font-size: 13px;
      font-weight: 700;
    }
    &-input {
      width: 85%;
      height: 25%;
      padding: 10px;
      resize: none;
      border-radius: 10px;
      outline: none;
      background-color: #ece5e554;
      border: none;
    }
  }
  &__top {
    display: flex;
    // align-items: center;
    justify-content: space-between;
    padding: 5px;
    width: 96%;

    &-btn {
      border: none;
      background-color: $primary-color;
      width: 45px;
      height: 30px;
      text-align: center;
      color: #fff;
      border-radius: 30px;
      cursor: pointer;
    }
    &-tittle {
      font-size: 13px;
      font-weight: 700;
      color: #bfbaba;
    }
  }
  &__txt {
    font-size: 13px;
    font-weight: 700;
    margin-top: 10px;
    // margin-left: 10px;
  }
}
@media (min-width: 1024px) {
  //   body {
  //   background-image: url('/src/assets/img/5593045.jpg');
  //   background-repeat: no-repeat;
  //   background-size: cover;
  //   background-color: rgba(255, 255, 255, 0.5);
  // } {} {}
  .editProfile__album {
    justify-content: center;
    gap: 30px;
    margin-bottom: 30px;
    margin-top: 30px;
    flex-direction: row;

    &-item {
      width: 200px;
      height: 200px;
    }
  }
  .editProfile {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .editProfile__wrapper {
    width: 55%;
    height: 95%;
    border: #c3bebe7c solid 2px;
    box-shadow: 0px 5px 15px #9e9c9c8d;
    margin: auto;
    border-radius: 20px;
  }
  .editProfile__btn {
    max-width: 35%;
    margin: auto;
  }
  .editProfile__info {
    margin: auto;
  }
  .editProfile__album-img {
    max-width: 200px;
  }
}
@media (max-width: 500px) {
  .editProfile__album {
    flex-direction: column;
  }
}
</style>

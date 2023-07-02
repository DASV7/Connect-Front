<script setup>
import { onMounted, ref } from "vue";
import { useCounterStore } from "../../store/users";
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

let imgProfile = ["https://firebasestorage.googleapis.com/v0/b/connect-e76fc.appspot.com/o/icons%2F2466249.jpg?alt=media&token=57fdb4ee-8650-4ccc-a841-d04ba7816556z"];
</script>
<template>
  <div class="editProfile">
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
      <button class="editProfile__btn-add">Añadir Fotos</button>
    </div>
    <div>
    </div>
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
      <textarea resize="none" 
      class="editProfile__tags-input" 
      v-model="description" 
      placeholder="Ingresa tu descipcion"
      > </textarea>
      <div>{{ text }}</div>
    </div>
  </div>
</template>

<style lang="scss">
.editProfile {
  width: 100%;
  height: 100%;

  &__album {
    display: flex;
    justify-content: space-evenly;
    width: 100%;
    // height: 27%;
    margin-top: 10px;

    &-item {
      // width: 40%;
      border-radius: 15px;
      overflow: hidden;
      outline: solid 5px $primary-color;
      border: solid 2px #fff;

    }
    &-img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      max-width: 200px;
      max-height: 200px;
    }
  }
  &__btn {
    display: flex;
    justify-content: center;
    margin-top: 10px;

    &-add {
      width: 70%;
      height: 35px;
      border: none;
      background-color: $primary-color;
      color: #fff;
      border-radius: 30px;
      max-width: 150px;
    }
  }
  &__info {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    margin-top: 5px;
    height: 50%;
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
    background-color: #ece5e5;

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
      background-color: #ece5e5;
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
    margin-left: 10px;
  }
}
@media (min-width: 1000px) {
  .editProfile__album {
    justify-content: center;
    gap: 30px;
    margin-bottom: 30px;
    &-item {
      width: 200px;
      height: 200px;
    }
  }
  .editProfile__btn {
    max-width: 35%;
    margin: auto;
  }
  .editProfile__info{
    width: 50%;
    margin: auto;
   }

}
</style>

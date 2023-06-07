<template>
  <div class="flowRegister">
    <div class="loginConnect__containerTitle">
      <h2 class="loginConnect__title">VINC</h2>
    </div>
    <div class="flowRegister__wrapper">
      <div class="flowRegister__containerTitle">
        <h3 class="flowRegister__title">{{ goToGo[indexReg].title }}</h3>
      </div>
      <div class="flowRegister__formContainer">
        <div class="flowRegister__form-group" v-if="indexReg == 0">
          <input
            type="text"
            class="flowRegister__form-input"
            placeholder="Nombre Completo"
          />
        </div>
        <div class="flowRegister__form-group" v-if="indexReg == 1">
          <div
            class="flowRegister__interest"
            v-for="(item, index) in interest"
            :key="index"
          >
            <i :class="item.icon"></i>
            <span
              ><p>{{ item.desciption }}</p>
              {{ item.text }}</span
            >
          </div>
        </div>
        <div class="flowRegister__form-group" v-if="indexReg == 2">
          <input
            type="date"
            class="flowRegister__form-input"
            max="2005-12-31"
            placeholder="Fecha de nacimiento"
          />
        </div>
        <div class="flowRegister__form-group" v-if="indexReg == 3">
          <input
            type="text"
            class="flowRegister__form-input"
            placeholder="Correo Electronico"
          />
        </div>
        <div class="flowRegister__pictureIcons" v-if="indexReg == 4">
          <label class="flowRegister__picture" for="img"><i class="fa-solid fa-camera-retro"></i></label>
          <input
            v-show="false"
            type="file"
            id="img"
            class="flowRegister__form-input"
            placeholder="Correo Electronico"
          />
          <label class="flowRegister__picture" for="img2"><i class="fa-solid fa-camera-retro"></i></label>
          <input
            v-show="false"
            id="img2"
            type="file"
            class="flowRegister__form-input"
            placeholder="Correo Electronico"
          />
        </div>
        <div class="flowRegister__form-group" v-if="indexReg == 5">
          <input
            type="password"
            class="flowRegister__form-input"
            placeholder="Contraseña"
          />
        </div>
      </div>
      <div class="flowRegister__button">
        <button class="flowRegister__button-register" @click="nextvalue()">
          Continuar
        </button>
      </div>
    </div>
  </div>
</template>
<script setup>
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { goToGo } from "../../utils/sharedObjects";
const router = useRouter();
let userNew = ref({
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
  sex: "",
  birthday: "",
  phone: "",
  interesting: "",
  city: "",
});
let indexReg = ref(0);
const interest = [
  {
    text: "Quiero una relación",
    icon: "fa-sharp fa-solid fa-heart-circle-check",
    desciption: "Busco algo duradero. Nada de juegos.",
  },
  {
    text: "Abierto a conocer",
    icon: "fa-solid fa-comments",
    desciption: "Estoy aqui para chatear y ver que pasa.",
  },
  {
    text: "Para negocios",
    icon: "fa-solid fa-briefcase",
    desciption: "Quiero Tener contactos, que sean estrategicos",
  },
];

onMounted(() => {
  userNew.value.sex = router.currentRoute.value.query.sex;
});

const nextvalue = () => {
  indexReg.value++;
};
</script>
<style lang="scss">
.flowRegister {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  text-align: center;
  padding: 20px 10px;
  &__form {
    &-group {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }
    &-input {
      text-align: center;
      width: 98%;
      height: 40px;
      outline: none;
      border: none;
      background-color: #f9f9f9;
      color: #000;
      font-weight: 700;
      border-bottom: 1px solid gray;
    }
  }
  &__button {
    margin-top: 50px;
    &-register {
      width: 80%;
      height: 45px;
      border: none;
      background-color: #886eea;
      color: #fff;
      border-radius: 30px;
      font-weight: 700;
    }
  }
  &__interest {
    display: flex;
    align-items: center;
    gap: 10px;
    height: 50px;
    padding: 5px;
    border-radius: 10px;
    border: 1px solid #ccc;
    width: 97%;
    background-color: rgba(128, 128, 128, 0.144);
    cursor: pointer;
    i {
      font-size: 20px;
      color: #886eea;
    }
    span {
      font-size: 10px;
      color: #777;
    }
    p {
      font-size: 12px;
      color: black;
      font-weight: bold;
      margin: 0;
    }
  }
  &__pictureIcons{
    display: flex;
    justify-content: space-between;    
    gap: 10px;
    width: 100%;
  }
  &__picture {
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    width: 120px;
    height: 120px;
    border-radius: 10px;
    border: 1px solid gray;    
  }
}
</style>

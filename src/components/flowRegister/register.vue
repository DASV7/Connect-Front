<template>
  <div class="flowRegister__percentage" :style="`width: ${percentage}%`"></div>
  <div class="flowRegister__return" @click="prevtvalue()">
    <i class="fa-solid fa-arrow-left"></i>
  </div>
  <div class="flowRegister">
    <div class="loginConnect__containerTitle">
      <!-- <h2 class="loginConnect__title">VINC</h2> -->
      <img class="loginConnect__title" src="../../../public/svgLogoComplete.svg" alt="" >
    </div>
    <div class="flowRegister__wrapper">
      <div class="flowRegister__containerTitle">
        <h3 class="flowRegister__title">{{ goToGo[indexReg].title }}</h3>
        <h7 class="flowRegister__description">{{
          goToGo[indexReg].description
        }}</h7>
      </div>
      <div class="flowRegister__formContainer">
        <div class="flowRegister__form-group" v-if="indexReg == 0">
          <input
            type="text"
            class="flowRegister__form-input"
            placeholder="Nombre Completo"
            v-model="userNew.name"
          />
        </div>
        <div class="flowRegister__form-group" v-if="indexReg == 1">
          <div
            class="flowRegister__interest"
            :class="
              val[index] == userNew.interesting
                ? 'flowRegister__interest-active'
                : ''
            "
            v-for="(item, index) in interest"
            :key="index"
            @click="interestClick(index)"
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
            v-model="userNew.birthday"
          />
        </div>
        <div class="flowRegister__form-group" v-if="indexReg == 3">
          <input
            type="text"
            class="flowRegister__form-input"
            placeholder="Correo Electronico"
            v-model="userNew.email"
          />
        </div>
        <div class="flowRegister__pictureIcons" v-if="indexReg == 4">
          <label class="flowRegister__picture" for="img"
            ><i class="fa-solid fa-camera-retro"></i
          ></label>
          <input
            v-show="false"
            type="file"
            id="img"
            class="flowRegister__form-input"
            placeholder="Img1"
            accept="image/*"
          />
          <label class="flowRegister__picture" for="img2"
            ><i class="fa-solid fa-camera-retro"></i
          ></label>
          <input
            v-show="false"
            id="img2"
            type="file"
            class="flowRegister__form-input"
            placeholder="img2"
            accept="image/*"
          />
        </div>
        <div class="flowRegister__form-group" v-if="indexReg == 5">
          <input
            type="password"
            class="flowRegister__form-input"
            placeholder="Contraseña"
            v-model="userNew.password"
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
import { goToGo, interest } from "../../utils/sharedObjects";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { computed } from "@vue/reactivity";
import axios from "../../api/axios";
import Swal from "sweetalert2";
const router = useRouter();

let userNew = ref({
  name: "",
  email: "",
  password: "",
  biologicalSex: "",
  birthday: "",
  phone: "",
  interesting: "",
  city: "",
});
let indexReg = ref(0);
const val = ["relationship", "chat", "contact"];

const percentage = computed(() => {
  return (100 / (goToGo.length - 1)) * indexReg.value;
});
const interestClick = (index) => {
  userNew.value.interesting = val[index];
};

onMounted(() => {
  userNew.value.biologicalSex = router.currentRoute.value.query.sex;
});

const createNewUser = async () => {
  const user = await axios
    .post("/usersModule", userNew.value)
    .catch((error) => {
      Swal.fire({
        icon: "error",
        title: "Ocurrio un error",
        text: "Correo o contraseña incorrectos",
        showConfirmButton: false,
        timer: 2000,
      });
    });  
  if (user.data.data.data) {
    Swal.fire({
      icon: "success",
      title: "Bienvenido",
      text: "¡Hola " + "nombre de usuarop" + "!",
      showConfirmButton: false,
      timer: 2000,
    });
    localStorage.setItem("vinc-jwt", user.data.data.data);
    router.push("/home");
  }
};

const nextvalue = async () => {
  if (indexReg.value < goToGo.length - 1) indexReg.value++;
  else createNewUser();
};
const prevtvalue = () => {
  if (indexReg.value > 0) indexReg.value--;
  else router.push({ path: "/" });
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

  &__formContainer {
    margin-top: 25px;
  }
  &__containerTitle {
    margin: 20px 0 0 0;
  }
  &__return {
    color: #000;
    cursor: pointer;
    font-size: 20px;
    font-weight: 700;
    padding: 5px 10px;
  }
  &__form {
    &-group {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
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
      background-color: $primary-color;
      color: #fff;
      border-radius: 30px;
      font-weight: 700;
    }
  }
  &__interest {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
    height: 50px;
    padding: 5px;
    border-radius: 10px;
    border: 1px solid #ccc;
    width: 97%;
    max-width: 350px;
    background-color: rgba(128, 128, 128, 0.144);
    cursor: pointer;
    i {
      font-size: 20px;
      color: $primary-color;
    }
    span {
      font-size: 10px;
      color: #777;
    }
    p {
      font-size: 14px;
      color: black;
      margin: 0;
    }
    &-active {
      background-color: #e2dbfb;
    }
  }
  &__pictureIcons {
    display: flex;
    justify-content: space-between;
    gap: 10px;
    width: 100%;
  }
  &__percentage {
    height: 5px;
    background-color: $primary-color;
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
  &__title {
    margin-bottom: 0;
  }
  &__description {
    font-size: 12px;
    font-weight: bold;
    color: #777;
  }
}
</style>

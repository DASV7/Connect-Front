<script setup>
import { goToGo, interest } from "../../utils/sharedObjects";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { computed } from "@vue/reactivity";
import axios from "../../api/axios";
import Swal from "sweetalert2";
import totalLoading from "../shared/totalLoading.vue";
import { usePush } from "notivue";

const router = useRouter();

let userNew = ref({
  name: "",
  email: "",
  biologicalSex: "",
  birthday: "",
  hereFor: "",
  password: "",
  description: "",
});
let indexReg = ref(0);
const val = ["relationship", "chat", "contact"];

const percentage = computed(() => {
  return (100 / (goToGo.length - 1)) * indexReg.value;
});
const interestClick = (index) => {
  userNew.value.hereFor = val[index];
};

onMounted(() => {
  userNew.value.biologicalSex = router.currentRoute.value.query.sex;
});

const push = usePush();

let selectedFile = ref([]);
const handleFileUpload = (event, index) => {
  const file = event.target.files[0];
  if (file) {
    selectedFile.value[index] = file;
    const value = "image" + (index ? index : "");
    const previewImage = document.getElementById(value);

    const reader = new FileReader();
    reader.addEventListener("load", (event) => {
      previewImage.src = event.target.result;
    });

    reader.readAsDataURL(file);
  }
};

const isCreatingUser = ref(false);

const createNewUser = async () => {
  if (isCreatingUser.value) return;
  isCreatingUser.value = true;
  const user = await axios.post("/usersModule", userNew.value).catch((error) => {
    push.error({
      title: "Ocurrio un al registrarte",
      message: "Intenta nuevamente en unos minutos",
    });
  });
  isCreatingUser.value = false;
  if (user.data.data.data) {
    push.success({
      title: "Registro Correcto.",
      message: "Bienvenido a tu lugar especial.",
    });

    localStorage.setItem("vinc-jwt", user.data.data.data);
    const userWithPictures = await updaloadPictures(user);
    localStorage.clear();
    localStorage.setItem("vinc-jwt", userWithPictures.data.token);
    isCreatingUser.value = false;
    router.push({ path: "/home", query: { reg: 1 } });

  }
};

const updaloadPictures = async (user) => {
  isCreatingUser.value = true;
  let token;
  for (let index = 0; index < selectedFile.value.length; index++) {
    const element = selectedFile.value[index];
    let formData = new FormData();
    formData.append("id", user.data.data.id);
    formData.append("index", index);

    formData.append("filename", element);
    const data = await axios
      .post("/usersModule/updloadpicture", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .catch((error) => {
        isCreatingUser.value = false;
        Swal.fire({
          icon: "error",
          title: "Ocurrio un error",
          text: "Correo o contraseña incorrectos",
          showConfirmButton: false,
          timer: 2000,
        });
      });    
    token = data;
  }
  return token;
};
const nextvalue = async () => {
  if (indexReg.value < goToGo.length - 1) {
    if (userNew.value[goToGo[indexReg.value].info] || selectedFile.value.length == 2) indexReg.value++;
  } else createNewUser();
};

const readyTocontinue = computed(() => {
  return userNew.value[goToGo[indexReg.value].info] || selectedFile.value.length == 2;
});
const prevtvalue = () => {
  if (indexReg.value > 0) {
    indexReg.value--;
  } else router.push({ path: "/" });
};
</script>
<template>
  <div class="flowRegister__percentage" :style="`width: ${percentage}%`"></div>
  <div class="flowRegister__return" @click="prevtvalue()">
    <i class="fa-solid fa-arrow-left"></i>
  </div>
  <totalLoading v-if="isCreatingUser" :textLabel="'Subiendo Imagenes...'" />
  <div class="flowRegister">
    <div class="loginConnect__containerTitle">
      <!-- <h2 class="loginConnect__title">VINC</h2> -->
      <img class="loginConnect__title" src="../../../public/svgLogoComplete.svg" alt="" />
    </div>
    <div class="flowRegister__wrapper">
      <div class="flowRegister__containerTitle">
        <h3 class="flowRegister__title">{{ goToGo[indexReg].title }}</h3>
        <h6 class="flowRegister__description">{{ goToGo[indexReg].description }}</h6>
      </div>
      <div class="flowRegister__formContainer">
        <div class="flowRegister__form-group" v-if="indexReg == 0">
          <input type="text" class="flowRegister__form-input" placeholder="Nombre Completo" v-model="userNew.name" />
        </div>
        <div class="flowRegister__form-group" v-if="indexReg == 1">
          <div
            class="flowRegister__interest"
            :class="val[index] == userNew.hereFor ? 'flowRegister__interest-active' : ''"
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
          <input type="date" class="flowRegister__form-input" max="2005-12-31" placeholder="Fecha de nacimiento" v-model="userNew.birthday" />
        </div>
        <div class="flowRegister__form-group" v-if="indexReg == 3">
          <input type="email" class="flowRegister__form-input" placeholder="Correo Electronico" v-model="userNew.email" />
        </div>
        <div class="flowRegister__form-group" v-if="indexReg == 4">
          <input type="text" class="flowRegister__form-input" placeholder="Descripcion: Ejm..'Soy un estudiante Apasionado...'" v-model="userNew.description" />
        </div>
        <div class="flowRegister__form-group" v-if="indexReg == 5">
          <input type="password" class="flowRegister__form-input" placeholder="Contraseña" v-model="userNew.password" />
        </div>
        <div class="flowRegister__pictureIcons" v-show="indexReg == 6">
          <label class="flowRegister__picture" for="img">
            <img id="image" src="#" alt="Previsualizacion Imagen" v-show="selectedFile[0]" />
            <i class="fa-solid fa-camera-retro"></i
          ></label>
          <input v-show="false" @change="handleFileUpload($event, 0)" type="file" id="img" class="flowRegister__form-input" placeholder="Img1" accept="image/*" />
          <label class="flowRegister__picture" for="img2">
            <img id="image1" src="#" alt="Previsualizacion Imagen" class="flowRegister__picture" v-show="selectedFile[1]" />

            <i class="fa-solid fa-camera-retro"></i
          ></label>
          <input v-show="false" @change="handleFileUpload($event, 1)" id="img2" type="file" class="flowRegister__form-input" placeholder="img2" accept="image/*" />
        </div>
      </div>
      <div class="flowRegister__button">
        <button class="flowRegister__button-register" :disabled="!readyTocontinue" @click="nextvalue()">Continuar</button>
      </div>
    </div>
  </div>
</template>

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
    justify-content: start;
    align-items: center;
    padding-left: 15px;
    gap: 10px;
    height: 30px;
    border-radius: 10px;
    width: 95%;
    max-width: 350px;
    background-color: rgb(0 0 0 / 3%);
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
    overflow: hidden;
    i {
      position: absolute;
      z-index: 10;
    }
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  &__title {
    margin-bottom: 0;
  }
  &__description {
    font-size: 12px;
    font-weight: bold;
    color: #777;
    margin-top: 10px;
  }
}
@media (min-width: 500px) {
  .flowRegister__interest {
    width: 100%;
    height: 45px;
  }
  .flowRegister__wrapper {
    width: 35%;
  }
  .flowRegister__button-register {
    cursor: pointer;
    width: 50%;
  }
  .flowRegister__button {
    margin-top: 25px;
  }
  .flowRegister__form-input {
    width: 75%;
  }
  .flowRegister__pictureIcons {
    justify-content: center;
  }
}
</style>

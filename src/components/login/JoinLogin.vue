<script setup>
import axios from "../../api/axios";
import { useRouter } from "vue-router";
import { ref, onMounted } from "vue";
import Swal from "sweetalert2";
const router = useRouter();
import totalLoading from "../shared/totalLoading.vue";
import { usePush } from "notivue";
import politicsModal from "../politics/politics.vue";

let userData = ref({
  email: "",
  password: "",
});

onMounted(() => {
  localStorage.clear();
});

const isLoading = ref(false);

const push = usePush();

const loginUser = async () => {

  if (isLoading.value) return;
  isLoading.value = true;
 
  const user = await axios.post("/usersmodule/login", userData.value).catch((error) => {
    push.error({
      title: "Ocurrio un error",
      message: "Correo o contraseña incorrectos",
    });
  });
  
  isLoading.value = false;
  if (user?.data?.data?.data) {
    push.success({
      title: "Inicio de sesion Correcto.",
      message: "Bienvenido nuevamente.",
    });

    localStorage.setItem("vinc-jwt", user.data.data.data);
    router.push("/home");
  }
};
let showPoliticis = ref(false);

function politics(item) {
  showPoliticis.value = item;
}
const changeStatusView = () => {
  showPoliticis.value = !showPoliticis.value;
};
</script>

<template>
  <div class="loginConnect">
    <div class="loginConnect__containerTitle">
      <img class="loginConnect__title" src="../../../public/svgLogoComplete.svg" alt="" />
    </div>

    <totalLoading v-if="isLoading" />
    <politicsModal :showModal="showPoliticis" @closeModal="changeStatusView()"></politicsModal>
    <div class="joinConnect">
      <h3 class="joinConnect__greeting">¡Hola de Nuevo!</h3>
      <p class="joinConnect__greeting-p">Ingresa tu correo o número de teléfono</p>
    </div>

    <form class="joinConnect__formJoin">
      <div class="joinConnect__formJoin-container">
        <input  autocomplete class="joinConnect__formJoin-input" type="email" placeholder="Correo o número de celular" v-model="userData.email" />
      </div>
      <div class="joinConnect__formJoin-container">
        <input autocomplete class="joinConnect__formJoin-input" type="password" placeholder="Contraseña" v-model="userData.password" @keypress.enter="loginUser()" />
      </div>
    </form>
    <div class="joinConnect__formJoin-btn" >
      <button class="joinConnect__formJoin-btnSend" @click="loginUser()">Entrar</button>
    </div>

    <div class="joinConnect__types">
      <p class="joinConnect__types-p">¿Olvidaste tu Contraseña?</p>
    </div>

    <div class="joinConnect__joinS">
      <div class="loginConnect__join-info">
        <a class="loginConnect__join-link" @click="$router.push('/')">Continuar de otra forma</a>
      </div>
      <div class="loginConnect__join-private">
        <p class="loginConnect__join-text">
          Al crear una cuenta aceptas nuestros
          <i class="politics" @click="politics(true)">Términos y condiciones y nuestra Política de privacidad</i>
        </p>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
* {
  font-family: sans-serif;
}
.joinConnect {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  text-align: center;
  margin-bottom: 15px;
  &__greeting {
    text-align: center;
    font-size: 20px;
    margin: 0%;
    &-p {
      color: #a69a9a;
      font-size: 13px;
      font-weight: 600;
      margin-top: 10px;
    }
  }
  &__formJoin {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 65%;

    @include dynamicScreen(650px) {
      width: 40%;
    }
    // height: 25%;

    &-container {
      width: 100%;
      border-bottom: 2px solid #d4d3d3;
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
    }
    &-btn {
      display: flex;
      justify-content: center;
      width: 100%;
      margin-top: 15px;
    }
    &-btnSend {
      width: 80%;
      height: 45px;
      border: none;
      background-color: $primary-color;
      color: #fff;
      border-radius: 30px;
      font-weight: 700;
      cursor: pointer;
    }
  }
  &__types {
    margin-top: 10px;
    text-align: center;

    &-p {
      font-size: 13px;
      color: $primary-color;
      font-weight: 700;
      cursor: pointer;
    }
  }

  &__joinS {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 32%;
  }
}

@media (min-width: 500px) {
  .loginConnect__title {
    margin-left: 30px;
  }
  .loginConnect__formContainer {
    display: flex;
    justify-content: center;
    width: 50%;
  }
  .loginConnect__social {
    max-width: 550px;
  }
  .loginConnect__form-group {
    display: flex;
    justify-content: center;
    width: initial;

    &__btn {
      width: 200px;
    }
  }
  .joinConnect__formJoin-btnSend {
    max-width: 240px;
  }
  .joinConnect__formJoin-container {
    max-width: 350px;
  }
}
</style>

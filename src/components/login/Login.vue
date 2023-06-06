<script setup>
import { patternEmail } from "../../utils/validations";
import { computed, ref } from "vue";
import axios from "../../api/axios";
const sendForm = async (event) => {
  event.preventDefault();
  const form = document.getElementById("login__formLogin");
  const formInfo = new FormData(form);
  const datos = {};
  for (let [clave, valor] of formInfo.entries()) {
    datos[clave] = valor;
  }
  if (validationsForm(datos)) {
    const response = await axios.post("/usersmodule", datos);
    console.log(response);
    this.$router.push("/menuPrincipal");
  }
};

const validationsForm = (info) => {
  const emailValidation = new RegExp(patternEmail);
  const isEmail = emailValidation.test(info.email);
  if (isEmail && info.email) return true;
};
validationsForm({ email: "dasbvb@gmail.com" });

const infoInputs = [
  { name: "surname", visualName: "Nombre", type: "text" },
  { name: "email", visualName: "Correo", type: "email" },
  { name: "password", visualName: "Contraseña", type: "password" },
];

let login = ref(true);

function changeMenu(e) {
  e.preventDefault();
  login.value = !login.value;
}
</script>

<template>
  <div class="login">
    <form id="login__formLogin" class="login__formItem">
      <div class="login__formLogin" v-if="login">
        <h2 class="login__formItem-title">Iniciar sesión</h2>
        <input
          class="login__formItem-input"
          type="email"
          placeholder="E-mail"
          name="email"
        />
        <input
          class="login__formItem-input"             
          type="password"
          placeholder="Password"
          name="password"
        />
        <input
          class="login__formItem-button"
          @click="sendForm($event)"
          type="submit"
          value="Iniciar sesión"
        />
      </div>

      <div class="login__formLogin" v-if="!login">
        <h2 class="login__formItem-title">Registrate</h2>
        <input
          v-for="(item, idx) in infoInputs"
          :key="idx"
          class="login__formItem-input"
          :type="item.type"
          :placeholder="item.visualName"
          :name="item.name"
        />
        <input
          class="login__formItem-input"
          @click="sendForm($event)"
          type="submit"
          value="Registrarse"
        />
      </div>
      <div class="login__formLogin-register">
        <p>{{ !login ? "¿No tienes cuenta?" : "¿Ya tienes cuenta?" }}</p>
        <button
          @click="changeMenu($event)"
          class="login__formLogin-buttonRegister"
        >
          {{ !login ? "Iniciar sesión" : "Registrarse  " }}
        </button>
      </div>
    </form>
  </div>
</template>

<style lang="scss">
* {
  padding: 0%;
  margin: 0%;
  // color: #fff;
  font-family: monospace;
}

.login {
  @include Column();
  width: 100%;
  height: 100vh;
  background-color: #222121;

  &__formLogin {
    width: 70%;
    gap: 20px;
    @include Column();

    &-register {
      @include Column();
      gap: 10px;
    }
    &-buttonRegister {
      border: none;
      background-color: #3e3d3d;
      outline: none;
      cursor: pointer;
      border-radius: 20px;
      width: 180px;
      height: 40px;

      &:hover {
        transition: 0.7s;
        background-color: #959191;
      }
    }
  }
  &__formItem {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border: solid 2px #fff;
    width: 35%;
    height: 60%;
    gap: 30px;
    min-width: 300px;
    border-radius: 20px;

    &-button {
      width: 80%;
      height: 35px;
      background-color: #3e3d3d;
      border: none;
      cursor: pointer;
      outline: none;
      border-radius: 30px;
      color: #fff;
      &::placeholder {
        color: #fff;
      }
      &:hover {
        background-color: #959191;
        transition: 0.7s;
        color: #fff;
      }
    }
    &-title {
      color: #fff;
      font-size: 20px;
    }
    &-input {
      width: 90%;
      height: 35px;
      outline: none;
      border: none;
      padding-left: 10px;
      border-radius: 20px;
      background-color: #5e5b5b;
      color: #fff;
      cursor: pointer;
      &::placeholder {
        color: #ffffffa9;
      }
      &:focus {
        outline: #959191 2px solid;
        transition: 0.7s;
      }
    }
  }
}
</style>

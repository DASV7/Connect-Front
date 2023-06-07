<template>
  <div class="loginConnect">
    <div class="loginConnect__containerTitle">
      <h2 class="loginConnect__title">VINC</h2>
    </div>
    <p class="loginConnect__subtitle">Ingresa tu genero</p>
    <div class="loginConnect__formContainer">
      <div class="loginConnect__form-group">
        <button
          @click="goRegister('male')"
          class="loginConnect__form-group__btn"
        >
          Hombre
        </button>
      </div>
      <div class="loginConnect__form-group">
        <button
          @click="goRegister('female')"
          class="loginConnect__form-group__btn"
        >
          Mujer
        </button>
      </div>
    </div>

    <div class="loginConnect__social">
      <button class="loginConnect__social-facebook">
        Iniciar Seccion Con facebook
        <i class="fab fa-facebook-f"></i>
      </button>

      <button class="loginConnect__social-google">
        Inicar Seccion Con Google
        <i class="fab fa-google"></i>
      </button>
    </div>
    <div class="loginConnect__politict">
      <div class="loginConnect__politict-info">
        <p class="loginConnect__politict-text">
          Nunca compartiremos nada sin tu permiso
        </p>
      </div>
      <div class="loginConnect__join">
        <div class="loginConnect__join-info">
          <a class="loginConnect__join-link" @click="$router.push('/JoinLogin')"
            >Continuar de otra forma</a
          >
        </div>
        <div class="loginConnect__join-private">
          <p class="loginConnect__join-text">
            Al crear una cuenta aceptas nuestros
            <a href="">Terminos y condiciones.</a> Averigua como usamos tu
            informacion en nuestras <a href="">Politicas de privacidad</a>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { useRouter } from "vue-router";
const router = useRouter();

const goRegister = (param) => {
  router.push({
    path: "/Register",
    query: {
      sex: param,
    },
  });
};
</script>
<style lang="scss">
$violetColor: #886eea;
$secondary-color: #f9f9f9;
$border-color: #ccc;
$breakpoint: 768px;

.loginConnect {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100vh;
  background-color: $secondary-color;
  overflow: auto;

  &__containerTitle,
  &__formContainer,
  &__form-group,
  &__social,
  &__politict {
    display: flex;
    align-items: center;
  }

  &__containerTitle {
    width: 100%;
    height: 30%;
    justify-content: center;
  }

  &__title {
    margin: 0px;
    font-size: 40px;
    color: $violetColor;
  }

  &__subtitle {
    font-size: 16px;
    color: #777;
  }

  &__formContainer {
    justify-content: space-evenly;
    width: 85%;
    padding: 20px;
    border-radius: 10px;
    gap: 20px;
    margin-top: 20px;
  }
  &__form-group {
    width: 100%;
    &__btn {
      width: 92%;
      height: 42px;
      border: solid 3px $violetColor;
      color: $violetColor;
      border-radius: 30px;
      background-color: #fff;
      cursor: pointer;
    }
  }

  &__social {
    flex-direction: column;
    margin-top: 25px;
    width: 100%;
    gap: 10px;
    &-icons {
      width: 100%;
      gap: 15px;
      font-size: 40px;
    }
    &-facebook,
    &-google {
      width: 80%;
      height: 40px;
      color: #fff;
      padding: 10px;
      border-radius: 100px;
      border: none;
    }
    &-facebook {
      background-color: #3b5998;
    }
    &-google {
      background-color: #000;
    }
  }
  &__politict {
    flex-direction: column;
    margin-top: 20px;
    width: 100%;
    height: 47%;

    &-info {
      display: flex;
      justify-content: center;
      width: 80%;
      height: 20px;
    }

    &-text {
      font-size: 12px;
      margin: 0px;
    }
  }

  &__join {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 90%;

    &-info {
      text-align: center;
      margin-top: 10px;
      width: 100%;
    }
    &-link {
      text-decoration: none;
      color: $violetColor;
    }

    &-text {
      text-align: center;
      font-size: 12px;
    }
  }
}
</style>

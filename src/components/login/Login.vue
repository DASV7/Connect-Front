<script setup>
import { useRouter } from "vue-router";
import { ref } from "vue";
import politicsModal from "../politics/politics.vue";
const router = useRouter();

const goRegister = (param) => {
  router.push({
    path: "/Register",
    query: {
      sex: param,
    },
  });
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
    <politicsModal :showModal="showPoliticis" @closeModal="changeStatusView()"></politicsModal>
    <div class="loginConnect__content">
      <div class="loginConnect__containerTitle">
        <img class="loginConnect__title" src="../../../public/svgLogoComplete.svg" alt="" />
      </div>
      <p class="loginConnect__subtitle">Ingresa tu genero</p>
      <div class="loginConnect__formContainer">
        <div class="loginConnect__form-group">
          <button @click="goRegister('male')" class="loginConnect__form-group__btn">Hombre</button>
        </div>
        <div class="loginConnect__form-group">
          <button @click="goRegister('female')" class="loginConnect__form-group__btn">Mujer</button>
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
          <p class="loginConnect__politict-text">Nunca compartiremos nada sin tu permiso</p>
        </div>
        <div class="loginConnect__join">
          <div class="loginConnect__join-info">
            <a class="loginConnect__join-link" @click="$router.push('/JoinLogin')">Continuar de otra forma</a>
          </div>
          <div class="loginConnect__join-private">
            <p class="loginConnect__join-text">
              Al crear una cuenta aceptas nuestros
              <i class="politics" @click="politics(true)">Terminos y condiciones y nuestra Políticas de privacidad</i>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss">
$secondary-color: #f9f9f9;
$border-color: #ccc;
$breakpoint: 768px;
.politics {
  cursor: pointer;
}


.loginConnect {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100vh;
  background-color: $secondary-color;

  &__content {
    height: 100vh;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  &__containerTitle,
  &__formContainer,
  &__form-group,
  &__social,
  &__politict {
    display: flex;
    align-items: center;
  }

  &__containerTitle {
    justify-content: center;
    width: 100%;
    height: 30%;
  }

  &__title {
    margin: 0px;
    font-size: 40px;
    color: $primary-color;
    margin-left: 50px;
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
      border: solid 3px $primary-color;
      color: $primary-color;
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
      cursor: pointer;
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
    justify-content: space-around;
    height: 90%;

    &-info {
      text-align: center;
      margin-top: 10px;
      width: 100%;
    }
    &-link {
      text-decoration: none;
      color: $primary-color;
      cursor: pointer;
    }

    &-text {
      text-align: center;
      font-size: 12px;
      cursor: pointer;
      position: absolute;
      bottom: 6px;
      left: 0;
      right: 0;
      margin: auto;
    }
  }
}
</style>

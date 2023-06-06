<template>
  <div class="loginConnect">
    <div class="loginConnect__containerTitle">
      <h2 class="loginConnect__title">
        <i class="fa fa-heart" aria-hidden="true"></i>
        Connect
      </h2>
    </div>
    <p class="loginConnect__subtitle">Ingresa tu genero</p>
    <div class="loginConnect__formContainer">
      <div class="loginConnect__form-group">
        <button class="loginConnect__form-group__btn">Hombre</button>
      </div>
      <div class="loginConnect__form-group">
        <button class="loginConnect__form-group__btn">Mujer</button>
      </div>
    </div>
    <div class="loginConnect__social">
      <div class="loginConnect__social-icons">
        <button class="loginConnect__social-facebook">
          Iniciar Seccion Con facebook
          <i class="fab fa-facebook-f"></i>
        </button>
        <div class="loginConnect__social-icons">
          <button class="loginConnect__social-google">
            Inicar Seccion Con Google
            <i class="fab fa-google"></i>
          </button>
        </div>
      </div>
    </div>
    <div class="loginConnect__politict">
      <div class="loginConnect__politict-info">
        <p class="loginConnect__politict-text">
          Nunca compartiremos nada sin tu permiso
        </p>
      </div>
      <div class="loginConnect__join">
        <div class="loginConnect__join-info">
          <a
            class="loginConnect__join-link"
            @click="changeView(), $router.push('/join')"
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
function changeView() {}
</script>
<style lang="scss">
$primary-color: #886eea;
$secondary-color: #f9f9f9;
$border-color: #ccc;
$breakpoint: 768px;

.loginConnect {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 97vh;
  background-color: $secondary-color;
  overflow: auto;

  &__containerTitle {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 24%;
  }

  &__title {
    margin: 0px;
    font-size: 40px;
    color: $primary-color;
  }

  &__subtitle {
    font-size: 16px;
    margin-bottom: 30px;
    color: #777;
  }

  &__formContainer {
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    width: 85%;
    padding: 20px;
    border-radius: 10px;
    gap: 20px;
    // background-color: white;
    // box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  }
  &__form-group {
    display: flex;
    justify-content: center;
    width: 100%;

    &__btn {
      width: 92%;
      height: 42px;
      border: solid 3px #886eea;
      color: #886eea;
      border-radius: 30px;
      background-color: #fff;
    }
  }

  &__social {
    display: flex;
    margin-top: 20px;
    width: 100%;

    &-icons {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 100%;
      gap: 15px;
      font-size: 40px;
    }
    &-facebook {
      width: 80%;
      height: 40px;
      color: #fff;
      background-color: #3b5998;
      padding: 10px;
      border-radius: 100px;
      border: none;
    }
    &-google {
      width: 80%;
      height: 40px;
      color: #fff;
      background-color: #000;
      padding: 10px;
      border-radius: 100px;
      border: none;
    }
  }
  &__politict {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 20px;
    width: 100%;
    height: 31%;

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
    width: 100%;
    height: 100%;

    &-info {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      margin-top: 10px;
      width: 100%;
    }
    &-link {
      text-decoration: none;
      color: #886eea;
    }

    &-text {
      text-align: center;
      font-size: 14px;
    }
  }
}
</style>

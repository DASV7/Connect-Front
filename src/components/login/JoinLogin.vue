<template>
  <div class="loginConnect">
    <div class="loginConnect__containerTitle">
      <h2 class="loginConnect__title">VINC</h2>
    </div>

    <div class="joinConnect">
      <h3 class="joinConnect__greeting">!Hola de nuevo¡</h3>
      <p class="joinConnect__greeting-p">
        Ingresa tu correo o numero de telefono
      </p>
    </div>
    <form class="joinConnect__formJoin">
      <div class="joinConnect__formJoin-container">
        <input
          class="joinConnect__formJoin-input"
          type="text"
          placeholder="Correo o numero de celular"
        />
      </div>
      <div class="joinConnect__formJoin-container">
        <input
          class="joinConnect__formJoin-input"
          type="password"
          placeholder="Contraseña"
        />
      </div>
      <div class="joinConnect__formJoin-btn">
        <button  @click="$router.push('/home')" class="joinConnect__formJoin-btnSend">Entrar</button>
      </div>
    </form>
    <div class="joinConnect__types">
      <p class="joinConnect__types-p">¿Olvidaste tu Contraseña?</p>
    </div>
    <div class="joinConnect__joinS">
      <div class="loginConnect__join-info">
        <a
          class="loginConnect__join-link"
          @click="$router.push('/')"
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
</template>

<script setup>
</script>

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
    }
  }
  &__formJoin {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: 25%;
    gap: 5px;

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
      background-color: #886eea;
      color: #fff;
      border-radius: 30px;
      font-weight: 700;
      cursor: pointer;
    }
  }
  &__types {
    text-align: center;

    &-p {
      font-size: 13px;
      color: #886eea;
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
</style>

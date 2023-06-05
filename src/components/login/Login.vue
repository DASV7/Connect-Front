<template>
  <div class="loginConnect">
    <h2 class="loginConnect__title">Iniciar sesión</h2>
    <p class="loginConnect__subtitle">Ingresa tus credenciales para acceder:</p>
    <form class="loginConnect__formContainer">
      <div class="loginConnect__form-group">
        <label for="email" class="loginConnect__form-group__label"
          >Correo electrónico:</label
        >
        <input
          type="email"
          id="email"
          name="email"
          class="loginConnect__form-group__input"
          required
        />
      </div>
      <div class="loginConnect__form-group">
        <label for="password" class="loginConnect__form-group__label"
          >Contraseña:</label
        >
        <input
          type="password"
          id="password"
          name="password"
          class="loginConnect__form-group__input"
          required
        />
      </div>
      <button type="submit" class="loginConnect__button">Iniciar sesión</button>
    </form>
    <div class="loginConnect__social">
      <p class="loginConnect__social-text">O inicia sesión con:</p>
      <div class="loginConnect__social-icons">
        <i class="fab fa-facebook-f"></i>
        <i class="fab fa-twitter"></i>
        <i class="fab fa-google"></i>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
$primary-color: #4051b5;
$secondary-color: #f9f9f9;
$border-color: #ccc;
$breakpoint: 768px;

.loginConnect {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background-color: $secondary-color;

  &__title {
    font-size: 40px;
    margin-bottom: 20px;
    color: $primary-color;
  }

  &__subtitle {
    font-size: 16px;
    margin-bottom: 30px;
    color: #777;
  }

  &__formContainer {
    border: 1px solid $border-color;
    padding: 30px;
    border-radius: 10px;
    background-color: white;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);

    &__form-group {
      position: relative;
      width: 100%;
      display: flex;
      flex-direction: column;

      &__label {
        position: absolute;
        top: -10px;
        left: 15px;
        font-size: 14px;
        color: #999;
        transition: all 0.3s ease-in-out;
        transform-origin: 0 0;
        transform: translateY(0);

        &.active {
          font-size: 12px;
          transform: translateY(-15px);
          color: $primary-color;
        }
      }

      &__input {
        width: 100%;
        height: 50px;
        border: none;
        border-bottom: 2px solid #eee;
        padding: 5px 15px;
        font-size: 16px;

        &:focus {
          outline: none;
          border-color: $primary-color;
        }

        &:focus ~ &__label {
          transform: translateY(-15px);
          font-size: 12px;
          color: $primary-color;
          font-weight: bold;
        }
      }
    }

    &__button {
      margin-top: 20px;
      width: 100%;
      height: 50px;
      color: white;
      background-color: $primary-color;
      border: none;
      border-radius: 10px;
      font-size: 16px;
      font-weight: bold;
      text-transform: uppercase;
      cursor: pointer;
      transition: background-color 0.3s ease-in;

      &:hover {
        background-color: darken($primary-color, 10%);
      }
    }

    &__social {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 20px;
      margin-top: 40px;
      font-size: 16px;
      color: #777;

      &-text {
        font-weight: bold;
        text-transform: uppercase;
      }

      &-icons {
        display: flex;
        gap: 20px;
        font-size: 40px;

        & > i:hover {
          color: $primary-color;
          cursor: pointer;
        }
      }
    }
  }

  @media screen and (min-width: $breakpoint) {
    &__formContainer {
      width: 50%;
      margin-top: 40px;
      animation: fadeInUp 0.5s ease-in-out;
    }
  }
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
}
</style>

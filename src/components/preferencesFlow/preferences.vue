<template>
  <div class="preferens">
    <div class="preferens__container">
      <div class="preferens__img">
        <img
          src="https://firebasestorage.googleapis.com/v0/b/connect-e76fc.appspot.com/o/icons%2FImagen%20de%20WhatsApp%202023-06-10%20a%20las%2013.12.09.jpg?alt=media&token=4137a394-1baa-454b-b219-11a33736c022&_gl=1*u274a9*_ga*MTcyNzMzMzExNS4xNjg1ODkwODY2*_ga_CW55HF8NVT*MTY4NjQxOTM3Mi4xNC4xLjE2ODY0MjA3ODEuMC4wLjA"
          class="preferens__img-link"
        />
      </div>
      <div class="preferens__img-pContainer">
        <p class="preferens__img-p">
          Haz un quiz rapido para completar tu perfil
        </p>
        <p class="information__user-txt">
          Logra un perfil increible en tan solo unos minutos
        </p>
        <div class="preferens__img-btnContainer">
          <button @click="nextView()" class="preferens__img-btn">Empezar Quiz</button>
          <button @click="$router.push('/home')" class="preferens__img-late">Quizas mas tarde</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
function nextView() {

}
</script>

<style lang="scss">
.preferens {
  width: 100vw;
  height: 100vh;
  background-color: #fff;
  z-index: 10;

  &__container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
  }
  &__img {
    width: 100%;

    &-link {
      width: 100%;
    }
    &-p {
      font-size: 20px;
      font-weight: 700;
      text-align: center;
      margin: 0%;
    }
    &-pContainer {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 80%;
    }
    &-btnContainer {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 80%;
    }
    &-btn {
      width: 100%;
      height: 35px;
      background-color: $primary-color;
      color: #fff;
      border: none;
      border-radius: 30px;
      margin-top: 15px;
    }
    &-late {
      border: none;
      background-color: #fff;
      margin-top: 5px;
      font-size: 12px;
      height: 25px;
      color: #999696;
    }
  }
}
</style>

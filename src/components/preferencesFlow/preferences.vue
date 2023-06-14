<template>
  <div class="preferens">
    <div v-if="indexReg == 0" class="preferens__container">
      <div class="preferens__img">
        <img
          src="https://firebasestorage.googleapis.com/v0/b/connect-e76fc.appspot.com/o/icons%2Ffamilia%202.jpg?alt=media&token=0cc79646-0fdf-49fb-a417-c64bd971bcbe&_gl=1*11pwyn3*_ga*MTcyNzMzMzExNS4xNjg1ODkwODY2*_ga_CW55HF8NVT*MTY4NjY3NjQ5OC4xNy4xLjE2ODY2NzY1OTEuMC4wLjA"
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
          <button @click="nextView()" class="preferens__img-btn">
            Empezar Quiz
          </button>
          <button @click="$router.push('/home')" class="preferens__img-late">
            Quizas mas tarde
          </button>
        </div>
      </div>
    </div>
    <div v-if="indexReg == 1" class="preferens__container">
      <div class="preferens__img">
        <img
          class="preferens__img-link"
          src="https://firebasestorage.googleapis.com/v0/b/connect-e76fc.appspot.com/o/icons%2Ffamilia%20.jpg?alt=media&token=af1efa09-1ec7-4dc8-b025-532942ceb69a&_gl=1*5zcs70*_ga*MTcyNzMzMzExNS4xNjg1ODkwODY2*_ga_CW55HF8NVT*MTY4NjY3MjQ4Ni4xNi4xLjE2ODY2NzI2NjkuMC4wLjA"
        />
        <p class="preferens__img-p">¿Cual es tu orientacion sexual?</p>
      </div>
      <div class="container__sexuality">
        <div
          v-for="(item, index) in btnText"
          :key="index"
          class="container__sexuality-buttons"
        >
          <button
            @click="dataSexuality(item.text)"
            class="container__sexuality-btn"
          >
            {{ item.text }}
            <i
              :class="[
                item.active ? 'fa-solid fa-circle' : 'fa-regular fa-circle',
              ]"
            ></i>
          </button>
        </div>
        <div class="container__sexuality-continue">
          <button @click="nextView()" class="container__sexuality-next">
            Continuar
          </button>
        </div>
      </div>
    </div>
    <div v-if="indexReg == 2" class="preferens__container">
      <div class="preferens__img">
        <img
          class="preferens__img-link"
          src="https://firebasestorage.googleapis.com/v0/b/connect-e76fc.appspot.com/o/icons%2F6242766.jpg?alt=media&token=668d5502-01b9-4186-bf11-5c6c9dc48007"
        />
        <p class="preferens__img-p">¿Cuanto mides?</p>
      </div>
      <div class="preferens__height">
        <p>{{ userPreferences.height }} cm</p>
        <input
          class="preferens__height-input"
          type="range"
          min="0"
          max="200"
          v-model="userPreferences.height"
          @input="updateHeight"
        />
      </div>
      
      <div class="container__sexuality-continue">
          <button @click="nextView()" class="container__sexuality-next">
            Continuar
          </button>
        </div>
    </div>
    <div></div>
  </div>
</template>

<script setup>
import { ref } from "vue";

let indexReg = ref(0);
let userPreferences = ref({
  sexuality: "",
  height: "0",
  feelings: "",
  interests: "",
  education: "",
  smoke: "",
  drink: "",
});

let btnText = [
  { text: "Hetero" },
  { text: "Gay" },
  { text: "Bisexual" },
  { text: "Asexual" },
  { text: "Lesbiana" },
  { none: "Prefiero no decirlo" },
];

function dataSexuality(text) {
  userPreferences.sexuality = text;
  userPreferences.active = true;
  console.log(userPreferences.sexuality);
}
function nextView() {
  indexReg.value++;
  console.log(indexReg.value);
}
</script>

<style lang="scss">
* {
  font-family: sans-serif;
}
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
  &__height {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 80%;
    margin-top: 20px;
    margin-bottom: 20px;

    &-input {
      width: 100%;
      height: 1px;
      background-color: $primary-color;
    }
  }
}
.container__sexuality {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;

  &-buttons {
    width: 80%;
    margin-top: 10px;
  }
  &-btn {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 35px;
    padding: 0px 10px 0px 10px;
    border: none;
    border-radius: 30px;
    cursor: pointer;
    font-weight: 600;
  }
  &-continue {
    display: flex;
    justify-content: center;
    margin-top: 20px;
    width: 80%;
  }
  &-next {
    width: 100%;
    height: 35px;
    border: none;
    background-color: $primary-color;
    color: #fff;
    border-radius: 30px;
  }
}
</style>

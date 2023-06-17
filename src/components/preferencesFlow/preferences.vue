<template>
  <div class="preferens">
    <div class="GoBack">
      <button v-if="indexReg < 10 && indexReg > 0" @click="nextView(true)" class="GoBack__btn">
        <i class="fa-solid fa-arrow-left"></i>
      </button>
    </div>
    <div v-if="indexReg == null" class="preferens__container">
      <div class="preferens__img">
        <img
          src="https://firebasestorage.googleapis.com/v0/b/connect-e76fc.appspot.com/o/icons%2Ffamilia%202.jpg?alt=media&token=0cc79646-0fdf-49fb-a417-c64bd971bcbe&_gl=1*11pwyn3*_ga*MTcyNzMzMzExNS4xNjg1ODkwODY2*_ga_CW55HF8NVT*MTY4NjY3NjQ5OC4xNy4xLjE2ODY2NzY1OTEuMC4wLjA"
          class="preferens__img-link"
        />
      </div>
      <div class="preferens__img-pContainer">
        <p class="preferens__img-p">Haz un quiz rapido para completar tu perfil</p>
        <p class="information__user-txt">Logra un perfil increible en tan solo unos minutos</p>
        <div class="preferens__img-btnContainer">
          <button @click="nextView()" class="preferens__img-btn">Empezar Quiz</button>
          <button @click="$router.push('/home')" class="preferens__img-late">Quizas mas tarde</button>
        </div>
      </div>
    </div>
    <div class="preferens__container" v-if="indexReg != null">
      <div class="preferens__img">
        <img class="preferens__img-link" :src="imgViews[indexReg]" />
        <p class="preferens__img-p">{{ titleViews[indexReg] }}</p>
      </div>
      <!-- sexuality-->
      <div class="container__sexuality">
        <div class="container__sexuality" v-if="indexReg == 0">
          <div v-for="(item, index) in btnText" :key="index" class="container__sexuality-buttons">
            <button @click="dataSexuality(item.text)" class="container__sexuality-btn">
              {{ item.text }}
              <div class="btn__circle"></div>
            </button>
          </div>
        </div>

        <div class="preferens__height" v-if="indexReg == 1">
          <p>{{ userPreferences.height }} cm</p>
          <input class="preferens__height-input" type="range" min="0" max="200" v-model="userPreferences.height" @input="updateHeight" />
        </div>
        <!-- heigth -->

        <div class="container__sexuality" v-if="indexReg == 2">
          <div v-for="(item, index) in btnTextsentimental" :key="index" class="container__sexuality-buttons">
            <button @click="dataSexuality(item.text)" class="container__sexuality-btn">
              {{ item.text }}
              <i :class="[item.active ? 'fa-solid fa-circle' : 'fa-regular fa-circle']"></i>
            </button>
          </div>
        </div>

        <div class="container__sexuality" v-if="indexReg == 3">
          <div v-for="(item, index) in btnTextEducation" :key="index" class="container__sexuality-buttons">
            <button @click="dataSexuality(item.text)" class="container__sexuality-btn">
              {{ item.text }}
              <i :class="[item.active ? 'fa-solid fa-circle' : 'fa-regular fa-circle']"></i>
            </button>
          </div>
        </div>
        <div class="container__sexuality" v-if="indexReg == 4">
          <div v-for="(item, index) in btnTextSmoke" :key="index" class="container__sexuality-buttons">
            <button @click="dataSexuality(item.text)" class="container__sexuality-btn">
              {{ item.text }}
              <i :class="[item.active ? 'fa-solid fa-circle' : 'fa-regular fa-circle']"></i>
            </button>
          </div>
        </div>

        <div class="container__sexuality" v-if="indexReg == 5">
          <div v-for="(item, index) in btnTextSmoke" :key="index" class="container__sexuality-buttons">
            <button @click="dataSexuality(item.text)" class="container__sexuality-btn">
              {{ item.text }}
              <i :class="[item.active ? 'fa-solid fa-circle' : 'fa-regular fa-circle']"></i>
            </button>
          </div>
        </div>

        <div class="container__sexuality-continue" v-if="indexReg == 6">
          <button @click="$router.push('/home')" class="container__sexuality-next">Finalizar</button>
        </div>

        <div class="container__sexuality-continue" v-if="indexReg != 6">
          <button @click="nextView()" class="container__sexuality-next">Continuar</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

let indexReg = ref(null);
let userPreferences = ref({
  sexuality: "",
  height: "0",
  feelings: "",
  interests: "",
  education: "",
  smoke: "",
  drink: "",
});

let imgViews = [
  "https://firebasestorage.googleapis.com/v0/b/connect-e76fc.appspot.com/o/icons%2Ffamilia%20.jpg?alt=media&token=af1efa09-1ec7-4dc8-b025-532942ceb69a&_gl=1*5zcs70*_ga*MTcyNzMzMzExNS4xNjg1ODkwODY2*_ga_CW55HF8NVT*MTY4NjY3MjQ4Ni4xNi4xLjE2ODY2NzI2NjkuMC4wLjA",
  "https://firebasestorage.googleapis.com/v0/b/connect-e76fc.appspot.com/o/icons%2F6242766.jpg?alt=media&token=668d5502-01b9-4186-bf11-5c6c9dc48007",
  "https://firebasestorage.googleapis.com/v0/b/connect-e76fc.appspot.com/o/icons%2F3262978.jpg?alt=media&token=0592dce1-6f60-474c-9f4a-94d53ca1c284",
  "https://firebasestorage.googleapis.com/v0/b/connect-e76fc.appspot.com/o/icons%2F2466249.jpg?alt=media&token=57fdb4ee-8650-4ccc-a841-d04ba7816556z",
  "https://firebasestorage.googleapis.com/v0/b/connect-e76fc.appspot.com/o/icons%2F13239.jpg?alt=media&token=6ca137d1-2c45-4be1-b7e1-eb66794fb1a0",
  "https://firebasestorage.googleapis.com/v0/b/connect-e76fc.appspot.com/o/icons%2F7325788.jpg?alt=media&token=6886ee96-7e97-4302-a085-4dbc113b6cc3",
  "https://firebasestorage.googleapis.com/v0/b/connect-e76fc.appspot.com/o/icons%2F3531361.jpg?alt=media&token=602a217f-ba0f-450c-beb8-7caf7955fe56",
];

let titleViews = ["¿Cual es tu orientacion", "¿Cuanto mides?", "¿Y tu situacion sentimental?", "¿Cual es tu nivel educativo?", "¿Fumas?", "¿Tomas?"];

let btnText = [{ text: "Hetero" }, { text: "Gay" }, { text: "Bisexual" }, { text: "Asexual" }, { text: "Lesbiana" }, { text: "Prefiero no decirlo" }];

let btnTextsentimental = [{ text: "Soltero" }, { text: "En relacion" }, { text: "Es complicado" }, { text: "Abierta" }, { text: "Prefiero no decirlo" }];
let btnTextEducation = [{ text: "Bachillerato" }, { text: "Titulo de posgrado" }, { text: "En la universidad" }, { text: "Titulo de pregrado" }, { text: "Prefiero no decirlo" }];
let btnTextSmoke = [{ text: "Si" }, { text: "No" }, { text: "A veces" }, { text: "Nunca" }, { text: "Prefiero no decirlo" }];

function dataSexuality(text) {
  userPreferences.sexuality = text;
  userPreferences.active = true;
  console.log(userPreferences.sexuality);
}
function nextView(i) {
  if (i === undefined) {
    if (indexReg.value == null) indexReg.value = 0;
    else indexReg.value++;
    return;
  }
  indexReg.value--;
}
</script>

<style lang="scss">
* {
  font-family: sans-serif;
}
.btn__circle {
  width: 13px;
  height: 13px;
  border: 1px solid #000;
  border-radius: 100%;
}
.btn__circle:hover {
  background-color: #000;
}

.GoBack {
  position: absolute;
  margin: 10px 0px 0px 10px;

  &__btn {
    border: none;
    background-color: $primary-color;
    width: 45px;
    height: 30px;
    text-align: center;
    color: #fff;
    border-radius: 30px;
  }
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
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;

    &-link {
      width: 90%;
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

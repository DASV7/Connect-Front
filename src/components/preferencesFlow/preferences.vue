<script setup>
import { ref } from "vue";
import axios from "../../api/axios";
let indexReg = ref(null);

let userPreferences = ref({
  sexuality: "",
  height: "0",
  feelings: "",
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

let isButtonDisabled = ref(false);

let backView = ref(undefined);
function dataSexuality(text, value) {
  userPreferences.value[value] = text;

  nextView(text, value);
}
function sendDataBack() {
  axios
    .post("/userPreferences", userPreferences.value)
    .then((response) => {
      console.log(response.data.data);
    })
    .catch((error) => console.error(error));
  console.log(userPreferences.value);
}
function nextView(i, value) {
  // isLoading.value = true;
  if (i == "back") return indexReg.value--;
  if (userPreferences.value[value]) indexReg.value++;
  else {
    const arrayPosition = Object.keys(userPreferences.value);
    const position = arrayPosition[indexReg.value];
    if (userPreferences.value[position]) indexReg.value++;
  }

  setTimeout(() => {
    isLoading.value = false;
  },10);
}
function nextViewFirst() {
  indexReg.value = 0;
}
// let isLoading = ref(false);
</script>

<template>
  <div class="preferens">
    <div class="GoBack">
      <button v-if="indexReg < 10 && indexReg > 0" @click="nextView('back')" class="GoBack__btn">
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
          <button @click="nextViewFirst(true)" class="preferens__img-btn">Empezar Quiz</button>
          <button @click="$router.push('/home')" class="preferens__img-late">Quizas mas tarde</button>
        </div>
      </div>
    </div>
    <div class="preferens__container" v-if="indexReg != null">
      <div v-if="!indexReg" class="GoBack">
        <button v-if="indexReg < 10 && indexReg > 0" @click="nextView('back')" class="GoBack__btn">
          <i class="fa-solid fa-arrow-left"></i>
        </button>
      </div>
      <div class="preferens__img" >
        <p class="preferens__img-p">{{ titleViews[indexReg] }}</p>
        <img  v-show="!isLoading" class="preferens__img-link" :src="imgViews[indexReg]" />
      </div>
      <!-- sexuality-->
      <div class="container__sexuality">
        <div class="container__sexuality" v-if="indexReg == 0">
          <div v-for="(item, index) in btnText" :key="index" class="container__sexuality-buttons">
            <button @click="dataSexuality(item.text, 'sexuality')" :class="userPreferences.sexuality == item.text ? 'container__sexuality-btnSelect' : 'container__sexuality-btn'">
              {{ item.text }}
              <div :class="userPreferences.sexuality == item.text ? 'btn__circle-full' : 'btn__circle'" class=""></div>
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
            <button @click="dataSexuality(item.text, 'feelings')" :class="userPreferences.feelings == item.text ? 'container__sexuality-btnSelect' : 'container__sexuality-btn'">
              {{ item.text }}
              <div :class="userPreferences.feelings == item.text ? 'btn__circle-full' : 'btn__circle'" class=""></div>
            </button>
          </div>
        </div>

        <div class="container__sexuality" v-if="indexReg == 3">
          <div v-for="(item, index) in btnTextEducation" :key="index" class="container__sexuality-buttons">
            <button @click="dataSexuality(item.text, 'education')" :class="userPreferences.education == item.text ? 'container__sexuality-btnSelect' : 'container__sexuality-btn'">
              {{ item.text }}
              <div :class="userPreferences.education == item.text ? 'btn__circle-full' : 'btn__circle'" class=""></div>
            </button>
          </div>
        </div>
        <div class="container__sexuality" v-if="indexReg == 4">
          <div v-for="(item, index) in btnTextSmoke" :key="index" class="container__sexuality-buttons">
            <button @click="dataSexuality(item.text, 'smoke')" :class="userPreferences.smoke == item.text ? 'container__sexuality-btnSelect' : 'container__sexuality-btn'">
              {{ item.text }}
              <div :class="userPreferences.smoke == item.text ? 'btn__circle-full' : 'btn__circle'" class=""></div>
            </button>
          </div>
        </div>

        <div class="container__sexuality" v-if="indexReg == 5">
          <div v-for="(item, index) in btnTextSmoke" :key="index" class="container__sexuality-buttons">
            <button @click="dataSexuality(item.text, 'drink')" :class="userPreferences.drink == item.text ? 'container__sexuality-btnSelect' : 'container__sexuality-btn'">
              {{ item.text }}
              <div :class="userPreferences.drink == item.text ? 'btn__circle-full' : 'btn__circle'" class=""></div>
            </button>
          </div>
        </div>

        <div class="container__sexuality-continue" v-if="indexReg == 6">
          <button @click="$router.push('/home'), sendDataBack()" class="container__sexuality-next">Finalizar</button>
        </div>

        <div class="container__sexuality-continue" v-if="indexReg != 6">
          <button @click="nextView()" class="container__sexuality-next">Continuar</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
* {
  font-family: sans-serif;
}
.preferens__allPage {
  width: 100%;
  height: 100%;
}
.btn__circle,
.btn__circle-full {
  width: 13px;
  height: 13px;
  border: 1px solid #00000058;
  border-radius: 100%;
}
.btn__circle-full {
  background-color: #3c87c0c4;
}

// .btn__circle:hover {
//   background-color: #000;
// }

.GoBack {
  width: 35%;
  position: absolute;
  margin: 10px 0px 0px 10px;
  cursor: pointer;

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
  width: 100%;
  height: 100%;
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
    overflow: hidden;


    &-link {
      // width: 90%;
      max-width: 330px;
      min-width: 150px;
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
      cursor: pointer;
    }

    &-late {
      border: none;
      background-color: #fff;
      margin-top: 5px;
      font-size: 12px;
      height: 25px;
      color: #999696;
      cursor: pointer;
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
  &-btn,
  &-btnSelect {
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
  &-btnSelect {
    border: 2px solid #318dd3;
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
    max-width: 150px;
    cursor: pointer;
  }
}
@media screen and (min-width: 834px) {
  .preferens {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .preferens__container {
    width: 40%;
    height: 95%;
    border-radius: 20px;
    border: 1px solid #999696;
    box-shadow: 0px 5px 15px #999696;
    min-height: 400px;
  }
  .GoBack {
    top: 30px;
  }
  .preferens__img {
    width: 90%;
  }
  .preferens__img-link {
    // width: 65%;
    // width: 70%;
    max-width: 350px;
    object-fit: cover;
  }
}

// @media screen and (max-width: 900px) {
//   .preferens {
//     display: flex;
//     justify-content: center;
//     align-items: center;

//     &__container {
//       height: 60%;
//     }
//   }

// }
</style>

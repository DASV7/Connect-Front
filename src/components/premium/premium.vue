<script setup>
import { ref } from "vue";
import advanges from "../advanges/advanges.vue";

let planPremium = ref([
  {
    month: "1 mes",
    money: "5.999",
  },
  {
    month: "3 mes",
    money: "15.600",
  },
  {
    month: "6 mes",
    money: "30.000",
  },
  {
    month: "12 mes",
    money: "55.000",
  },
]);
let showPay = ref(false);
let monthPay = ref(null);
let moneyPay = ref(null);
const scrollContainer = ref(null);
function payPremium(month, money) {
  showPay.value = !showPay.value;
  monthPay.value = month;
  moneyPay.value = money;
}
function closePay() {
  showPay.value = !showPay.value;
}

// let position = ref({
//   isScrolling: false,
//   startX: 0,
//   scrollLeft: 0,
// });

// function startScroll(event) {
//   console.log("esta");
//   position.value.isScrolling = true;
//   position.value.startX = event.pageX - event.target.offsetLeft;
//   position.value.scrollLeft = event.target.scrollLeft;
//   // console.log(position.value.startX);
// }

// function handleScroll(event) {
//   if (!position.value.isScrolling) return;
//   event.preventDefault();
//   const x = event.pageX - scrollContainer.value.offsetLeft;
//   const walk = (x - position.value.startX) * 3; // Ajusta la velocidad del desplazamiento
//   scrollContainer.value.scrollLeft = position.value.scrollLeft + walk;
// }
// function endScroll() {
//   position.value.isScrolling = false;
// }

</script>

<template>
  <div class="premium" scrollDefault>
    <div v-if="showPay" @click="closePay()" class="premium__fullScreen"></div>
    <div class="premium__container" scrollDefault>
      <!-- Header -->

      <div class="premium__header">
        <button @click="$router.go(-1)" class="premium__header-btnBack"><i class="fa-solid fa-x"></i></button>
        <div class="premium__header-tittle">
          <div>
            <i class="fa fa-star" aria-hidden="true"></i>
          </div>
          <img class="homeConnect__img" src="../../../public/svgLogoComplete.svg" alt="" srcset="" />
        </div>
      </div>

      <!-- texto -->
      <div class="premium__text">
        <p>Es tres veces mas probable que consigas un Match, destacate con Super LIke.</p>
        <span>Selceciona un plan:</span>
      </div>

      <!-- Card Premium -->
      <div
        scrollDefault
        class="premium__card"
        ref="scrollContainer"
        @mousedown="startScroll($event)"
        @mousemove="handleScroll($event)"
        @mouseup="endScroll($event)"
        @mouseleave="endScroll($event)"
      >
        <div v-for="(item, index) in planPremium" :key="index" @click="payPremium(item.month, item.money)" class="premium__card-item">
          <p>{{ item.month }} <i class="fa fa-check" aria-hidden="true"></i></p>
          <span>$ {{ item.money }}, {{ item.month }}</span>
        </div>
      </div>

      <!-- advanges Component -->

      <div class="premium__advanges">
        <advanges class="premium__advanges-component"></advanges>
      </div>

      <!-- on Click  -->
      <div v-if="showPay" class="premium__pay">
        <p class="premium__pay-text">
          Al tocar en continuar, tu pago se cobrara, tu suscripcion se renovara de forma automatica por la misma duracion del paquete al mismo precio hasta que canceles atraves de
          los ajustes de la app, y aceptaras nuestras <a href="">Terminos</a>.
        </p>
        <button class="premium__pay-btn">Continuar - Total $ {{ moneyPay }}</button>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.premium {
  width: 100%;
  height: 100%;
  // padding: 10px;
  overflow-y: scroll;
  background-color: #fff;

  &__fullScreen {
    width: 100vw;
    height: 100vh;
    position: absolute;
  }

  &__container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin: auto;
    gap: 10px;
    width: 100%;
    // height: 100%;
    overflow-y: scroll;
  }

  &__header {
    display: flex;
    height: 60px;

    &-btnBack {
      background-color: transparent;
      border: none;
      font-size: 20px;
      padding-left: 19px;
      cursor: pointer;
    }

    &-tittle {
      display: flex;
      align-items: center;
      margin: auto;
      color: rgb(197, 37, 37);
      // color: $primary-color;
      font-size: 17px;
      gap: 30px;
    }
  }

  &__text {
    margin-top: 20px;
    width: 80%;
    padding-left: 10px;

    span {
      margin-top: 30px;
      font-size: 13px;
      font-weight: 700;
      color: #625f5f;
    }
    p {
      text-align: left;
      font-size: 18px;
      font-family: Arial, Helvetica, sans-serif;
      font-weight: 600;
      // color: rgb(37, 224, 224);
      color: #000;
      margin-bottom: 10px;
    }
  }

  &__card {
    display: flex;
    gap: 10px;
    height: 180px;
    // width: 100%;
    // border: 1px solid #000;
    padding: 10px;
    margin-top: 10px;
    overflow-x: auto;

    &-item {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      width: 230px;
      height: 130px;
      min-width: 230px;
      border: 2px solid #e3e135;
      border-radius: 20px;
      padding: 15px;
      cursor: pointer;

      p {
        display: flex;
        justify-content: space-between;
        font-size: 20px;
        font-weight: 600;

        i {
          color: #e3e135;
        }
      }
      span {
        font-size: 14px;
        font-weight: 700;
      }
    }
  }

  &__advanges {
    display: flex;
    justify-content: center;
    // margin: auto;
    border-top: 2px solid #b8b5b588;
  }

  &__pay {
    display: flex;
    flex-direction: column;
    align-items: center;
    position: absolute;
    bottom: 0;
    width: 93%;
    height: 130px;
    background-color: #fff;
    padding: 10px 10px 20px 10px;
    border-top: 1px solid #96919189;

    &-text {
      text-align: left;
      font-size: 12px;
      font-weight: 500;
      font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
    }
    &-btn {
      width: 250px;
      height: 35px;
      margin-top: 15px;
      border-radius: 20px;
      border: none;
      color: #fff;
      background-color: $primary-color;
      font-size: 15px;
      font-weight: 700;
    }
  }
}
@media screen and (min-width: 500px) {
  * {
    margin: 0%;
  }
  .premium {
    display: flex;
    width: 98%;
    height: 95%;
    margin: auto;
    border-radius: 20px;
    box-shadow: #919090 0px 0px 20px 5px;
    margin-top: 20px;
    // overflow: hidden;

    &__pay {
      width: 50%;
    }
    &__container {
      margin: auto;
      overflow-y: scroll;
    }
  }
}
@media screen and (min-width: 1024px) {
  .premium {
    display: flex;
    width: 50%;
  }
}
</style>

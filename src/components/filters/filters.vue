<script setup>
import { ref } from "vue";

const distance = ref(0);
const age = ref(0);

const updateRange = () => {
  // Obtenemos los valores del input range (rango seleccionado)
  const rangeValues = document.getElementById("km-range").value.split(",");
  // Obtenemos el texto del resultado en vivo
  const resultText = `${rangeValues[0]} km - ${rangeValues[1]} km`;
  // Actualizamos el texto del resultado en vivo
  document.getElementById("range-result").innerText = resultText;
};
</script>

<template>
  <div class="filters">
    <!-- header  -->
    <div class="filters__container">

    <div class="filters__header">
      <button @click="$router.push('/home')" class="filters__header-btnBack">
        <i class="fa-sharp fa-solid fa-arrow-left"> </i>
      </button>
      <p class="filters__header-tittle">Filtros</p>
    </div>

    <!-- men or woman  -->
    <div class="filters__gender">
      <p>Me interesa</p>
      <div class="filters__gender__buttons">
        <button class="filters__gender-btn">Chicos <i class="fa-solid fa-child"></i></button>
        <button class="filters__gender-btn">Chicas <i class="fa-solid fa-person-dress"></i></button>
        <button class="filters__gender-btn">Ambos <i class="fa-solid fa-children"></i></button>
      </div>
    </div>

    <!-- distancia  -->
    <div class="filters__distance">
      <p>Selecciona una distancia:</p>
      <input class="filters__distance-input" type="range" id="km-range" min="0" max="160" step="3" v-model="distance" />
      <span>{{ distance }} km</span>
    </div>

    <!-- Age  -->
    <!-- end age  -->

    <!-- search interest  -->

    <div class="filters__interest">
      <p>Intereses</p>
      <div class="filters__interest-search">
        <input class="filters__interest-input" type="text" placeholder="Buscar" />
        <i class="fa-solid fa-magnifying-glass"></i>
      </div>
    </div>

    <!-- filtros avanzados   -->

    <div class="filters__advanced">

    </div>

  </div>
</div>

</template>

<style lang="scss">
.filters {
  width: 100%;
  height: 100%;

  &__container {
    width: 100%;
    height: 100%;
  }

  &__header {
    display: flex;
    justify-content: space-between;
    width: 100%;
    margin-top: 5px;
    margin-bottom: 15px;

    &-btnBack {
      width: 50px;
      height: 35px;
      border: solid 1px #000;
      background: $primary-color;
      color: #fff;
      border: none;
      border-radius: 20px;
      margin-left: 4px;
      cursor: pointer;
    }
    &-tittle {
      margin-right: 10px;
      font-weight: 700;
    }
  }

  &__gender {
    width: 90%;
    margin: auto;
    margin-bottom: 15px;

    p {
      margin-bottom: 10px;
      font-size: 10px;
    }

    &__buttons {
      display: flex;
      justify-content: space-evenly;
      align-items: center;
      height: 35px;
      // border: solid 2px #000000;
      margin: auto;
      border-radius: 15px;
      padding: 2px;
    }
    &-btn {
      background-color: #fff;
      border: none;
      border: 2px solid $primary-color;
      width: 70px;
      height: 100%;
      border-radius: 10px;
    }
  }

    &__distance {
    display: flex;
    flex-direction: column;
    width: 90%;
    margin: auto;
    margin-bottom: 10px;
    gap: 10px;

    &-input {
      height: 1px;
    }
  }

  &__interest {
    width: 90%;
    margin: auto;

    p {
      margin-bottom:  2px;
    }

    &-search {
      display: flex;
      justify-content: space-between;
      width: 200px;
      border: 1px solid #000;
      padding: 5px;
      border-radius: 10px;
    }
    &-input {
      border: none;
      outline: none;
    }
  }
}
</style>

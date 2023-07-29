<script setup>
import { ref } from "vue";
import toogle from "../toggle/toggle.vue";
const distance = ref(0);
const age = ref(0);

const interest = ref([
  { tittle: "Fumar", name: "smoke", status: false },
  { tittle: "Tomar", name: "drink", status: false },
  { tittle: "Hijos", name: "children", status: false },
  { tittle: "Mascotas", name: "pets", status: false },
  { tittle: "Solter@", name: "single", status: false },
]);

const sendFiltersBack = (index, $event) => {
  interest.value[index].status = $event;
  console.log("HOLA",interest.value);
};
let isActive = ref(false);
let filtersdata = ref({
  interestIn: "",
  distance: "",
  smoke: "",
  drink: "",
  pests: "",
  children: "",
  single: "",
});
</script>

<template>
  <div class="filters">
    <div class="filters__container">
      <!-- header  -->

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
          <button @click="sendFiltersBack('guys')" class="filters__gender-btn">Chicos <i class="fa-solid fa-child"></i></button>
          <button @click="sendFiltersBack('girls')" class="filters__gender-btn">Chicas <i class="fa-solid fa-person-dress"></i></button>
          <button @click="sendFiltersBack('both')" class="filters__gender-btn">Ambos <i class="fa-solid fa-children"></i></button>
        </div>
      </div>

      <!-- distancia  -->
      <div class="filters__distance">
        <p>Selecciona una distancia:</p>
        <input class="filters__distance-input" type="range" id="km-range" min="0" max="160" step="3" v-model="filtersdata.distance" />
        <p>{{ filtersdata.distance }} km</p>
      </div>

      <!-- all the sites -->
      <div class="filters__all">
        <p>Todo el pais</p>
        <button><i class="fa-solid fa-check"></i></button>
        <p>Todo el mundo</p>
        <button><i class="fa-solid fa-check"></i></button>
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
        <p>Filtros avanzados</p>
        <i>Busca lo que realmente quieres</i>

        <div v-for="(item, index) in interest" :key="index" class="filters__advanced-preferences">
          <p>{{ item.tittle }}</p>
          <toogle @toogle="sendFiltersBack(index, $event)" :isActive="item.status"></toogle>
        </div>
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
      font-size: 13px;
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
    margin-top: 20px;

    p {
      margin-bottom: 2px;
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

  &__all {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
    width: 90%;
    margin: auto;

    p {
      font-size: 13px;
    }

    button {
      width: 30px;
      height: 20px;

      &:focus {
        background-color: $primary-color;
        color: #fff;
        border: none;
      }
    }
  }
  &__advanced {
    width: 90%;
    margin: auto;
    margin-top: 10px;

    p {
      font-size: 14px;
    }
    i {
      font-size: 10px;
    }

    &-preferences {
      display: flex;
      justify-content: space-between;
      margin-top: 10px;
      border-bottom: 1px solid #a59e9e;
      padding-bottom: 2px;
    }
  }
}
@media (min-width: 1034px) {
  .filters {
    display: flex;
    align-items: center;
    justify-content: center;

    &__container {
      width: 55%;
      height: 95%;
      box-shadow: #000 0px 5px 10px;
      border-radius: 20px;
    }

    &__distance {
      width: 80%;
      margin-left: 30px;
    }
    &__all {
      justify-content: inherit;
    }
    // &__advanced {
    //   width: 70%;
    //   margin: 0%;
    //   margin-left: 30px;
    // }
  }
  .filters__gender__buttons {
    justify-content: inherit;
    gap: 10px;
  }
}
</style>

<script setup>
import { ref, onMounted } from "vue";
import CardUser from "./cardUserHistories.vue";
import modalBottom from "../shared/modalBottom.vue";
import { useCounterStore } from "../../store/users";

const showModal = ref(false);
const userStore = useCounterStore();
const usersCard = ref([]);
const changeStatusModal = () => {
  showModal.value = !showModal.value;
};
onMounted(() => {
  usersCard.value = [
    userStore.user,
    userStore.user,
    userStore.user,
    userStore.user,
    userStore.user,
    userStore.user,
    userStore.user,
    userStore.user,
    userStore.user,
    userStore.user,
    userStore.user,
    userStore.user,
    userStore.user,
    userStore.user,
    userStore.user,
    userStore.user,
    userStore.user,
    userStore.user,
    userStore.user,
    userStore.user,
    userStore.user,
    userStore.user,
    userStore.user,
    userStore.user,
  ];
});
</script>
<template>
  <section class="historiesView">
    <div class="historiesView__wrapper">
      <img class="historiesView__img" src="../../../public/svgLogoComplete.svg" alt="" srcset="" />
      <div><p>Cuentas que Sigues</p></div>
      <div class="historiesView__header">
        <div class="historiesView__header-fix" @click="changeStatusModal()">
          <i class="fa fa-plus-circle" aria-hidden="true"></i>
        </div>
        <div class="historiesView__header-column" scrollDefault>
          <div class="historiesView__header-item slideInDown" scrollDefault>
            <CardUser v-if="usersCard.length" v-for="(user, index) in usersCard" :key="index" :user="user"></CardUser>
          </div>
        </div>
      </div>
      <div class="historiesView__search"></div>
    </div>
    <modalBottom :showModal="showModal" @changeModal="changeStatusModal()">
      <template v-slot:content>
        <form>
          <div class="creationHistories">
            <div class="creationHistories__multimedia">
              <p>¡Sube una imagen y comparte cómo te sientes con el mundo!</p>
              <label class="creationHistories__multimedia-label" for="multimedia"><i class="fa fa-plus" aria-hidden="true"></i> </label>
              <input v-show="false" type="file" id="multimedia" multiple="false" />

              <label for="description"> Agrega una breve descripcion :</label>
              <u>No se pemiten mensajes ofensivos o inapropiados</u>
              <input name="description" type="text" id="description" />
            </div>
            <div class="creationHistories__status">
              <label for="description"> Estado de animo :</label>
              <div class="creationHistories__status-item" scrollDefault>
                <span>😊 Alegre</span>
                <span>😭 triste</span>
                <span>🥶 Con frio</span>
                <span>🌞 Con Calor</span>
                <span>🥺 Preguntame </span>
              </div>
            </div>
          </div>
        </form>
      </template>
    </modalBottom>
  </section>
</template>
<style lang="scss">
.historiesView {
  width: 100%;
  height: 100%;

  &__wrapper {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;
  }

  &__img {
    width: 98px;
    height: 25px;
    margin-top: 5px;
  }
  &__header {
    display: flex;
    gap: 5px;
    width: 90%;
    background-color: #009eff47;
    border-radius: 10px;
    padding: 5px;

    &-column {
      display: flex;
      flex-direction: column;
      margin-left: 60px;
      overflow-x: auto;
    }

    &-fix {
      display: flex;
      align-items: center;
      justify-content: center;
      position: fixed;
      border-radius: 50%;
      border: 10px;
      width: 50px;
      height: 50px;
      border: 1px solid #000;
      font-size: 50px;
      margin-top: 2px;
      cursor: pointer;
    }
    &-item {
      width: 100%;
      display: flex;
      gap: 10px;
      padding: 2px;
    }
  }
}

.creationHistories {
  width: 100%;
  display: flex;
  flex-direction: column;

  &__multimedia {
    display: flex;
    flex-direction: column;
    gap: 10px;

    &-label {
      width: 40px;
      height: 40px;
      border-radius: 10px;
      border: 1px solid #000;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 800;
      cursor: pointer;
    }
  }
  &__status {
    display: flex;
    flex-direction: column;
    width: 100%;

    gap: 10px;
    &-item {
      overflow-x: auto;
      overflow-y: hidden;
      display: flex;
      gap: 10px;
      span {
        border: 1px solid $primary-color;
        padding: 5px;
        min-width: 120px;
        height: 20px;
        border-radius: 10px;
        cursor: pointer;
        width: auto;
        gap: 10px;
        display: flex;
        flex-wrap: nowrap;
      }
    }
  }
}
</style>

<script setup>
import connect from "./connect.vue";
import axios from "../../api/axios";
import { onMounted, ref } from "vue";

const isLoading = ref(false);
const users = ref([]);

const getListUsers = async () => {
  isLoading.value = true;
  const response = await axios.post("/connect");
  users.value = response.data;
  isLoading.value = false;
};

onMounted(() => {
  getListUsers();
});
</script>

<template>
  <div class="homeConnect">
    <div class="homeConnect__header">
      <p>Encuentros</p>
      <img
        class="homeConnect__img"
        src="../../../public/svgLogoComplete.svg"
        alt=""
        srcset=""
      />
      <div class="homeConnect__header-icons">
        <i class="fa fa-undo" aria-hidden="true"></i>
        <i class="fa fa-sliders" aria-hidden="true"></i>
      </div>
    </div>

    <div class="homeConnect__container">
      <div class="homeConnect__component">
        <connect v-if="!isLoading" :user="users[0]" />
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.homeConnect {
  &__img {
    width: 90px;
  }
  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 10px;
    font-size: 20px;
    font-weight: bold;
    margin-top: -15px;
    &-icons {
      display: flex;
      gap: 10px;
    }
  }

  &__container {
    display: flex;
    justify-content: center;
    overflow: hidden;
    position: relative;
  }

  &__component {
    width: 100%;
    border-radius: 10px 10px 0px 0px;
    width: 94%;
  }
}
</style>

<script setup>
const interest = [
  { name: "#Reir", icon: "" },
  { name: "#Frutas", icon: "" },
  { name: "#Dormir", icon: "" },
  { name: "#Leer", icon: "" },
  { name: "#Video Juegos", icon: "" },
];
</script>

<template>
  <div class="interesti1ngIn__InfoUser">
    <p class="interestingIn__InfoUser-tittle">Mis intereses</p>

    <p
      class="interestingIn__InfoUser-preferences"
      v-for="(item, index) in interest"
      :key="index"
    >
      <i :class="item.icon"></i>
      {{ item.name }}
    </p>
  </div>
</template>

<style lang="scss">
.interestingIn {
  display: flex;
  
  &__InfoUser {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 5px;
    margin-top: 20px;

    &-preferences {
      background-color: #e7dfdf;
      font-size: 13px;
      border-radius: 30px;
      padding: 4px;
      margin: 0%;
    }
    &-tittle {
      font-size: 10px;
      color: $primary-color;
    }
  }
}
</style>

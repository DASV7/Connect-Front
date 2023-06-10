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
  <div class="interesti1ngIn">
    <p class="interestingIn__tittle">Mis intereses</p>
    <div class="interestingIn__preferences">
      <div
        class="interestingIn__preferences-item"
        v-for="(item, index) in interest"
        :key="index"
      >
        <i :class="item.icon"></i>
        {{ item.name }}
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.interestingIn {
  gap: 5px;
  margin-top: 20px;

  &__preferences {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    font-size: 13px;
    gap: 5px;
    &-item {
      border-radius: 100px;
      padding: 5px;
      background-color: #e7dfdf;
    }
  }
  &__tittle {
    font-size: 10px;
    color: $primary-color;
  }
}
</style>

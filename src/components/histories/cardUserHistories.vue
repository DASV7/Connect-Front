<script setup>
import { ref, defineProps } from "vue";
import avatarUser from "../shared/avatarUser.vue";
const props = defineProps(["user"]);
const ejecutaBien = () => {};
</script>
<template>
  <section class="cardHistories" v-if="props.user">
    <avatarUser @openProfile="ejecutaBien()" :user="props.user" :size="50"></avatarUser>
  </section>
</template>
<style lang="scss">
.cardHistories {
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  border: 10px;
  width: 50px;
  height: 50px;
  border: 1px solid #000;
  font-size: 20px;

  &__cardHistories {
    width: 100%;
    height: 100%;
  }
}
</style>

<style lang="scss">
.alertNoti {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  &__container {
  }
}
</style>
<template>
  <div class="alertNoti">
    <div class="alertNoti__container"></div>
  </div>
</template>

<script setup>
import notifyEvents from "../../utils/events/customEvents";
const props = defineProps(["type", "title", "message", "img"]);

const myEmitter = new notifyEvents();

myEmitter.on("newNotification", (data) => {
  console.log("Evento personalizado recibido:", data);
});
</script>

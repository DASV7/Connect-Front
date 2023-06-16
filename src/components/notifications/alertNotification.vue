<script setup>
import notifyEvents from "../../utils/events/customEvents";
import Avatar from "../shared/avatarUser.vue";
import { ref, onMounted } from "vue";
import { useCounterStore } from "../../store/users";

const myEmitter = new notifyEvents();
const notification = ref(null);
const userStore = useCounterStore();
const user = ref(null);
const widthPercentage = ref(100);


const restarPorcentaje = (time, inter) => {
  let porcentaje = 100;
  const duracion = time;
  const intervalo = inter;
  const paso = (porcentaje / duracion) * intervalo;
  const temporizador = setInterval(() => {
    porcentaje -= paso;
    porcentaje = Math.max(porcentaje, 0);
    widthPercentage.value = porcentaje;
    if (porcentaje <= 0) {
      clearInterval(temporizador);
      console.log("¡Resta completada!");
    }
  }, intervalo);
};

onMounted(() => {
  myEmitter.on("newNotification", (data) => {  
    
    notification.value = data.notification;
    user.value = data.user;    
    restarPorcentaje(5000, 50);
    setTimeout(() => {
      notification.value = null;
    }, 5000);
  });
});
</script>

<template>
  <div class="alertNoti" v-if="notification">
    <div class="alertNoti__container">
      <div class="alertNoti__img">
        <Avatar :user="user" />
      </div>
      <div class="alertNoti__noti">
        <p>{{ notification.title }}</p>
        <p>{{ notification.message }}</p>
      </div>
    </div>
    <div class="alertNoti__restar" :style="`width: ${widthPercentage}%`"></div>
  </div>
</template>

<style lang="scss">
.alertNoti {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 11;
  &__container {
    display: flex;
    overflow: hidden;
    height: 55px;
    margin-top: 10px;
    margin-right: 10px;
    margin-left: 10px;
    border-radius: 10px 10px 0 0;
    gap: 5px;
    border: 1px solid gray;
    border-bottom: none;
    background-color: rgb(255, 255, 255);
  }
  &__restar {
    height: 5px;
    margin: 0 10px;
    background-color: greenyellow;
  }
}
</style>
-

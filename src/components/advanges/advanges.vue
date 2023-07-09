<script setup>
const advantages = [
  {
    icon: "fa fa-heart",
    txt: "Descubre a quien le gustas",
    checkOn: "fa fa-check",
    checkOff: "fa fa-check-square-o",
  },
  {
    icon: "fa fa-commenting",
    txt: "Desbloquea 2 chats cada semana sin match",
    checkOn: "fa fa-check",
    checkOff: "fa fa-check-square-o",
  },
  {
    icon: "fa fa-bolt",
    txt: "1 Vizualizacion extra cada semana",
    checkOn: "fa fa-check",
    checkOff: "fa fa-check-square-o",
  },
  {
    icon: "fa-solid fa-check-double",
    txt: "Ver mesajes leidos",
    checkOn: "fa fa-check",
    checkOff: "fa fa-check-square-o",
  },
  {
    icon: "fa fa-arrow-circle-up",
    txt: "Dar prioridad a tus mensajes",
    checkOn: "fa fa-check",
    checkOff: "fa fa-check-square-o",
  },
  {
    icon: "fa-solid fa-bars",
    txt: "Nunca te quedas sin votos",
    checkOn: "fa fa-check",
    checkOff: "fa fa-check-square-o",
  },
  {
    icon: "fa-solid fa-rotate-left",
    txt: "Anula tus votos a la izquierda",
    checkOn: "fa fa-check",
    checkOff: "fa fa-check-square-o",
  },
  {
    icon: "fa-solid fa-sliders",
    txt: "Filtros sin limites",
    checkOn: "fa fa-check",
    checkOff: "fa fa-check-square-o",
  },
  {
    icon: "fa-solid fa-user-ninja",
    txt: "Vista de perfiles sin que te vean",
    checkOn: "fa fa-check",
    checkOff: "fa fa-check-square-o",
  },
  {
    icon: "fa-solid fa-ban",
    txt: "Nunca te quedas sin votos",
    checkOn: "fa fa-check",
    checkOff: "fa fa-check-square-o",
  },
  {
    icon: "fa-solid fa-bars",
    txt: "Elimina toda la publicidad",
    checkOn: "fa fa-check",
    checkOff: "fa fa-check-square-o",
  },
];
</script>
<template>
  <div class="infoPremium__advantages">
    <div class="infoPremium__advantages-target" v-for="(item, index) in advantages" :key="index">
      <div class="infoPremium__advantages-cont">
        <i :class="item.icon" aria-hidden="true"></i>
        <p class="infoPremium__advantages-txt">{{ item.txt }}</p>
      </div>
      <div class="infoPremium__advantages-cont2">
        <i :class="item.checkOn" aria-hidden="true"></i>
        <i :class="item.checkOff" aria-hidden="true"></i>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.infoPremium {

&__advantages {
    display: flex;
    flex-direction: column;
    gap: 5px;
    gap: 10px;
    width: 80%;
    margin-top: 15px;
    max-width: 480px;
    
  
    &-cont {
      color:  #999724;
  }
    &-cont2 {
      color:  #999724;
  }
    &-target {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 10px;
      width: 100%;
      max-width: 600px;
      height: 30px;
      border-bottom: solid 1px #d0cece;
      margin: auto;
      // color: #50bded;
    }
    &-cont {
      display: flex;
      align-items: center;
      gap: 10px;
    }
    &-cont2 {
      display: flex;
      gap: 15px;
    }
    &-txt {
      color: #000;
      font-size: 12px;
      font-weight: 400;
    }
  }
}
</style>

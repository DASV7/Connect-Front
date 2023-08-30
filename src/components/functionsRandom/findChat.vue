<script setup>
import { onMounted, ref } from "vue";

const imgages = [
  "https://th.bing.com/th/id/R.5c264d9467c4f393cb26e2eb7f1d155e?rik=SnUEANb9rdOtuw&pid=ImgRaw&r=0",
  "https://th.bing.com/th/id/R.fbb835205430d23632d27207b7686031?rik=2nt940GbRAov8g&riu=http%3a%2f%2fwww.elcomercio.es%2felcomercio%2fmultimedia%2f201403%2f21%2fmedia%2f1Adriana-Lima.jpg&ehk=j1jippQFHS%2bi18vwMvKYODGFXqSifiXtKFVaxysPCYk%3d&risl=&pid=ImgRaw&r=0",
  "https://th.bing.com/th/id/OIP.CS8knRaTFbRmtDhR7THZowHaEg?pid=ImgDet&rs=1",
  "https://th.bing.com/th/id/R.3fdf907c3c08f55162b4d3c004ced86c?rik=s7bpqHHXGKYaAA&riu=http%3a%2f%2fk41.kn3.net%2ftaringa%2f7%2f7%2f5%2f9%2f0%2f3%2f2%2fpaulcanalla10%2f657.jpg%3f1793&ehk=8SV8y166SSzXCl3ixlRwO1FowDzhumUVgBMDnaEWq1U%3d&risl=&pid=ImgRaw&r=0",
  "https://wallpapercave.com/wp/wp3294537.jpg",
  "https://i.pinimg.com/originals/c1/54/01/c154015f0176b84b7ac0ca16c84f5b25.jpg",
  "https://th.bing.com/th/id/R.651d77eae74ea40f97bdf94d2d9af0a3?rik=PUJg%2f9ox71oRkQ&pid=ImgRaw&r=0",
];

const imgActual = ref(imgages[1]);

onMounted(() => {
  setInterval(() => {
    imgActual.value = imgages[Math.floor(Math.random() * imgages.length)];
  }, 3000);
});

const props = defineProps(["showFind"]);
</script>

<template>
  <div class="findView" v-if="props.showFind">
    <!-- <img :src="imgActual" class="findView__img" /> -->
    <div class="findView__wrapper">
      <div class="findView__findAction">
        <div class="findView__find">
          <div class="findView__findAction-zoom circle-animation">
            <i class="fa fa-search" aria-hidden="true"></i>
          </div>
          <p>Buscando...</p>
          <div class="findView__findAction-text">
            <i class="fa fa-exclamation-circle" aria-hidden="true"></i>

            No se permite el acoso o intimidacion de ninguna indole
          </div>
        </div>
      </div>
    </div>
    <div class="findView__img"></div>
  </div>
</template>

<style lang="scss">
.findView {
  width: 100%;
  height: 100%;
  display: flex;
  overflow: hidden;
  justify-content: center;
  font-weight: bold;
  color: white;
  overflow: hidden;

  background-image: url("../../assets/img/fondomorado.jpg");
  background-size: cover;
  background-repeat: no-repeat;

  &__img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 92%;
    width: 100%;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center center;
    object-fit: cover;
    filter: blur(5px);
    z-index: -10;
  }

  p {
    margin-top: -90px;
  }
  &__wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    z-index: 2;
    // padding-bottom: 20px;
    max-width: 537px;
    // height: 100%;
  }
  &__find {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  &__findAction {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 80%;
    height: 25%;
    max-width: 800px;
    bottom: 0;
    padding: 5px;
    // border: #24d224 solid 2px;
    max-height: 400px;
    min-height: 125px;
    border-radius: 30px;

    background-color: #5c1b6cb7;
    // box-shadow: 5px 5px 5px 15px rgba(92, 27, 108, 0.557);

    &-zoom {
      border: 3px solid #ffffff99;
      text-align: center;
      border-radius: 50%;
      width: 60px;
      height: 60px;
      overflow: hidden;
      font-size: 40px;
      background-color: #683475ae;
      position: absolute;
      top: -150px;

      @media (max-width: 1300px) {
        top: -100px;
      }
    }
    &-text {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 0 15px;
      text-align: left;
      gap: 10px;
      background-color: rgba(0, 0, 0, 0.288);
      border-radius: 10px;
      height: 60px;
       
      i {
        font-size: 25px;
        color: rgb(173, 20, 20);
        // background-color: white;
        border-radius: 50%;
      }
    }
  }
}

.circle-animation {
  position: relative;
  animation: rotate 4s linear infinite;
  overflow: hidden;

  i {
    font-size: 25px;
  }
}

@keyframes rotate {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>

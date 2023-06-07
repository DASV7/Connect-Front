<script>
import { defineComponent } from "vue";
import { Carousel, Slide } from "vue3-carousel";
import "vue3-carousel/dist/carousel.css";
import MenuHome from "../menu/menu.vue";

export default defineComponent({
  name: "ExamplePagination",
  components: {
    Carousel,
    Slide,
    MenuHome,
  },
  data: () => ({
    imgsUser: [
      "https://cdn0.ecologiaverde.com/es/posts/5/9/2/que_son_los_biomas_tipos_y_ejemplos_2295_600.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/9/98/Vegetation-spanish.png",
      "https://cobcm.net/wp-content/uploadssite3/sites/3/2020/12/flower-887443_1920-742x412.jpg",
    ],
    settings: {
      itemsToShow: 1,
      snapAlign: "center",
      infinity: true,
    },
    breakpoints: {
      700: {
        itemsToShow: 3.5,
        snapAlign: "center",
      },
      1024: {
        itemsToShow: 5,
        snapAlign: "start",
      },
    },
  }),
});
</script>
<template>
  <div class="homeVinc">
    <div class="homeVinc__containertittle">
      <p class="homeVinc__containertittle-p">Conexiones</p>
      <p class="homeVinc__containertittle-text">
        ¡Haz Match! ¿Quién sabe a dónde podrías llegar?
      </p>
    </div>
    <Carousel v-bind="settings" :breakpoints="breakpoints">
      <Slide v-for="img of imgsUser" :key="img">
        <div class="carousel__item">
          <img class="carouserl__item-img" :src="img" alt="imgUser" />
        </div>
      </Slide>
    </Carousel>
    <MenuHome> </MenuHome>
  </div>
</template>

<style lang="scss">
* {
  font-family: sans-serif;
}
.homeVinc {
  width: 87%;
  height: 94vh;
  padding: 40px 20px 0px 20px;
  &__containertittle {
    width: 100%;
    &-p {
      font-weight: 700;
      margin: 0% 0px 10px 0px;
    }
    &-text {
      margin: 0%;
      font-size: 10px;
      font-weight: 800;
    }
  }
}
.carousel__item {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;

  &-img {
    display: flex;
    width: 100%;
    height: 100%;
  }
}

.menu {
  display: flex;
  justify-content: space-between;
  z-index: 1;
  width: 100%;
  height: 10%;
  position: fixed;
  margin-top: 15px;
  left: -1px;
  border-top: 1px solid #000;

  &__container {
    width: 100%;
    &-btn {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 73%;
      padding: 0%;
      background-color: #f9f9f9;
      color: #886eea;
      border: none;
      font-size: 20px;
    }
  }
}

.carousel * {
  display: flex;
  // flex-direction: column;
  width: 100%;
  height: 100%;
  border-radius: 20px;
}
.carousel {
  height: 83%;
}
.carousel__viewport {
  height: 100%;
}
.carousel__slide {
  height: 100%;
}
.carousel__track {
  height: 100%;
}
</style>

<script>
import { defineComponent } from "vue";
import { Carousel, Slide } from "vue3-carousel";
import "vue3-carousel/dist/carousel.css";
export default defineComponent({
  name: "ExamplePagination",
  components: {
    Carousel,
    Slide,    
  },
  data: () => ({
    imgsUser: [
      "data:image/jpeg;base64,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",
      "https://th.bing.com/th/id/OIP.kwVLESGkY1umyMj2JyQL5wHaNK?pid=ImgDet&rs=1",
      "https://thumbs.dreamstime.com/b/fairy-glen-autumn-valley-strange-stone-structures-isle-skye-scotland-84421989.jpg",
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
    <div class="homeVinc__information">
      <div class="homeVinc__info">
        <p class="homeVinc__info-txt">USER esta aqui para...</p>     
        <div class="homeVinc__info-state">

        </div>
      </div>
    </div>
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
  &__information {
    height: 100%;
  }
  &__info-txt {
    font-size: 12px;
    font-weight: 700;
  }
  &__info-state {
    
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

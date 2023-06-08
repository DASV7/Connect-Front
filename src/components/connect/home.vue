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
  methods: {
    closeSesion() {
      localStorage.clear();
      this.$router.push("/");
    },
  },
  data: () => ({
    imgsUser: [
      "https://images.unsplash.com/photo-1526512340740-9217d0159da9?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8dmVydGljYWx8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80",
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
    buttonsActions: [
      { text: "Ignorar", icon: "fa fa-times-circle" },
      { text: "Mensaje", icon: "fa fa-paper-plane" },
      { text: "Like", icon: "fa fa-heart-o" },
    ],
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
    <div class="homeVinc__buttonsAction">
      <button
        class="homeVinc__buttonsAction-button"
        v-for="(item, index) of buttonsActions"
        :key="index"
      >
        <i class="homeVinc__buttonsAction-icon" :class="item.icon"></i>
      </button>
      <button class="homeVinc__buttonsAction-button" @click="closeSesion()">
        <i class="fa fa-sign-out" aria-hidden="true"></i>
      </button>
    </div>
  </div>
</template>

<style lang="scss">
* {
  font-family: sans-serif;
}

.homeVinc {
  width: 100%;
  height: 94vh;
  overflow-y: scroll;
  overflow-y: hidden;

  &__buttonsAction {
    position: fixed;
    display: flex;
    justify-content: center;
    cursor: pointer;
    gap: 5px;
    z-index: 100;
    bottom: 60px;
    width: 100%;

    &-button {
      background-color: #f9f9f9;
      border: 1px solid #886eea;
      color: #886eea;
      height: 40px;
      width: 40px;
      border-radius: 50%;
    }
  }

  &__containertittle {
    width: 100%;
    padding: 10px;

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
  padding: 10px;
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

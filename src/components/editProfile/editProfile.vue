<script setup>
let imgProfile = ["https://firebasestorage.googleapis.com/v0/b/connect-e76fc.appspot.com/o/icons%2F2466249.jpg?alt=media&token=57fdb4ee-8650-4ccc-a841-d04ba7816556z"];
</script>
<template>
  <div class="editProfile">
    <div class="editProfile__top">
      <button class="editProfile__top-btn" @click="$router.push('/profile')"><i class="fa-solid fa-arrow-left"></i></button>
      <p class="editProfile__top-tittle">Edita perfil tu perfil</p>
    </div>
    <div class="editProfile__album">
      <div class="editProfile__album-first">
        <div class="">
          <img class="editProfile__album-firstImg" :src="imgProfile[0]" />
        </div>
        <div class="editProfile__album-third">
          <div class="editProfile__album-containerThird">
            <img class="editProfile__album-thirdImg" :src="imgProfile[0]" />
          </div>
          <div class="editProfile__album-containerThird">
            <img class="editProfile__album-thirdImg" :src="imgProfile[0]" />
          </div>
        </div>
      </div>
      <div class="editProfile__album-second">
        <div class="editProfile__album-containerThird">
          <img class="editProfile__album-secondImg" :src="imgProfile[0]" />
        </div>
        <div class="editProfile__album-containerThird">
          <img class="editProfile__album-secondImg" :src="imgProfile[0]" alt="" />
        </div>
        <div class="editProfile__album-containerThird">
          <img class="editProfile__album-secondImg" :src="imgProfile[0]" alt="" />
        </div>
      </div>
    </div>
    <div class="editProfile__btn">
      <button class="editProfile__btn-add">Añadir Fotos</button>
    </div>
    <div class="editProfile__info">
      <div class="editProfile__tags"></div>
      <div class="editProfile__tags"></div>
      <div class="editProfile__tags"></div>
      <div class="editProfile__tags"></div>
    </div>
  </div>
</template>

<style lang="scss">
.editProfile {
  width: 100%;
  height: 100vh;

  &__album {
    display: flex;
    width: 99%;
    height: 50%;
    &-second {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      width: 30%;
      height: 100%;
    }
    &-first {
      width: 70%;
      height: 60%;
      max-width: 300px;
      //   height: 300px;
      max-height: 221px;
    }
    &-third {
      display: flex;
      justify-content: center;
      width: 100%;
      height: 48%;
    }
    &-thirdImg {
      width: 100%;
      height: 100%;
    }
    &-containerThird {
      height: 100%;
    }
    &-secondImg {
      width: 100%;
      height: 100%;
    }
    &-firstImg {
      width: 100%;
      height: 100%;
      max-height: 221px;
    }
  }
  &__btn {
    display: flex;
    justify-content: center;
    margin-top: 10px;
    &-add {
      width: 70%;
      height: 35px;
      border: none;
      background-color: $primary-color;
      color: #fff;
      border-radius: 30px;
    }
  }
  &__info {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    margin-top: 5px;
  }
  &__tags {
    width: 97%;
    border-radius: 10px;
    height: 45px;
    background-color: #ece5e5;
  }
  &__top {
    display: flex;
    // align-items: center;
    justify-content: space-between;
    padding: 5px;
    width: 96%;

    &-btn {
      border: none;
      background-color: $primary-color;
      width: 45px;
      height: 30px;
      text-align: center;
      color: #fff;
      border-radius: 30px;
    }
    &-tittle {
      font-size: 13px;
      font-weight: 700;
      color: #bfbaba;
    }
  }
}
</style>

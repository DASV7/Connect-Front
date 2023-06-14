<script setup>
import { onMounted, ref } from "vue";
import axios from "../../api/axios.js";

const usersLike = ref([]);

onMounted(async () => {
  await axios.get("/viewlikes").then((res) => {
    usersLike.value = res.data;
  });
});
</script>
<template>
  <div class="whoLikesMe">
    <div class="whoLikesMe__container">
      <div
        class="whoLikesMe__user"
        v-for="(user, index) in usersLike"
        :key="index"
      >
        <div class="whoLikesMe__user-img">
          <img
            class="whoLikesMe__user-img"
            :src="user.pictures[0].url"
            alt=""
          />
        </div>
        <p class="whoLikesMe__user-name">
          {{ user.name }}
        </p>

        <div class="whoLikesMe__user-actions">
          <button class="whoLikesMe__user-btn">
            <i class="fa fa-times" aria-hidden="true"></i>
          </button>
          <button class="whoLikesMe__user-btn">
            <i class="fa fa-heart"></i>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.whoLikesMe {
  padding: 10px;

  &__container {
    display: flex;
    flex-wrap: wrap;
    gap: 5px;
  }

  &__user {
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: hidden;
    border: 1px solid rgba(0, 0, 0, 0.3411764706);
    border-radius: 10px;
    width: 149px;
    height: 159px;
    &-img {
      width: 100%;
      height: 110px;
    }
    &-name {
      max-width: 160px;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
    }
    &-actions {
      display: flex;
      gap: 10px;
    }
    &-btn {
      border: 1px solid #bababa;
      border-radius: 50%;
      background-color: transparent;
      cursor: pointer;
      outline: none;
      font-size: 20px;
      color: $primary-color;
      .fa-times {
        color: red;
      }
    }
  }
}
</style>

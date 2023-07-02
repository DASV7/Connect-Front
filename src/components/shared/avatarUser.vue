<script setup>
import { ref, computed } from "vue";


const isLoading = ref(false);

const props = defineProps(["user", "size", "openCardProfile"]);

const isShow = computed(() => {
  if (props.user?.pictures[0]?.url && isLoading.value) return true;
  return false;
});

const returnPick = () => {
  return props.user.pictures.length > 0 ? props.user.pictures[0].url : "";
};
</script>
<template>
  <div class="globalAvatar" v-if="props.user.pictures" :style="`width: ${props.size}px; height: ${props.size}px`">
    <img @click="openCardProfile()" :src="returnPick(props.user)" :alt="user?.name" v-show="isShow" @load="isLoading = true" />
    <span v-if="!isShow" fcenter>{{ props.user?.name?.substring(0, 1) }}</span>
  </div>
</template>

<style lang="scss">
.globalAvatar {
  @include Row();
  border-radius: 50%;
  overflow: hidden;
  background-color: #6c757d;
  position: relative;

  text-align: center;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    animation: fadeIn 0.5s ease-in-out;
  }
  span {
    font-weight: bold;
    color: white;
    text-transform: uppercase;
  }
}
</style>

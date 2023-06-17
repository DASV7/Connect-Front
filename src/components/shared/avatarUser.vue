<script setup>
import { computed } from "@vue/reactivity";
import { ref } from "vue";
const props = defineProps(["user", "size"]);
const isLoading = ref(false);

const isShow = computed(() => {
  if (!props.user?.pictures[0]) return true;
  if (!isLoading.value) return true;
  return false;
});

const avatar = () => {
  if (props.user.value && props.user.value?.name)
    return props.user.value?.name?.substring(0, 1);
  return "";
};
</script>
<template>
  <div
    class="globalAvatar"
    v-if="props.user"
    :style="`width: ${props.size}px; height: ${props.size}px`"
  >
    <img
      :src="props.user.pictures[0].url"
      :alt="user?.name"
      v-if="user?.pictures"
      v-show="isLoading"
      @load="isLoading = true"
    />
    <span v-if="isShow" fcenter>{{ avatar }}</span>
  </div>
</template>

<style lang="scss">
.globalAvatar {
  @include Row();
  border-radius: 50%;
  overflow: hidden;
  background-color: #6c757d;
  position: relative;  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    animation: fadeIn 0.5s ease-in-out;
  }
  span {
    width: 100%;
    height: 100%;
    color: white;
    text-transform: uppercase;
  }
}
</style>

<script setup>
import findChat from "./findChat.vue";
import { onMounted, ref, onBeforeUnmount } from "vue";
import { useSocketStore } from "../../../src/store/socketStore";

const socket = useSocketStore();

const isFind = ref(true);
onMounted(() => {
  socket.socket.on("chatRamdom", (user) => {
    console.log(user);
  });
});
</script>
<template>
  <div class="chatRamdom">
    <div class="chatRamdom__find">
      <findChat :showFind="isFind"></findChat>
    </div>
  </div>
</template>
<style lang="scss">
.chatRamdom {
  height: 100%;
  width: 100%;
  overflow: hidden;
  &__find {
    height: 100%;
    width: 100%;
  }
}
</style>

<script setup>
import findChat from "./findChat.vue";
import { onMounted, ref, onBeforeUnmount } from "vue";
import { useSocketStore } from "../../../src/store/socketStore";
import { useCounterStore } from "../../../src/store/users";


const socket = useSocketStore();
const userStore = useCounterStore();

const isFind = ref(true);
onMounted(() => {
  socket.socket.on("chatRandom/start", (user) => {
    console.log(user);
  });
  socket.socket.emit("chatRandom/start", {
    _id: userStore.user._id,
  });
});
onBeforeUnmount(() => {  
  socket.socket.off("chatRandom/start");
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

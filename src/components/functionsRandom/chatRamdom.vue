<script setup>
import findChat from "./findChat.vue";
import { onMounted, ref, onBeforeUnmount, watch } from "vue";
import { useCounterStore } from "../../../src/store/users";
import { useRouter } from "vue-router";
import { state, socket } from "../../socket/socket";

const userStore = useCounterStore();
const router = useRouter();

const isFind = ref(true);
onMounted(() => {
  if (state.connected) {
    socket.on("chatRandom/start", (idConversation) => {
      router.push(`/messages/${idConversation._id}`);
    });
    socket.emit("chatRandom/start", {
      _id: userStore.user._id,
    });
  }
});
onBeforeUnmount(() => {
  socket.off("chatRandom/start");
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

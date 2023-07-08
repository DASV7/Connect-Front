import { createApp } from "vue";
import router from "./routes/index";
import App from "./App.vue";
import axios from "./api/axios";
import { createPinia } from "pinia";
import { useSocketStore } from "./store/socketStore";
import { notivue } from "notivue";
import VueFeather from "vue-feather";

import "notivue/notifications.css";
import "notivue/animations.css";

const app = createApp(App);
const pinia = createPinia();
app.component(VueFeather.name, VueFeather);

app.use(router);
app.use(pinia);
app.use(notivue);

// Conecta el store de Socket
const socketStore = useSocketStore();
socketStore.connect();

app.mount("#app");

import { createApp } from 'vue'
import router from "./routes/index"
import App from './App.vue'
import axios from './api/axios'
import { createPinia } from 'pinia'
import { useSocketStore } from './store/socketStore'


const app = createApp(App)
const pinia = createPinia()

app.use(router);
app.use(pinia)



// Conecta el store de Socket
const socketStore = useSocketStore();
socketStore.connect();

app.mount('#app')


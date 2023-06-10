import { createApp } from 'vue'
import router from "./routes/index"
import App from './App.vue'
import axios from './api/axios'
import { createPinia } from 'pinia'



const app = createApp(App)

const pinia = createPinia()
app.use(router);
app.use(pinia)

app.mount('#app')


import { createApp } from 'vue'
import App from './App.vue'
import "./assets/css/index.css"
import router from "./router/index"
import store from "./store"
createApp(App).use(router).use(store).mount('#app')

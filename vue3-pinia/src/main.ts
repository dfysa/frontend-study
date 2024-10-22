import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
// 引入 pinia
import { createPinia } from 'pinia'
// 实例化pinia
const pinia =createPinia();
import piniaPluginPersistedstate from "pinia-plugin-persistedstate"
// 使用持久化插件
pinia.use(piniaPluginPersistedstate);
import router from "./router"

createApp(App).use(pinia).use(router).mount('#app')

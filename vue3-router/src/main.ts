import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
// 创建 使用 挂载
const app=createApp(App)
app.use(router)
app.mount("#app")
// createApp(App).mount('#app')


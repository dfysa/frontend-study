// import { createApp } from 'vue'
// import App from './App.vue'
// // 需要使用 Vue.js 3 提供的 createApp() 方法创建一个 Vue.js 实例，并挂载在应用的根元素上
// createApp(App).mount('#app')
import { createApp } from "vue";
import App from "./App.vue";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css"; // 引入 ElementPlus 的样式文件

const app = createApp(App);

app.use(ElementPlus); // 安装 ElementPlus 插件

app.mount("#app");

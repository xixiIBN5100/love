import { createApp } from "vue";
import "./style.css";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import App from "./App.vue";
import router from "./routers";
import pinia from "./stores/pinia";
import cors from "cors";
const app = createApp(App);
app.use(router);
app.use(pinia);
app.use(ElementPlus);
app.mount("#app");
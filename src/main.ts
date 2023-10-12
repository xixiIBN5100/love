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
app.use(cors({
  origin: 'http://localhost:5174',
  credentials: true  // 允许携带凭证
}));

app.listen(8080, () => {
  console.log('Server started on port 8080');
});
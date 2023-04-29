import { createApp } from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import store from "./store";

import Antd from "ant-design-vue";
import "ant-design-vue/dist/antd.css";

import "@/assets/main.scss";

createApp(App).use(store).use(Antd).mount("#app");

import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import { router } from "@/shared/core";

const app = createApp(App);
app.use(router);
app.mount("#app");

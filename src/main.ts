import { createApp } from "vue";
import "@/shared/styles/index.css";
import App from "./App.vue";
import { router } from "@/shared/core";

const app = createApp(App);
app.use(router);
app.mount("#app");

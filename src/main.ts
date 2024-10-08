import { createApp } from "vue";
import "@/shared/styles/index.css";
import App from "./App.vue";
import { router } from "@/shared/core";
import Unicon from "vue-unicons";
import { uniSetting, uniSun, uniMoon } from "vue-unicons/dist/icons";

Unicon.add([uniSetting, uniSun, uniMoon]);

const app = createApp(App);
app.use(router);
app.use(Unicon as any);
app.mount("#app");

import { createMemoryHistory, createRouter } from "vue-router";

import { MainPage } from "@/pages";


const routes = [
  {path: "/", component: MainPage}
]

const router = createRouter({
  history: createMemoryHistory(),
  routes,
});

export default router;
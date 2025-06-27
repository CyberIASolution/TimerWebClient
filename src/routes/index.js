import { createMemoryHistory, createRouter } from "vue-router";

import HomeView from "@/pages/Home.vue";
import TimerView from "@/pages/Timer.vue";
import LoginView from "@/pages/Login.vue";

const routes = [
  { path: "/timer", component: TimerView },
  { path: "/login", component: LoginView },
];

const router = createRouter({
  history: createMemoryHistory(),
  routes,
});

export default router;

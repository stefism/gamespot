// eslint-disable-next-line no-unused-vars
import { createRouter, createWebHistory, START_LOCATION } from "vue-router";
import Home from "@/components/Home.vue";

const routes = createRouter({
  history: createWebHistory(),
  routes: [{ path: "/", component: Home, name: "home" }],
});

export default routes;

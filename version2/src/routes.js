import Vue from "vue";
import VueRouter from "vue-router";

import Home from "@/components/home/Index.vue";
import SignIn from "@/components/SignIn.vue";

Vue.use(VueRouter);

const routes = [
  { path: "/", component: Home },
  { path: "/signin", component: SignIn },
];

export default new VueRouter({
  mode: "history",
  routes,
  // eslint-disable-next-line no-unused-vars
  scrollBehavior(from, to, savedPosition) {
    return { x: 0, y: 0 };
  },
});

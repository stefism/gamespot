// eslint-disable-next-line no-unused-vars
import { createRouter, createWebHistory, START_LOCATION } from "vue-router";
import Home from "@/components/Home.vue";
import ArticleInfo from "@/components/ArticleInfo.vue";
import SignInOut from "@/components/User/SignInOut.vue";

const routes = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", component: Home, name: "home" },
    { path: "/article-info/:id", component: ArticleInfo, name: "articleInfo" },
    { path: "/signin", component: SignInOut, name: "signInOut" },
  ],
});

export default routes;

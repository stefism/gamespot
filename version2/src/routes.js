/* eslint-disable */
import Vue from "vue";
import VueRouter from "vue-router";
import store from "./store/store";

import Home from "@/components/home/Index.vue";
import SignIn from "@/components/SignIn.vue";
import Dashboard from "@/components/Dashboard.vue";
import DashboardWelcome from "@/components/posts/DashboardWelcome.vue";
import AddPosts from "@/components/posts/AddPosts.vue";
import ListOfPosts from "@/components/posts/ListOfPosts.vue";

Vue.use(VueRouter);

const authGuard = {
  beforeEnter: (to, from, next) => {
    const redirect = () => {
      if (store.state.admin.token) {
        if (to.path == "/signin") {
          next("/dashboard");
        } else {
          next();
        }
      } else {
        if (to.path == "/signin") {
          next();
        } else {
          next("/");
        }
      }
    };

    if (store.state.admin.refreshLoading) {
      store.watch(
        (state, getters) => getters["admin/refreshLoading"],
        () => {
          redirect();
        }
      );
      //Ако refreshLoading == true, значи сме презаредили приложението, понеже първоначалния стейт на refreshLoading е true. При това положение ползваме store.watch и наблюдаваме за промяна в пропертито refreshLoading. Когато то се промени (ще се промени на false, понеже така сме му казали в админ стейт модула.), тогава изпълняваме колбек функция, в случая redirect(). refreshLoading ще се промени след като сме зели токена или ако нямаме токен - веднага. Правим това за да може ако сме логнати и презаредим приложението от dashboard страницата, да си останем на нея.
    } else {
      redirect();
    }
  },
};

const routes = [
  { path: "/", component: Home },
  { path: "/signin", component: SignIn, ...authGuard },
  {
    path: "/dashboard",
    component: Dashboard,
    children: [
      { path: "/", component: DashboardWelcome },
      { path: "add_posts", component: AddPosts },
      { path: "posts_list", component: ListOfPosts },
    ],
    ...authGuard,
  },
];

export default new VueRouter({
  mode: "history",
  routes,
  // eslint-disable-next-line no-unused-vars
  scrollBehavior(from, to, savedPosition) {
    return { x: 0, y: 0 };
  },
});

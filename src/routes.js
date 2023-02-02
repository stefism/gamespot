import { createRouter, createWebHistory, START_LOCATION } from "vue-router";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import store from "@/store";

import Home from "@/views/HomeView.vue";
import ArticleInfo from "@/views/ArticleInfoView.vue";
import SignInOut from "@/views/SignInOutView.vue";
import Dashboard from "@/views/DashboardView.vue";
import UserMain from "@/components/User/MainDashboard.vue";
import UserProfile from "@/components/User/UserProfile.vue";
import AdminArticles from "@/components/User/AdminArticles.vue";
import AdminAddArticles from "@/components/User/AdminAddArticles.vue";
import NotFound from "@/views/404View.vue";

const routes = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", component: Home, name: "home" },
    { path: "/article-info/:id", component: ArticleInfo, name: "articleInfo" },
    {
      path: "/signin",
      component: SignInOut,
      name: "signInOut",
      meta: { signedIn: true },
    },
    {
      path: "/user/dashboard",
      component: Dashboard,
      meta: { isUserLogged: true },
      children: [
        { path: "", component: UserMain, name: "dashboard" },
        { path: "profile", component: UserProfile, name: "user_profile" },
        { path: "articles", component: AdminArticles, name: "admin_articles" },
        {
          path: "articles/add",
          component: AdminAddArticles,
          name: "admin_add",
        },
      ],
    },
    { path: "/:notFound(.*)*", component: NotFound, name: "404" },
  ],
});

const auth = getAuth();
const validateCheck = (to, from, next) => {
  if (to.meta.isUserLogged && !store.getters["auth/isUserAuth"]) {
    next("/signin");
  } else if (to.meta.signedIn && store.getters["auth/isUserAuth"]) {
    next("/user/dashboard");
  } else {
    next();
  }
  store.commit("notify/setLoading", false);
};

routes.beforeEach((to, from, next) => {
  // START_LOCATION - дава информация дали приложението е заредено за първи път или е презаредено.
  if (from == START_LOCATION) {
    // Искаме да направим проверка дали имаме потребител само първия път, при първоначално зареждане на приложението или ако потребителя го рефрешне.
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        store.dispatch("auth/autosign", user).then(() => {
          validateCheck(to, from, next);
          // next(); //dispatch връща промис и искаме да извикаме next() след като промиса се е резолвнал.
        });
      } else {
        validateCheck(to, from, next);
      }

      unsubscribe();
    }); // Дава информация дали имаме логнат юзър. Ако юзъра не е логнал, ще върне null за user.
    // onAuthStateChanged е "слушател" и ще се активира и ако юзъра излезне. Тогава пак ще влезнем в if-а, а ние искаме да го пуснем само един път и да не го пускаме повече. Затова го записваме в променлива и вместо next() го извикваме него.
  } else {
    validateCheck(to, from, next);
  }
});

export default routes;

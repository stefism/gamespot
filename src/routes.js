import { createRouter, createWebHistory, START_LOCATION } from "vue-router";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import store from "@/store";

import Home from "@/components/Home.vue";
import ArticleInfo from "@/components/ArticleInfo.vue";
import SignInOut from "@/components/User/SignInOut.vue";
import Dashboard from "@/components/User/Dashboard.vue";

const routes = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", component: Home, name: "home" },
    { path: "/article-info/:id", component: ArticleInfo, name: "articleInfo" },
    { path: "/signin", component: SignInOut, name: "signInOut" },
    { path: "/user/dashboard", component: Dashboard, name: "dashboard" },
  ],
});

const auth = getAuth();
const validateCheck = (to, from, next) => {
  next();
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

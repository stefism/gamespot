import { createStore } from "vuex";
import AuthenticationModule from "./authentication";
import ArticlesModule from "./articles";
import NotificationsModule from "./notifications";

const store = createStore({
  modules: {
    auth: AuthenticationModule,
    articles: ArticlesModule,
    notify: NotificationsModule,
  },
});

export default store;

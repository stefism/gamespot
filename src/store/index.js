import { createStore } from "vuex";
import AuthenticationModule from "./authentication";
import ArticlesModule from "./articles";
import NotificationsModule from "./notifications";

const store = createStore({
  modules: {
    AuthenticationModule,
    ArticlesModule,
    NotificationsModule,
  },
});

export default store;

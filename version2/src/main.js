import Vue from "vue";
import App from "./App.vue";
import router from "@/routes";
import Button from "@/components/Button.vue";
import store from "./store/store";
import VueResource from "vue-resource";

import { MdCard } from "vue-material/dist/components";
import "vue-material/dist/vue-material.min.css";
import "vue-material/dist/theme/default.css";

Vue.use(MdCard);
Vue.use(VueResource);
Vue.http.options.root = "";

Vue.component("app-button", Button);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");

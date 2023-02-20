import Vue from "vue";
import App from "./App.vue";
import router from "@/routes";
import Button from "@/components/Button.vue";

import { MdCard } from "vue-material/dist/components";
import "vue-material/dist/vue-material.min.css";
import "vue-material/dist/theme/default.css";

Vue.use(MdCard);

Vue.component("app-button", Button);

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");

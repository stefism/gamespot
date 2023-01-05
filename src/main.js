import { createApp } from "vue";
import App from "./App.vue";
import Antd from "ant-design-vue";
import Routes from "./routes";
import Store from "./store";
import Toaster from "@meforma/vue-toaster";
import "ant-design-vue/dist/antd.css";
import "./firebase";

const app = createApp(App);
app.use(Antd);
app.use(Routes);
app.use(Store);
app.use(Toaster);
app.mount("#app");

// createApp(App).mount('#app')

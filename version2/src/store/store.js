import Vue from "vue";
import Vuex from "vuex";
import admin from "./adminModule";
import posts from "./postsModule";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: { admin: admin, posts: posts },
});

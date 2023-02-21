import Vue from "vue";
import Vuex from "vuex";
import admin from "./adminModule";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: { admin: admin },
});

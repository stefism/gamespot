import Vue from "vue";
import router from "@/routes";

const fbAuth = "https://identitytoolkit.googleapis.com/v1";
const fbApiKey = process.env.VUE_APP_FIREBASE_API_KEY;
const databaseUrl =
  "https://gamespot-713b6-default-rtdb.europe-west1.firebasedatabase.app";

const admin = {
  namespaced: true,
  state: {
    addPost: false,
    token: null,
    refresh: null,
    refreshLoading: true,
    authFailed: false,
    authError: "",
  },
  getters: {
    isAuth(state) {
      if (state.token) {
        return true;
      }

      return false;
    },
    refreshLoading(state) {
      return state.refreshLoading;
    },
    addPostStatus(state) {
      return state.addPost;
    },
  },
  mutations: {
    authUser(state, authData) {
      state.token = authData.idToken;
      state.refresh = authData.refreshToken;

      if (authData.type == "signIn") {
        router.push("/dashboard");
      }
    },
    setAuthError(state, payload) {
      state.authFailed = payload.isError;
      state.authError = payload.msg;
    },
    logoutUser(state) {
      state.token = null;
      state.refresh = null;

      localStorage.removeItem("gamespot_token");
      localStorage.removeItem("gamespot_refreshToken");

      router.push("/");
    },
    refreshLoading(state) {
      state.refreshLoading = false;
    },
    addPostIndicate(state) {
      state.addPost = true;
    },
  },
  actions: {
    // eslint-disable-next-line no-unused-vars
    signIn({ commit }, payload) {
      commit("setAuthError", {
        msg: "",
        isError: false,
      });

      Vue.http
        .post(`${fbAuth}/accounts:signInWithPassword?key=${fbApiKey}`, {
          ...payload,
          returnSecureToken: true,
        })
        .then((response) => {
          console.log("response", response);

          commit("authUser", {
            ...response.body,
            type: "signIn",
          });

          localStorage.setItem("gamespot_token", response.body.idToken);
          localStorage.setItem(
            "gamespot_refreshToken",
            response.body.refreshToken
          );
        })
        .catch((error) => {
          commit("setAuthError", {
            msg: error.body.error.message,
            isError: true,
          });
        });
    },
    refreshToken({ commit }) {
      const refreshToken = localStorage.getItem("gamespot_refreshToken");
      if (refreshToken) {
        Vue.http
          .post(`https://securetoken.googleapis.com/v1/token?key=${fbApiKey}`, {
            grant_type: "refresh_token",
            refresh_token: refreshToken,
          })
          .then((response) => {
            console.log("refresh", response);

            commit("authUser", {
              idToken: response.body.id_token,
              refreshToken: response.body.refresh_token,
              type: "refresh",
            });

            localStorage.setItem("gamespot_token", response.body.id_token);
            localStorage.setItem(
              "gamespot_refreshToken",
              response.body.refresh_token
            );

            commit("refreshLoading");
          });
      } else {
        commit("refreshLoading"); //Това е необходимо за да може ако си бил на dashboard страницата, логнал си се и рефрешнеш приложението, да не те праща пак на началната страница, а да си останеш на dashboard страницата.
      }
    },
    // eslint-disable-next-line no-unused-vars
    addPost({ commit, state }, payload) {
      Vue.http
        .post(`${databaseUrl}/posts.json?auth=${state.token}`, payload)
        .then((response) => {
          console.log(response);
          commit("addPostIndicate");
        });
    },
  },
};

export default admin;

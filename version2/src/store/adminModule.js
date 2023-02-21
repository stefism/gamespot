import Vue from "vue";
const FbAuth = "https://identitytoolkit.googleapis.com/v1";
const FbAPiKey = process.env.VUE_APP_FIREBASE_API_KEY;

const admin = {
  namespaced: true,
  state: {
    token: null,
    refresh: null,
  },
  getters: {},
  mutations: {
    authUser(state, authData) {
      state.token = authData.idToken;
      state.refresh = authData.refreshToken;
    },
  },
  actions: {
    // eslint-disable-next-line no-unused-vars
    signIn({ commit }, payload) {
      Vue.http
        .post(`${FbAuth}/accounts:signInWithPassword?key=${FbAPiKey}`, {
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
        });
    },
  },
};

export default admin;

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
    uploadedImageUrl: null,
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
    getUploadedImageUrl(state) {
      return state.uploadedImageUrl;
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
    addPostClose(state) {
      state.addPost = false;
    },
    setImageUrl(state, imageUrl) {
      state.uploadedImageUrl = imageUrl;
    },
    clearImageUpload(state) {
      state.uploadedImageUrl = null;
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
        commit("refreshLoading"); //???????? ?? ???????????????????? ???? ???? ???????? ?????? ???? ?????? ???? dashboard ????????????????????, ???????????? ???? ???? ?? ?????????????????? ????????????????????????, ???? ???? ???? ?????????? ?????? ???? ?????????????????? ????????????????, ?? ???? ???? ?????????????? ???? dashboard ????????????????????.
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
    deletePost({ dispatch, state }, postId) {
      Vue.http.delete(
        `${databaseUrl}/posts/${postId}.json?auth=${state.token}`
      );
      dispatch("posts/getAllPosts", { limit: -1 }, { root: true });
    },
    // eslint-disable-next-line no-unused-vars
    imageUpload({ commit }, file) {
      const cloudinaryURL =
        "https://api.cloudinary.com/v1_1/dzowqbykc/image/upload";
      const preset = "tbu1x9zm";

      let formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", preset);

      Vue.http
        .post(cloudinaryURL, formData, {
          headers: {
            "Content-type": "application/x-www-form-urlencoded",
          },
        })
        .then((response) => {
          console.log(response);
          commit("setImageUrl", response.body.secure_url);
        });
    },
  },
};

export default admin;

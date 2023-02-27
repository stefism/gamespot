import Vue from "vue";

// const fbApiKey = process.env.VUE_APP_FIREBASE_API_KEY;
const databaseUrl =
  "https://gamespot-713b6-default-rtdb.europe-west1.firebasedatabase.app";

const posts = {
  namespaced: true,
  state: {
    homePosts: null,
  },
  getters: {
    returnAllPosts(state) {
      return state.homePosts;
    },
  },
  mutations: {
    setAllPosts(state, posts) {
      state.homePosts = posts;
    },
  },
  actions: {
    getAllPosts({ commit }, payload) {
      Vue.http
        .get(
          `${databaseUrl}/posts.json?orderBy="$key"&limitToLast=${payload.limit}`
        )
        .then((response) => {
          const posts = [];

          for (const key in response.body) {
            posts.push({
              ...response.body[key],
              id: key,
            });
          }

          commit("setAllPosts", posts.reverse());
        });
    },
  },
};

export default posts;

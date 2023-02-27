import Vue from "vue";

// const fbApiKey = process.env.VUE_APP_FIREBASE_API_KEY;
const databaseUrl =
  "https://gamespot-713b6-default-rtdb.europe-west1.firebasedatabase.app";

const posts = {
  namespaced: true,
  state: {
    homePosts: null,
    postById: null,
  },
  getters: {
    returnAllPosts(state) {
      return state.homePosts;
    },
    returnPostById(state) {
      return state.postById;
    },
  },
  mutations: {
    setAllPosts(state, posts) {
      state.homePosts = posts;
    },
    setPostById(state, post) {
      state.postById = post;
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

    getPostById({ commit }, postId) {
      Vue.http
        .get(`${databaseUrl}/posts.json?orderBy="$key"&equalTo="${postId}"`)
        .then((response) => {
          const postKey = Object.keys(response.body)[0];
          let post = response.body[postKey];
          post.id = Object.keys(response.body)[0];

          commit("setPostById", post);
        });
    },
  },
};

export default posts;

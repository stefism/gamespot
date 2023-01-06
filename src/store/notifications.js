const notificationsModule = {
  namespaced: true,
  state() {
    return {
      loader: false,
      toastMsg: [false, "message", "type"],
    };
  },
  getters: {
    getToastMsg(state) {
      return state.toastMsg;
    },
    isLoading(state) {
      return state.loader;
    },
  },
  mutations: {
    setToastMsg(state, payload) {
      state.toastMsg = [true, payload.message, payload.type];
    },
    setLoading(state, payload) {
      state.loader = payload;
    },
  },
};

export default notificationsModule;

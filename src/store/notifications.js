const notificationsModule = {
  namespaced: true,
  state() {
    return {
      toastMsg: [false, "message", "type"],
    };
  },
  getters: {
    getToastMsg(state) {
      return state.toastMsg;
    },
  },
  mutations: {
    setToastMsg(state, payload) {
      state.toastMsg = [true, payload.msg, payload.type];
    },
  },
};

export default notificationsModule;

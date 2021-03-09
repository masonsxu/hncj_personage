let user = {
  state: {
    user: {
      type: null,
      id: null,
    },
  },
  getters: {
    getUser(state) {
      return state.user;
    },
  },
  //   mutations: {},
  //   actions: {},
};
export default user;

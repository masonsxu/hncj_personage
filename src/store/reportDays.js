import axios from 'axios';

let reportDays = {
  state: {
    reportdays: [
      {
        reportCount: '',
        abnormal: '',
      },
    ],
  },
  getters: {
    getReportDays(state) {
      return state.reportdays;
    },
  },
  mutations: {
    setReportDays(state, param) {
      state.reportdays = [param.reportdays];
    },
  },
  actions: {
    loadReportDays(state, user) {
      axios
        .get(`/api/${user.type}/health/reportday/${user.id}`)
        .then((res) => {
          state.commit('setReportDays', { reportdays: res.data });
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
export default reportDays;

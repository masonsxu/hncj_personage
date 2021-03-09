import Vue from 'vue';
import Vuex from 'vuex';
import mseeage from './mseeage';
import user from './user';
import items from './items';
import reportDays from './reportDays';

Vue.use(Vuex);

export default new Vuex.Store({
  // 绑定命名空间
  // namespaced: true,
  modules: {
    mseeage,
    user,
    items,
    reportDays,
  },
});

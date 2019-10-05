import Vue from 'vue'
import Vuex from 'vuex'

import * as mutations from './mutations';
import * as actions from './actions';
import * as getters from './getters';

import editor from './modules/editor';

Vue.use(Vuex)

const state = {
  globalTest: 1,
};

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters,
  modules: {
    editor
  }
})

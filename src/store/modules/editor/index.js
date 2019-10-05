import {createNamespacedHelpers} from 'vuex';
import state from './state';
import * as mutations from './mutations';
import * as actions from './actions';
import * as getters from './getters';

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};

const {
  mapState,
  mapActions,
  mapMutations,
  mapGetters
} = createNamespacedHelpers('editor');

export const mapStateEditor = mapState;
export const mapActionsEditor = mapActions;
export const mapMutationsEditor = mapMutations;
export const mapGettersEditor = mapGetters;


/**
 * store/modules/index.js
 */
import {
   ACCOUNT_ID
} from '../mutation-types';


const state = {
    accountId: ''
};

const getters = {
  accountGetters : state => state.accountId
}

const actions = {
    update({ commit }, value) {
        commit(ACCOUNT_ID, value)
    },
};
const mutations = {
    [ACCOUNT_ID](state, value) {
       state.accountId = value;
    }
}

export default {
    state,
    getters,
    actions,
    mutations,
};

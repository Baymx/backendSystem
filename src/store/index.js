import Vue from 'vue';
import Vuex from 'vuex';
import createLogger from 'vuex/dist/logger';

import module from './module/module'
import index from './module/index'

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    module,
    index
  },
  plugins: [createLogger()]
})
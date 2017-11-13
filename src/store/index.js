import Vue from 'vue';
import Vuex from 'vuex';

import document from './modules/document';
import color from './modules/color';
import tools from './modules/tools';

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        document,
        color,
        tools
    }
})
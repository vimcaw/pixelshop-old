import Vue from 'vue';
import Vuex from 'vuex';

import tool from '../tools';

import document from './modules/document';
import color from './modules/color';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        activeTool: tool.Move
    },
    getters: {
        activeTool: state => state.activeTool,
    },
    mutations: {

        switchTool(state, tool) {
            state.activeTool = tool;
        }
    },
    modules: {
        document,
        color
    }
})
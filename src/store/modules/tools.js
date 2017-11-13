import tools from '../../tools'

export default {
    state: {
        activeTool: tools.Move
    },
    getters: {
        activeTool: state => state.activeTool,
    },
    mutations: {
        switchTool(state, tool) {
            state.activeTool = tool;
        }
    }

}
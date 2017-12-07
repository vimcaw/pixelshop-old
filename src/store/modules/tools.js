
export default {
    state: {
        activeTool: 'move'
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
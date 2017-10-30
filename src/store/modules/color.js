export default {
    state: {
        foreColor: '000000',
        backColor: 'ffffff'
    },
    getters: {
        foreColor: state => state.foreColor,
        backColor: state => state.backColor
    },
    mutations: {
        setForeColor(state, color) {
            state.foreColor = color;
        },
        setBackColor(state, color) {
            state.backColor = color;
        },
        exchangeColor(state) {
            let temp = state.foreColor;
            state.foreColor = state.backColor;
            state.backColor = temp;
        },
        resetColor(state) {
            state.foreColor = '000000';
            state.backColor = 'ffffff';
        }
    }
}
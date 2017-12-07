<template>
    <div class="tool">
        <ul>
            <li v-for="toolName in toolNames">
                <div
                        class="iconfont"
                        :class="tools[toolName].icon + (toolName === activeTool ? ' active': '')"
                        :title="toolName.firstUpperCase() + ' Tool'"
                        @mousedown="switchTool(toolName)">
                </div>
            </li>
        </ul>
        <div class="color">
            <div id="color-reset" title="Reset Color" @click="resetColor"></div>
            <div
                    id="color-exchange"
                    title="Exchange between forecolor and backcolor"
                    @click="exchangeColor">
            </div>
            <div id="display-color">
                <div
                        id="fore-color"
                        :style="foreColorStyle"
                        title="Foreground color"
                        @click="openColorPicker">
                </div>
                <div
                        id="back-color"
                        :style="backColorStyle"
                        title="Background color"
                        @click="openColorPicker(false)">
                </div>
            </div>
        </div>
    </div>
</template>

<script>
//    import '../color-picker/color-picker.min.css';
    import Tools from '../tools';
    import Nox from '../nox';

    export default {
        data() {
            return {
                toolNames: Object.keys(Tools),
                tools: Tools
            };
        },
        computed: {
            activeTool() {
                return this.$store.getters.activeTool;
            },
            foreColorStyle() {
                return {
                    backgroundColor: '#' + this.$store.getters.foreColor
                }
            },
            backColorStyle() {
                return {
                    backgroundColor: '#' + this.$store.getters.backColor
                }
            }
        },
        methods: {
            switchTool(tool) {
                this.$store.commit('switchTool', tool);
            },
            exchangeColor() {
                this.$store.commit('exchangeColor');
            },
            resetColor() {
                this.$store.commit('resetColor')
            },
            openColorPicker(isForeColor=true) {
                if (isForeColor) {
                    Nox.openWindow('Color Picker', 'foreColor');
                } else {
                    Nox.openWindow('Color Picker', 'backColor');
                }
            }
        }
    }
</script>

<style scoped="">
    .tool{
        float: left;
        width: 2.2em;
        height:100%;
    }
    .tool>ul{
        margin: 0;
        padding: 0;
        list-style-type: none;
    }
    .tool>ul div{
        display: inline-block;
        font-size: 1em;
        padding: 0.4em;
        margin: 0.2em;
    }
    .tool>ul div:hover{
        background: #404040;
    }
    .tool>ul div.active{
        background: #2c2c2c;
    }
    .tool .color #color-reset, .tool .color #color-exchange{
        display: inline-block;
        width: 0.7em;
        height: 0.7em;
        padding: 0.1em;
        margin-bottom: 0.2em;
    }
    .tool .color #color-reset{
        background: url("../image/ResetColor.svg");
    }
    .tool .color #color-exchange{
        background: url("../image/ExchangeColor.svg");

    }
    .tool #display-color{
        position: relative;
    }
    .tool .color #display-color div{
        position: absolute;
        width: 1em;
        height: 1em;
    }
    .tool .color #display-color #fore-color{
        left: 0.3em;
        background: #000;
        border: 0.05em solid #fff;
        outline: 0.1em solid #000;
        z-index: 1;
    }
    .tool .color #display-color #back-color{
        top: 0.7em;
        right: 0.3em;
        background: #fff;
        border: 0.05em solid #fff;
        outline: 0.1em solid #000;
        z-index: 0;
    }
</style>
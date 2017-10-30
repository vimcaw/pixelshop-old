<template>
    <div id="app">
        <welcome-page v-if="pixelDocuments.length <= 0"></welcome-page>

        <div id="main" v-if="pixelDocuments.length > 0">
            <div class="top">
                <menu-bar></menu-bar>
                <div id="full-screen" class="iconfont icon-quanping"></div>
            </div>

            <option-bar></option-bar>

            <div class="bottom-container">
                <tool-bar></tool-bar>
                <panel-group></panel-group>
                <design-boards></design-boards>
            </div>
        </div>

        <window-group></window-group>
    </div>
</template>


<script>
    import {mapGetters} from 'vuex';
    import Nox from '../nox';

    import ColorPicker from './windows/color-picker.vue';
    import About from './windows/about.vue';

    import Welcome from './Welcome.vue';
    import MenuBar from './Menu.vue';
    import Option from './Option.vue';
    import Tool from './Tool.vue';
    import Panel from './Panel.vue';
    import DesignBoard from './DocumentManager.vue';
    import WindowGroup from './window-group.vue';


    export default {
        computed: mapGetters([
            'pixelDocuments'
        ]),
        components: {
            'welcome-page': Welcome,
            'menu-bar': MenuBar,
            'option-bar': Option,
            'tool-bar': Tool,
            'panel-group': Panel,
            'design-boards': DesignBoard,
            'window-group': WindowGroup
        }
    }

    window.onbeforeunload = function(event){
        return 'Unsaved works will be lost';
    };
</script>


<style>
    /*窗口操作按钮*/
    #full-screen{
        display: inline-block;
        position: absolute;
        top: 0;
        right: 0;
        padding: 0.5em;
    }
    #full-screen:hover{
        background: #2c2c2c;
    }

</style>
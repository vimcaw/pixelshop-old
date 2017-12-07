<template>
    <nox-menu>
        <nox-ml title="File">
            <nox-mi hotkey="Alt+N" @click="openWindow('New')">New...</nox-mi>
            <nox-mi @click="openFromLocal" hotkey="Alt+O">Open From Local...</nox-mi>
            <nox-mi @click="openWindow('Open Picture By URL')" hotkey="Alt+U">Open From URL...</nox-mi>
            <nox-mi @click="save">Save</nox-mi>
            <nox-mi>Save as...</nox-mi>
        </nox-ml>
        <nox-ml title="Edit">
            <nox-mi>Undo</nox-mi>
            <nox-mi>Redo</nox-mi>
            <nox-mi divide>Copy</nox-mi>
            <nox-mi>Cut</nox-mi>
            <nox-mi>Paste</nox-mi>
        </nox-ml>
        <nox-ml title="Help">
            <nox-mi><a target="_blank" href="https://github.com/vimcaw/pixelshop">Change Log & Source Code</a></nox-mi>
            <nox-mi>Feedback</nox-mi>
            <nox-mi @click="openWindow('About')">About</nox-mi>
        </nox-ml>
    </nox-menu>
</template>


<script>
    import Nox from '../nox';
    import Vue from 'vue';
    import store from '../store/index';
    import instruction from '../instruction';

    export default {
        mixins: [instruction],
        methods: {
            openWindow(windowTitle) {
                Nox.openWindow(windowTitle);
            },
            save() {
                let download = document.createElement('a');
                download.download = this.$store.getters.activeDocument.fileName;
                download.href = this.$store.getters.activeDocument.image.src;
                download.click();
            }
        }
    }
</script>


<style>

</style>
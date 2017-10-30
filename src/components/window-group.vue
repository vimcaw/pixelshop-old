<template>
    <div id="window-group">
        <nox-window title="Open Picture By URL">
            <label for="image-url">Paste URL in here:</label>
            <input id="image-url" v-model="imageURL" type="text">
            <button @click="openURL">Confirm</button>
            <br>
            <img :src="imageURL" alt="">
        </nox-window>
        <nox-window title="Can't Read Local File">
            <span class="fa fa-exclamation-triangle"></span>
            <h1>Ooooops, your browser does not support reading local file.</h1>
            <h2>One of following 2 ways can solve it:</h2>
            <ul>
                <li>Use one of IE 11, Edge, Chrome(recommend), FireFox and open this page again.</li>
                <li>Upload your image to some site (like Google Drive, Google Images, ...) and right click on your image, click "copy image link", open this page and click "File > Open From URL...", paste link to textbox.</li>
            </ul>
        </nox-window>
        <nox-window title="About">
            <win-about></win-about>
        </nox-window>
        <nox-window title="Color Picker">
            <win-color-picker slot-scope="props" :colorType="props.args"></win-color-picker>
        </nox-window>
    </div>
</template>

<script>
    import About from './windows/about.vue'
    import ColorPicker from './windows/color-picker.vue';

    import Nox from '../nox'

    export default {
        components: {
            'win-about': About,
            'win-color-picker': ColorPicker
        },
        data: function () {
            return {
                imageURL: ''
            }
        },
        methods: {
            openURL() {
                let name = this.imageURL.match(/\/*.+\.[A-Za-z]+$/)[0];
                this.$store.commit('openImage', {src: this.imageURL, fileName: name});
                Nox.closeWindow('Open Picture By URL');
            }
        }
    }
</script>

<style></style>
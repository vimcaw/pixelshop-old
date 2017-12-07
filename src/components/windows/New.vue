<template>
    <div id="new-document">
        <!--<select name="pre-size" id="">-->
            <!--<option value="a1">A1</option>-->
            <!--<option value="a2">A2</option>-->
            <!--<option value="a3">A3</option>-->
            <!--<option value="a4">A4</option>-->
        <!--</select>-->
        <div>
            <label for="file-name">File Name: </label>
            <input type="text" name="file-name" v-model="fileName">
        </div>
        <div class="width">
            <label for="width">Width: </label><input type="number" name="width" v-model="width"><span>px</span>
        </div>
        <div class="height">
            <label for="height">Height: </label><input type="number" name="height" v-model="height"><span>px</span>
        </div>
        <div class="back-color">
            <label for="back-color">Back Color: </label>
            <select name="back-color" id="back-color" v-model="selected">
                <option value="white">White</option>
                <option value="black">Black</option>
                <option value="custom">Custom</option>
            </select>
            <div class="color-display" :style="colorDisplayStyle" @click="openColorPicker"></div>
        </div>
        <div class="operate">
            <button class="confirm" @click="newDocument">Confirm</button>
            <button class="cancel" @click="close">Cancel</button>
        </div>
    </div>
</template>

<script>
    import Nox from '../../nox';

    export default {
        data () {
            return {
                width: 1080,
                height: 1920,
                selected: 'white',
                fileName: 'Unnamed'
            }
        },
        computed: {
            backColor () {
                return this.$store.getters.backColor;
            },
            colorDisplayStyle () {
                return {
                    backgroundColor: '#' + this.backColor
                }
            }
        },
        watch: {
            selected (newValue) {
                if (newValue === 'white') {
                    this.$store.commit('setBackColor', 'ffffff');
                } else if (newValue === 'black') {
                    this.$store.commit('setBackColor', '000000');
                }
            }
        },
        methods: {
            openColorPicker() {
                this.selected = 'custom';
                Nox.openWindow('Color Picker', 'backColor');
            },
            newDocument() {
                if (this.width > 0 && this.height > 0 && this.fileName.trim() !== '') {
                    let canvas = document.createElement('canvas');
                    let context = canvas.getContext('2d');
                    canvas.width = this.width;
                    canvas.height = this.height;
                    context.fillStyle = '#' + this.backColor;
                    context.fillRect(0, 0, this.width, this.height);
                    let image = new Image;
                    image.src = canvas.toDataURL('image/png');
                    this.$store.commit('createDocument', {fileName: this.fileName.trim(), backgroundImage: image});
                    Nox.closeWindow('New');
                } else {
                    alert("Value cann't be set to empty or 0");
                }
            },
            close() {
                Nox.closeWindow('New');
            },

        }
    }
</script>

<style scoped="">
    div{
        margin: 0.5rem 0;
    }
    label{
        display: inline-block;
        width: 5rem;
        margin-right: 1em;
    }
    input{
        display: inline-block;
        width: 4rem;
        margin-right: .5em;
    }
    input[name="file-name"]{
        width: 6rem;
    }
    .color-display{
        display: inline-block;
        margin: 0 .5rem;
        width: 1rem;
        height: 1rem;
        vertical-align: middle;
    }
</style>
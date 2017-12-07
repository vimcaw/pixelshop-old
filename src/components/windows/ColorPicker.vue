<template>
    <div id="color-picker">
        <div class="picker">
            <div class="sb" @mousedown.prevent="sbMousedown" @mousemove="sbMousemove" :style="svStyle" ref="sb">
                <div class="pointer" @mousedown.stop="" :style="svPointerStyle"></div>
            </div>
            <div class="h" @mousedown.prevent="hMousedown" @mousemove="hMousemove">
                <div class="pointer" :style="hPointerStyle"></div>
            </div>
        </div>
        <div class="input">
            <div class="row">
                <div class="color-comparison col">
                    <span>New</span>
                    <div id="color-new" :style="{background: '#' + hexColor}"></div>
                    <div id="color-current" :style="{background: '#' + currentColor}"></div>
                    <span>Current</span>
                </div>
                <div class="button">
                    <button class="confirm" type="button" @click="comfirm">Confirm</button>
                    <button class="cancel" type="button" @click="cancel">Cancel</button>
                </div>
            </div>

            <ul class="hsv">
                <li>H: <input id="input-h" type="number" step="1" min="0" max="360" v-model="hue">°</li>
                <li>S: <input id="input-s" type="number" step="1" min="0" max="100" v-model="saturation">%</li>
                <li>V: <input id="input-v" type="number" step="1" min="0" max="100" v-model="brightness">%</li>
            </ul>
            <ul class="rgb">
                <li>R: <input id="input-r" type="number" step="1" min="0" max="255" v-model="red"></li>
                <li>G: <input id="input-g" type="number" step="1" min="0" max="255" v-model="green"></li>
                <li>B: <input id="input-b" type="number" step="1" min="0" max="255" v-model="blue"></li>
            </ul>
            <div class="hex">#<input id="input-hex" type="text" maxlength="6" v-model="hexColor"></div>
        </div>
    </div>
</template>


<script>
    import color from '../../color'
    import Nox from '../../nox'
    import {limit} from '../../functions'

    export default {
        props: [
            'colorType'
        ],
        data() {
            return {
                currentColor: this.$store.getters[this.colorType],
                newColor: {
                    h: color.HEX2HSV(this.$store.getters[this.colorType])[0],
                    s: color.HEX2HSV(this.$store.getters[this.colorType])[1],
                    b: color.HEX2HSV(this.$store.getters[this.colorType])[2]
                },
                hsbHeight: 0,
                hsbWidth: 0
            }
        },
        computed: {
            hsb: {
                get() {
                    return [this.newColor.h, this.newColor.s, this.newColor.b]
                },
                set(value) {
                    this.hue = value[0];
                    this.saturation = value[1];
                    this.brightness = value[2];
                }
            },
            hue: {
                get() {
                    return this.newColor.h;
                },
                set(value) {
                    this.newColor.h = Math.round(limit(value, 0, 360));
                }
            },
            saturation: {
                get() {
                    return this.newColor.s;
                },
                set(value) {
                    this.newColor.s = Math.round(limit(value, 0, 100));
                }
            },
            brightness: {
                get() {
                    return this.newColor.b;
                },
                set(value) {
                    this.newColor.b = Math.round(limit(value, 0, 100));
                }
            },
            red: {
                get() {
                    return color.HSV2RGB([this.hue, this.saturation, this.brightness])[0]
                },
                set(value) {
                    this.hsb = color.RGB2HSV([limit(value, 0, 255), this.green, this.blue]);
                }
            },
            green: {
                get() {
                    return color.HSV2RGB([this.hue, this.saturation, this.brightness])[1]
                },
                set(value) {
                    this.hsb = color.RGB2HSV([this.red, limit(value, 0, 255), this.blue]);
                }
            },
            blue: {
                get() {
                    return color.HSV2RGB([this.hue, this.saturation, this.brightness])[2]
                },
                set(value) {
                    this.hsb = color.RGB2HSV([this.red, this.green, limit(value, 0, 255)]);
                }
            },
            hexColor: {
                get() {
                    return color.HSV2HEX([this.hue, this.saturation, this.brightness]);
                },
                set(value) {
                    this.hsb = color.HEX2HSV(value);
                }
            },
            hPointerStyle() {
                return {
                    bottom: (this.hue / 360 *  this.hsbHeight) + 'px'
                }
            },
            svStyle() {
                return {
                    backgroundColor: '#' + color.HSV2HEX([this.hue, 100, 100])
                }
            },
            svPointerStyle() {
                return {
                    bottom: (this.brightness / 100 * this.hsbHeight) + 'px',
                    left: (this.saturation / 100 * this.hsbWidth) + 'px',
                    borderColor: '#' + color.getComplementaryGrayColor(color.HSV2HEX([this.newColor.h, this.newColor.s, this.newColor.b]))
                }
            }
        },
        methods: {
            hMousedown: function (event) {
                this.hue = Math.round((1 - event.offsetY / this.hsbHeight) * 360);
            },
            hMousemove: function (event) {
                if (event.buttons === 1) {
                    this.hMousedown(event)
                }
            },
            sbMousedown: function (event) {
                if (event.target === this.$refs.sb) {
                    this.saturation = Math.round(event.offsetX / this.hsbHeight * 100);
                    this.brightness = Math.round((1 - event.offsetY / this.hsbHeight) * 100);
                }
            },
            sbMousemove: function (event) {
                if (event.target === this.$refs.sb && event.buttons === 1) {
                    this.sbMousedown(event)
                }
            },
            comfirm() {
                let commad = this.colorType === 'foreColor' ? 'setForeColor' : 'setBackColor';
                this.$store.commit(commad, this.hexColor);
                Nox.closeWindow('Color Picker');
            },
            cancel() {
                Nox.closeWindow('Color Picker');
            }
        },
        mounted() {
            this.hsbWidth = this.$refs.sb.clientWidth;
            this.hsbHeight = this.$refs.sb.clientHeight;
        }
    }
</script>


<style scoped="">
    .picker, .input, .hsv, .rgb, .h, .sb{
        display: inline-block;
    }

    .col>*{
        display: block;
    }
    .picker .h{
        position: relative;
        width: 2em;
        height: 15em;
        background-image: url('./image/color-picker-h.png');
        -webkit-background-size: contain;
        background-size: contain;
        border: 0.1em solid black;
        overflow: hidden;
        cursor: ns-resize;
    }
    .picker .h .pointer{
        position: absolute;
        height: 0;
        width: 100%;
    }
    .picker .h .pointer::before, .picker .h .pointer::after{
        content: '';
        position: absolute;
        bottom: -0.3em;
        width: 0;
        height: 0;
        border-top: 0.3em solid transparent;
        border-bottom: 0.3em solid transparent;
    }
    .picker .h .pointer::before{
        left: 0;
        border-left: 0.3em solid black;
    }
    .picker .h .pointer::after{
        right: 0;
        border-right: 0.3em solid black;
    }
    .picker .sb{
        position: relative;
        width: 15em;
        height: 15em;
        background: url('./image/color-picker-sv.png');
        background-image: linear-gradient(to top,#000,rgba(0,0,0,0)),linear-gradient(to right,#fff,rgba(255,255,255,0));
        -webkit-background-size: contain;
        background-size: contain;
        border: 0.1em solid black;
        cursor: crosshair;
    }
    .picker .sb .pointer{
        position: absolute;
        width: 0.8em;
        height: 0.8em;
        border-radius: 50%;
        border: 0.1em solid black;
        transform: translate(-50%, 50%);
    }
    .picker .sv .pointer::after{
        content: '';
        width: 0.5em;
        height: 0.5em;
        border-radius: 50%;
        border: 0.2em solid white;
    }

    ul {
        list-style-type: none;
    }
    ul>li, .hex{
        margin: 1em;
    }

    .row>div{
        display: inline-block;
    }

    .hsv input, .rgb input {
        width: 3em;
    }

    .hex input {
        width: 5em;
    }

    .button button {
        display: block;
        margin: 1em;
    }

    .color-comparison {
        text-align: center;
        margin: 0 1.2em;
    }

    .color-comparison div {
        width: 4em;
        height: 2em;
        background: #000;
        margin: 0;
    }

    .row div {
        vertical-align: middle;
    }
</style>
<template>
    <li :class="isActive ? 'active' : ''">
        <div class="title-bar" @click="">
            <span class="title">{{ fileName }}</span>
            <span class="close fa fa-times" @click.stop="close"></span>
        </div>
        <div class="board"
             v-show="isActive"
             @wheel="onwheel"
             ref="board"
        >
            <ul
                    class="canvases"
                    :style="canvasesStyle"
                    @mouseup="onmouseup"
                    @keydown="onkeydown"
                    @mousedown="onmousedown"
                    ref="canvasContainer"
            >
                <li class="transparency-grid">
                    <canvas ref="transparencyGrid" :width="width" :height="height"></canvas>
                </li>
                <li v-show="layer.isVisible" v-for="layer in layers" :key="layer.id">
                    <canvas ref="canvases"></canvas>
                </li>
            </ul>
        </div>
        <div class="status" v-show="isActive">{{ statusText }}</div>
    </li>
</template>

<script>
    import tools from '../tools';

    function renderTransparencyGrid(canvas) {
        let context = canvas.getContext("2d");

        let canvasForPattern = document.createElement('canvas');
        let contextForPattern = canvasForPattern.getContext('2d');
        const rectSize = 10;
        canvasForPattern.width = rectSize * 2;
        canvasForPattern.height = rectSize * 2;

        contextForPattern.fillStyle = '#ffffff';
        contextForPattern.fillRect(0, 0, rectSize, rectSize);
        contextForPattern.fillStyle = '#cccccc';
        contextForPattern.fillRect(rectSize, 0, rectSize, rectSize);

        contextForPattern.fillStyle = '#cccccc';
        contextForPattern.fillRect(0, rectSize, rectSize, rectSize);
        contextForPattern.fillStyle = '#ffffff';
        contextForPattern.fillRect(rectSize, rectSize, rectSize, rectSize);

        context.fillStyle = context.createPattern(canvasForPattern, 'repeat');
        context.fillRect(0, 0, canvas.width, canvas.height);
    }

    export default {
        props: {
            isActive: Boolean,
            fileName: String,
            backgroundImage: Image,
            layers: Array
        },
        data() {
            return {
                scaling: 1,
                pos: 'absolute',
                left: '50%',
                top: '50%',
                marginLeft: -1 * this.backgroundImage.width / 2,
                marginTop: -1 * this.backgroundImage.height / 2
            }
        },
        mounted() {
            renderTransparencyGrid(this.$refs.transparencyGrid);

            this.$nextTick(function () {
                let context = this.$refs.canvases[0].getContext('2d');
                this.$refs.canvases[0].width = this.width;
                this.$refs.canvases[0].height = this.height;
                context.drawImage(this.backgroundImage, 0, 0);
            })
        },
        computed: {
            changeScaling: {
                get() {
                    return this.scaling;
                },
                set(value) {
                    this.scaling = value;
                    this.scaling = this.scaling > 32 ? 32 : this.scaling;
                    this.scaling = this.scaling < 0.1 ? 0.1 : this.scaling;

                    //强制重新渲染，修复滚动条不出现或不消失的 Bug
                    this.pos = 'relative';
                    let _this = this;
                    setTimeout(function () {
                        _this.pos = 'absolute';
                    }, 0);
                }
            },
            width() {
                return this.backgroundImage.width;
            },
            height() {
                return this.backgroundImage.height;
            },
            canvasesStyle() {
                return {
                    position: this.pos,
//                    cursor: this.$store.getters.activeTool.cursor,
                    width: this.backgroundImage.width + "px",
                    height: this.backgroundImage.height + "px",
                    left: this.left,
                    top: this.top,
                    marginLeft: this.marginLeft + 'px',
                    marginTop: this.marginTop + 'px',
                    transform: 'scale(' + this.scaling + ')'
                }
            },
            statusText() {
                return this.width + '×' + this.height + ' @ ' + Math.round(this.scaling * 100) + '%'
            }
        },
        methods: {
            update() {
                let format = {
                    png: 'png',
                    jpg: 'jpeg',
                    webp: 'webp'
                };
                this.src = this.canvas.toDataURL('image/png');
            },
            close() {
                this.$emit('close');
            },
            scalingUp(increament, X, Y) {
                let oldScaling = this.scaling;
                this.changeScaling += increament;

                let isInnerOfWidth = this.width * this.scaling < this.$refs.board.offsetWidth;
                let isInnerOfHight = this.height * this.scaling < this.$refs.board.offsetHeight;

                if (isInnerOfWidth) {
                    this.left = '50%';
                    this.marginLeft = -1 * this.width * this.scaling / 2;
                } else {
                    this.left = 0;
                    this.marginLeft = 20;
//                    this.$refs.board.scrollLeft = this.scaling * (this.$refs.board.scrollLeft + X) / oldScaling - X;
                }

                if (isInnerOfHight) {
                    this.top = '50%';
                    this.marginTop = -1 * this.height * this.scaling / 2;
                } else {
                    this.top = 0;
                    this.marginTop = 20;
//                    this.$refs.board.scrollTop = this.scaling * (this.$refs.board.scrollTop + Y) / oldScaling - Y;
                }
            },
            onmouseup(event) {

            },
            onmousedown(event) {
                let activeTool = this.$store.getters.activeTool;
                activeTool.onmousedown && activeTool.onmousedown(event, this.$refs.canvas);
            },
            onkeydown(event) {

            },
            onwheel(event) {
                let board = this.$refs.board;
                if (event.ctrlKey) {
                    //如果ctrl键按下，滑动滚轮左右移动画布
                    if (event.deltaY > 0) {
                        board.scrollLeft += 200;
                    } else {
                        board.scrollLeft -= 200;
                    }
                    event.preventDefault();
                    return false;
                } else if (event.altKey) {
                    //如果alt键按下，缩放画布
                    if (event.deltaY < 0) {
                        this.scalingUp(0.4, event.screenX, event.screenY);
                    } else {
                        this.scalingUp(-0.4, event.screenX, event.screenY);
                    }
                    event.preventDefault();
                    return false;
                }
            },
        }
    }
</script>

<style scoped="">
    ul>li{
        display: inline-block;
        margin-right: 0.2em;
    }
    .title-bar{
        display: inline-block;
        padding: 0.2em 0.5em;
        background: #404040;
        cursor: default;
    }
    .title-bar:hover{
        background: #454545;
    }
    li.active .title-bar, #design-boards li.active .title-bar:hover{
        background: #535353;
    }
    span.title{
        overflow-wrap: break-word;
        word-break: break-all;
        overflow: hidden;
    }
    .title-bar span{
        display: inline-block;
        margin: 0.2em 0.5em;
        font-size: 0.8em;
        vertical-align: middle;
    }
    .title-bar .close{
        width: 1em;
        height: 1em;
        padding: 0.2em 0.1em 0.2em 0.3em;
        margin-left: 0;
    }
    .title-bar .close:hover{
        background: #C11D21;
        border-radius: 50%;
    }
    .board{
        position: absolute;
        top: 2em;
        left: 0;
        bottom: 2em;
        width: 100%;
        overflow: scroll;
        margin: 0;
    }
    ul.canvases{
        position: relative;
        transform-origin: 0 0;
        margin-right: 20px;
        margin-bottom: 20px;
        -webkit-transition: all .5s;
        -moz-transition: all .5s;
        -ms-transition: all .5s;
        -o-transition: all .5s;
        transition: all .5s;
    }
    ul.canvases li{
        position: absolute;
        top: 0;
        left: 0;
    }
    .eyedropper, ul.canvases{
        cursor: url("../cursor/Eyedropper.cur"), auto
    }
    .status{
        position: absolute;
        left: 0;
        bottom: 0;
        width: 100%;
        font-size: 1em;
        line-height: 2em;
        background: #535353;
        padding-left: 1em;
        margin-top: 0.2em;
    }
</style>
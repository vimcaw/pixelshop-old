<template>
    <li :class="isActive ? 'active' : ''">
        <div class="title-bar" @click="">
            <span class="title">{{ fileName }}</span>
            <span class="close fa fa-times" @click.stop="close"></span>
        </div>
        <div class="board"
             v-show="isActive"
             @wheel="onwheel"
             @mousedown="onmousedown"
             ref="board"
        >
            <ul
                    class="canvases"
                    :style="canvasesStyle"
                    @mouseup="onmouseup"
                    @keydown="onkeydown"
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
                pos: 'absolute'
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
                    this.scaling = this.scaling < 0.2 ? 0.2 : this.scaling;

                    this.pos = 'relative';

                    let _this = this;
                    setTimeout(function () {
                        _this.pos = 'absolute';
                    }, 1000);

                    let isOverflowOfWidth = this.$refs.canvasContainer.offsetWidth > this.$refs.board.offsetWidth;
                    let isOverflowOfHight = this.$refs.canvasContainer.offsetHeight > this.$refs.board.offsetHeight;

                    if (isOverflowOfWidth || isOverflowOfHight)
                    {
                        this.pos = 'relative';
                    }
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
                    width: this.backgroundImage.width + "px",
                    height: this.backgroundImage.height + "px",
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
            onmouseup(event) {

            },
            onmousedown(event) {
                this.activeTool.onmousedown && this.activeTool.onmousedown(event);
            },
            onkeydown(event) {

            },
            onwheel(event) {
                let canvasContainer = this.$refs.canvasContainer;
                if (event.ctrlKey) {
                    //如果ctrl键按下，滑动滚轮左右移动画布
                    if (event.deltaY > 0) {
                        canvasContainer.scrollLeft += 200;
                    } else {
                        canvasContainer.scrollLeft -= 200;
                    }
                    event.preventDefault();
                    return false;
                } else if (event.altKey) {
                    //如果alt键按下，缩放画布
                    if (event.deltaY > 0) {
                        this.changeScaling -= 0.4;
                    } else {
                        this.changeScaling += 0.4;
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
    }
    ul.canvases li{
        position: absolute;
        top: 0;
        left: 0;
    }
    disable-scroll-x{
        overflow-x: hidden;
    }
    .disable-scroll-y{
        overflow-y: hidden;
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
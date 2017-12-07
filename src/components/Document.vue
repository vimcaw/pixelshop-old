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
                    :class="classOfCanvases"
                    @mouseup="onmouseup"
                    @mousedown="onmousedown"
                    ref="canvasContainer"
            >
                <li class="transparency-grid">
                    <canvas ref="transparencyGrid" :width="width" :height="height"></canvas>
                </li>
                <li
                        :is="'DocumentLayer'"
                        v-show="layer.isVisible"
                        v-for="layer in layers"
                        :key="layer.id"
                        :id="layer.id"
                        :image="layer.image"
                        @update="update"
                        ref="canvases"
                >
                </li>
            </ul>
        </div>
        <div class="status" v-show="isActive">{{ statusText }}</div>
    </li>
</template>

<script>
    import DocumentLayer from './DocumentLayer.vue'
    import tools from '../tools';
    import color from '../color';

    export default {
        components: {
            DocumentLayer: DocumentLayer
        },
        props: {
            isActive: Boolean,
            fileName: String,
            backgroundImage: Image,
            layers: Array
        },
        data() {
            return {
                scaling: 1,
                combinedCanvas: document.createElement('canvas'),
                layerImages: [],
                width: this.backgroundImage.width,
                height: this.backgroundImage.height,
                pos: 'absolute',
                left: '50%',
                top: '50%',
                marginLeft: -1 * this.backgroundImage.width / 2,
                marginTop: -1 * this.backgroundImage.height / 2,
                isAltKeyPress: false
            }
        },
        computed: {
            realtimeImage () {
                let image = new Image();
                let context = this.combinedCanvas.getContext('2d');
                context.clearRect(0, 0, this.width, this.height);
                this.layerImages.forEach(function (layerimage) {
                    if (layerimage) {
                        context.drawImage(layerimage.image, layerimage.x, layerimage.y);
                    }
                });

                image.src = this.combinedCanvas.toDataURL();
                return image;
            },
            classOfCanvases () {
                return this.isAltKeyPress ? this.activeTool + '-alt' : this.activeTool;
            },
            activeTool() {
                return this.$store.getters.activeTool
            },
            changeScaling: {
                get() {
                    return this.scaling;
                },
                set(value) {
                    this.scaling = value;
                    this.scaling = this.scaling > 32 ? 32 : this.scaling;
                    this.scaling = this.scaling < 0.1 ? 0.1 : this.scaling;

                    //强制重新渲染，修复滚动条在内容超出时不出现或在不超出时不消失的 Bug
                    this.pos = 'relative';
                    let _this = this;
                    setTimeout(function () {
                        _this.pos = 'absolute';
                    }, 0);
                }
            },
            canvasesStyle() {
                return {
                    position: this.pos,
                    cursor: this.$store.getters.activeTool.cursor,
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

        mounted() {
            renderTransparencyGrid(this.$refs.transparencyGrid);

            let _this = this;
            window.addEventListener('keydown', function (event) {
                if (event.altKey) {
                    _this.isAltKeyPress = true;
                }
            }, false);

            window.addEventListener('keyup', function () {
                _this.isAltKeyPress = false;
            }, false);
        },
        methods: {
            update(layerId, image) {
//                let pos = this.getLayerPosition(layerId);
//                this.set(this.layerImages, layerId, {x: pos.x, y: pos.y, image: image});
            },
            close() {
                this.$emit('close');
            },
            getLayerPosition(layerId) {
                return getPositionOnParent(this.$refs.canvases[layerId], this.$refs.canvasContainer);
            },
            scalingUp(increament, X, Y) {
                let oldScaling = this.scaling;
                this.changeScaling += increament;

                let isInnerOfWidth = (this.width * this.scaling) < this.$refs.board.offsetWidth;
                let isInnerOfHight = (this.height * this.scaling) < this.$refs.board.offsetHeight;

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
//                  this.$refs.board.scrollTop = this.scaling * (this.$refs.board.scrollTop + Y) / oldScaling - Y;
                }
            },
            onmouseup(event) {

            },
            onmousedown(event) {
                if (this.activeTool === 'eyedropper') {
                    let context = this.combinedCanvas.getContext('2d');
                    let imageData = context.getImageData(event.offsetX, event.offsetY, 1, 1);
                    this.$store.commit('setForeColor', color.RGB2HEX(imageData.data));
                }
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

    function getPositionOnParent(element, parentElement) {
        let actualLeft = element.offsetLeft;
        let actualTop = element.offsetTop;

        let current = element.offsetParent;
        while (current !== parentElement) {
            actualLeft += current.offsetLeft;
            actualTop += current.offsetTop;
            current = current.offsetParent;
        }

        return {
            x: actualLeft,
            y: actualTop
        };
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
    .eyedropper, .eyedropper-alt{
        cursor: url("../cursor/Eyedropper.ico") 3 15, auto
    }
    .zoom{
        cursor: zoom-in;
    }
    .zoom-alt{
        cursor: zoom-out;
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
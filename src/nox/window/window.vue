<template>
    <div v-if="isShow" @mousemove="mousemove" @mouseup="isOvered = false">
        <div class="window" ref="window" :style="windowStyle">
            <div class="title-bar" @mousedown.prevent="mousedown"  @mouseover="isOvered = true" ref="title">
                <div class="title">{{ title }}</div>
                <div class="close" @click="close">×</div>
            </div>
            <div class="content"><slot :args="args"></slot></div>
        </div>
        <div class="shade" @click="twinkle"></div>
    </div>
</template>

<script>
    import Vue from 'vue';

    import windowEvent from './window-event';
    
    Element.prototype.playAnimation = function (animationName, duration, count) {
        let _this = this;
        if (!animationName) return;

        window.requestAnimationFrame(function() {
            _this.style.animation = '';
            window.requestAnimationFrame(function() {
                _this.style.animationName = animationName;
                _this.style.animationDuration = duration ? duration : '0.5s';
                _this.style.animationIterationCount = count ? count : 1;
            });
        });
    };

    export default {
        props: [
            'title'
        ],
        data () {
            return {
                isShow: false,
                isOvered: false,
                args: null,
                windowPos: {
                    x: 0,
                    y: 0
                },
                windowPosOnMousedown: {
                    x: 0,
                    y: 0
                },
                clientPosOnMousedown: {
                    x: 0,
                    y: 0
                }
            }
        },
        computed: {
            windowStyle() {
                return {
                    left: this.windowPos.x + 'px',
                    top: this.windowPos.y + 'px',
                }
            }
        },
        methods: {
            twinkle() {
                this.$refs.title.playAnimation('twinkleTitle', '0.15s', 6);
                this.$refs.window.playAnimation('twinkleBorder', '0.15s', 6);
            },
            close() {
                this.isShow = false;
            },
            mousedown(event) {
                if (this.isOvered) {
                    //记录窗口坐标
                    this.windowPosOnMousedown.x = this.windowPos.x;
                    this.windowPosOnMousedown.y = this.windowPos.y;
                    //记录鼠标坐标
                    this.clientPosOnMousedown.x = event.clientX;
                    this.clientPosOnMousedown.y = event.clientY;
                }
            },
            mousemove(event) {
                if (this.isOvered && event.buttons === 1) {
                    this.windowPos.x = this.windowPosOnMousedown.x + event.clientX - this.clientPosOnMousedown.x;
                    this.windowPos.y = this.windowPosOnMousedown.y + event.clientY - this.clientPosOnMousedown.y;
                }
            }
        },
        created() {
            let _this = this;
            windowEvent.$on('openWindow', function (windowTitle, args) {

                if (_this.title === windowTitle) {
                    _this.isShow = true;
                    if (args) _this.args = args;
                    Vue.nextTick(function () {
                        _this.windowPos.x = (window.innerWidth - _this.$refs.window.offsetWidth) / 2;
                        _this.windowPos.y = (window.innerHeight - _this.$refs.window.offsetHeight) / 2;
                    });
                }
            });
            windowEvent.$on('closeWindow', function (windowTitle) {
                if (_this.title === windowTitle) {
                    _this.isShow = false;
                }
            });
        }
    };
</script>

<style scoped="">
    @keyframes twinkleBorder {
        from {
            border-color: #ff3e3e;
        }
        to {
            border-color: #2c2c2c;
        }
    }

    @keyframes twinkleTitle {
        from {
            background-color: #fff;
        }
        to {
            background-color: #2c2c2c;
        }
    }

    .window{
        position: fixed;
        background: #535353;
        border: 1px solid #6a6a6a;
        z-index: 500;
    }
    .title-bar{
        position: relative;
        height: 2rem;
        background: #2c2c2c;
        overflow: hidden;
        cursor: default;
    }
    .title{
        position: absolute;
        margin: 0;
        padding-left: 1rem;
        line-height: 2rem;
    }
    /*标题栏关闭按钮*/
    .title-bar .close{
        position: absolute;
        top: 0;
        right: 0;
        margin: 0;
        padding: 0 1.5rem;
        font-size: 1.2rem;
        line-height: 2rem;
        transition: all .6s;
    }
    /*.title-bar .close::before{*/
        /*content: '\2716';*/
    /*}*/
    .title-bar .close:hover{
        background: #ff3e36;
    }
    .content{
        padding: 1em;
        max-width: 80vw;
        max-height: 80vh;
        overflow: auto;
    }
    .shade{
        position: fixed;
        left: 0;
        top: 0;
        width: 100vw;
        height: 100vh;
        z-index: 100;
        /*background: #352370;*/
    }
</style>
<template>
    <li @click="click" ref="menuItem" :style="liStyle">
        <slot></slot>
        <span class="hotkey" v-if="hotkey">{{ hotkey }}</span>
    </li>
</template>

<script>
    export default {
        props: {
            hotkey: {
                type: String,
                validator(value) {
                    return /^((Ctrl|Alt|Shift)\+){0,3}[A-Za-z0-9]{1}$/.test(value);
                }
            }
        },
        computed: {
            liStyle() {
                return {
                    paddingRight: (this.hotkey ? this.hotkey.length : 1.5) + 'em'
                }
            }
        },
        mounted() {
            if (this.hotkey) {
                let hotkey = this.hotkey;
                let menuItem = this.$refs.menuItem;
                window.addEventListener('keydown', function (event) {
                    let isAssKeydown = true, key = '';

                    if (/Ctrl/.test(hotkey)) isAssKeydown = isAssKeydown && event.ctrlKey;
                    if (/Alt/.test(hotkey)) isAssKeydown = isAssKeydown && event.altKey;
                    if (/Shift/.test(hotkey)) isAssKeydown = isAssKeydown && event.shiftKey;

                    let indexOfAdd = hotkey.lastIndexOf('+');
                    if (indexOfAdd) {
                        key = hotkey.substring(indexOfAdd + 1);
                    } else {
                        key = hotkey;
                    }

                    if (isAssKeydown && event.key.toUpperCase() === key) {
                        menuItem.click();
                    }
                })
            }
        },
        methods: {
            click: function () {
                this.$emit('click');
            }
        }
    }
</script>

<style scoped="">
    li{
        display: block;
        padding: 0.1em 1.5em;
        white-space: nowrap;
    }
    li:hover{
        background: #f0f0f0;
        color: #2c2c2c;
    }
    li[divide]{
        border-bottom: 0.1em solid #f0f0f0;
    }
    li[disabled]{
        color: #8F8F8F;
    }
    li[disabled]:hover{
        background: #717171;
        color: #8F8F8F;
    }
    li .hotkey{
        position: absolute;
        right: 1em;
        margin-left: 3em;
        color: #8f8f8f;
    }

    li a{
        color: inherit;
        text-decoration: none;
    }
    li a:hover{
        text-decoration: none;
    }
</style>
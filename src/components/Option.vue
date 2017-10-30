<template>
<div class="option">
    <span id="current-tool" class="iconfont" :class="activeTool.icon"></span>
    <div id="option-blush">
        <span>size: </span><input type="range" min="1" max="200" step="1">
    </div>
</div>
</template>


<script>
export default {
    computed: {
        activeTool() {
            return this.$store.getters.activeTool
        }
    }
}
</script>


<style>
    /*选项栏*/
    .option{
        height: 2em;
        margin: 0.2em 0;
        padding-left: 0.5em;
        background: #535353;
        font-size: 1em;
    }

    .option div{
        display: none;
    }
    .option div.actived{
        display: inline-block;
    }
    .option *{
        display: inline;
        margin: 0 5px;
        padding: 0;
        line-height: 30px;
    }

    .option #current-tool{
        font-size: 1em;
        line-height: 2em;
    }
</style>
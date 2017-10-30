<template>
<div class="panel" id="layer">
    <ul v-if="activeLayers.length !== 0">
        <li v-for="layer in activeLayers">
            <div
                    class="visible"
                    @click="layer.isVisible = !layer.isVisible"
                    :class="layer.isVisible ? 'fa fa-eye' : 'hidden'">
            </div>
            <img class="thumbs" :src="layer.image.src" alt="thumbs" :key="layer.id">
            <span class="name">{{ layer.name }}</span>
        </li>
    </ul>
    <div class="handle"></div>
</div>
</template>

<script>
import {mapGetters} from 'vuex';

export default {

    computed: mapGetters([
        'activeLayers'
    ]),
    methods: {
        createLayer() {
            this.$store.state.activeDocument.createLayer();
        }
    }
}
</script>

<style scoped="">
#layer{
    height: 50%;
}
#layer ul{
    margin: 0;
    padding: 0;
}
#layer li{
    list-style-type: none;
    background: #404040;
    padding: 0.2em 1em;
    margin: 0.2em 0;
    font-size: 0.8em;
}
#layer li *{
    display: inline-block;
    margin: 0 0.2em;
    vertical-align: middle;
}
#layer li .thumbs{
    background: url("../image/TransparentGrid.jpg");
    -webkit-background-size: cover;
    background-size: cover;
    max-width: 3em;
    max-height: 2em;
}
#layer li .visible{
    width: 1em;
    height: 1em;
    margin: 0 0.2em;
}
#layer li .visible.hidden{
    background: #535353;
}
</style>
<template>
<div id="design-boards">
    <ul class="pixel-documents">
        <li
                v-for="pixelDocument in pixelDocuments"
                :key="pixelDocument.id"
                is="PixelDocument"
                :isActive="pixelDocument === activeDocument"
                :fileName="pixelDocument.fileName"
                :background-image="pixelDocument.backgroundImage"
                :layers="pixelDocument.layers"
                @click.native="switchTo(pixelDocument)"
                @close="closeDocument(pixelDocument)"
        >
        </li>
    </ul>
</div>
</template>


<script>
    import {mapGetters, mapMutations} from 'vuex';
    import tools from '../tools';
    import Document from './Document.vue';

    export default {
        components: {
            PixelDocument: Document
        },
        data() {
            return {
                tools: tools
            };
        },
        computed: {
            ...mapGetters([
                'pixelDocuments',
                'activeDocument',
                'activeTool'
            ])
        },
        methods: {
            ...mapMutations([
                'createLayer',
                'switchTo',
                'closeDocument',
                'setCanvasOfLayer',
                'drawImageOnCanvas'
            ])
        }
    }
</script>


<style scoped="">
    #design-boards{
        position: relative;
        height: 100%;
        margin: 0 15em 0 2.4em;
        z-index: 1;
        overflow: hidden;
    }
    ul.pixel-documents{
        font-size: 0.8em;
        margin-bottom: 0.3em;
        list-style-type: none;
        background: #3b3b3b;
    }

</style>
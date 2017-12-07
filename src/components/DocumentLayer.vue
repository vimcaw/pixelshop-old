<template>
    <li>
        <canvas ref="canvas"></canvas>
    </li>
</template>

<script>
    export default {
        props: {
            id: Number,
            image: Image
        },
        data() {
            return {
                realtimeImage: this.image || new Image()
            }
        },
        computed: {

        },
        mounted() {
            this.$nextTick(function () {
                let context = this.$refs.canvas.getContext('2d');
                this.$refs.canvas.width = this.image.width;
                this.$refs.canvas.height = this.image.height;
                context.drawImage(this.image, 0, 0);
//                this.updateImage();
            });
        },
        methods: {
            updateImage() {
                this.realtimeImage.src = this.$refs.canvas.toDataURL();
                this.$emit('update', this.id, this.realtimeImage);
            }
        }
    }
</script>

<style></style>
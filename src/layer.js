export default function Layer($container, image) {
    this.$canvas = document.createElement('canvas');
    let context = this.$canvas.getContext('2d');
    $container.appendChild(this.$canvas);
    if (image) {
        this.$canvas.width = image.width;
        this.$canvas.height = image.height;
        context.drawImage(image, 0, 0);
    }
}

Layer.prototype = {
    construct: Layer,
    hide: function () {
        this.$canvas.style.visibility = 'hidden';
    }
};

export default {
    move: {
        icon: 'icon-yidong'
    },
    crop: {
        icon: 'icon-tupiancaijian'
    },
    eyedropper: {
        icon: 'icon-icon-straw',
        onclick(event) {
            let x = $('#pos-x').innerText,
                y = $('#pos-y').innerText,
                imageData = documentDirector.activeDocument.context.getImageData(x, y, 1, 1);
            color.setForeColor(color.RGB2HEX(imageData.data));
        }
    },
    blush: {
        icon: 'icon-icon'
    },
    eraser: {
        icon: 'icon-xiangpi'
    },
    text: {
        icon: 'icon-wenben'
    },
    rect: {
        icon: 'icon-juxing'
    },
    hand: {
        icon: 'icon-hand'
    },
    zoom: {
        icon: 'icon-fangdajing',
        cursor: 'zoom-in',
        onkeydown() {
            if (event.altKey) {
                alert('here')
                //_isZoomIn = false;
                //documentDirector.activeDocument.$canvas.style.cursor = 'zoom-out';
            }
        }
    }
}

export default {
    Move: {
        icon: 'icon-yidong'
    },
    Crop: {
        icon: 'icon-tupiancaijian'
    },
    Eyedropper: {
        icon: 'icon-icon-straw',
        onclick(event) {
        // let x = $('#pos-x').innerText,
        //     y = $('#pos-y').innerText,
        //     imageData = documentDirector.activeDocument.context.getImageData(x, y, 1, 1);
        //
        // color.setForeColor(color.RGB2HEX(imageData.data));
    }
    },
    Blush: {
        icon: 'icon-icon'
    },
    Eraser: {
        icon: 'icon-xiangpi'
    },
    Text: {
        icon: 'icon-wenben'
    },
    Rect: {
        icon: 'icon-juxing'
    },
    Hand: {
        icon: 'icon-hand'
    },
    Zoom: {
        icon: 'icon-fangdajing',
        onkeydown() {
            if (event.altKey) {
                alert('here')
                //_isZoomIn = false;
                //documentDirector.activeDocument.$canvas.style.cursor = 'zoom-out';
            }
        }
    }
}
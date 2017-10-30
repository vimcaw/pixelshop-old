

let recentFiles = localStorage.recentFiles ? JSON.parse(localStorage.recentFiles) : [];

import store from '../index';

function Layer(name, image) {
    this.isVisible = true;
    this.name = name;
    this.image = image;
    this.src = '';
    this.layers = [];
}

function PixelDocument (backgroundImage, fileName) {
    this.fileName = fileName ? fileName : _getUrlFileName(src);
    this.backgroundImage = backgroundImage;
    this.layers = [new Layer("Background", backgroundImage)];
    store.commit('addRecentFile', {
        fileName: fileName,
        src: backgroundImage.src,
        date: new Date().toLocaleString()
    });
}

    // $board.bindWhellOver(function (event) {
    //     if (event.ctrlKey) {
    //         //如果ctrl键按下，滑动滚轮左右移动画布
    //         if (event.deltaY > 0) {
    //             this.scrollLeft += 200;
    //         } else {
    //             this.scrollLeft -= 200;
    //         }
    //         return false;
    //     } else if (event.altKey) {
    //         //如果alt键按下，缩放画布
    //         let x = event.clientX - _this.$canvases.getViewOffsetLeft(),
    //             y = event.clientY - _this.$canvases.getViewOffsetTop();
    //         if (event.deltaY > 0) {
    //             _this.scalingUp(-0.2, x, y);
    //         } else {
    //             _this.scalingUp(0.2, x, y);
    //         }
    //         return false;
    //     }
    // });

    // Element.prototype.bindWhellOver = function (callback) {
    //     let isOnOver = false;
    //     this.onmouseover = function () {
    //         isOnOver = true;
    //     };
    //     this.onmouseout = function () {
    //         isOnOver = false;
    //     };
    //     window.onwheel = function (event) {
    //         if (isOnOver && callback) {
    //             return callback.call(this, event);
    //         }
    //     };
    // };


//     scalingUp(increment, centerX, centerY) {
//         if (increment && typeof increment === 'number') {
//             this.scaling += increment
//             this.scaling = limit(this.scaling, 0.1, 32);
//             // let oldscaling = this.scaling;
//             // this.scaling += increment;
//             // this.scale(this.scaling);
//             // if (x && y) {
//             //     $view.scrollLeft = scaling * ($view.scrollLeft + centerX) / oldscaling - centerX;
//             //     $view.scrollTop = scaling * ($view.scrollTop + centerY) / oldscaling - centerY;
//             // }
//             // if ($canvas.offsetWidth <= $view.offsetWidth) {
//             // 	$view.addClass('disable-scroll-x');
//             // } else {
//             // 	$view.removeClass('disable-scroll-x');
//             // }
//             // if ($canvas.offsetHeight <= $view.offsetHeight) {
//             // 	$view.addClass('disable-scroll-y');
//             // } else {
//             // 	$view.removeClass('disable-scroll-y');
//             // }
//         }
//     },


export default {
    state: {
        pixelDocuments: [],
        activeDocument: null,
        recentFiles: recentFiles
    },
    getters: {
        isWelcomePage: state => state.isWelcomePage,
        pixelDocuments: state => state.pixelDocuments,
        activeDocument: state => state.activeDocument,
        activeLayers: state => state.activeDocument ? state.activeDocument.layers : [],
        recentFiles: state => state.recentFiles
    },
    mutations: {
        createDocument(state, documentInfo) {
            let fileName = documentInfo.fileName || 'Unnamed';
            let backgroundImage = documentInfo.backgroundImage || null;
            let newDocument = new PixelDocument(backgroundImage, fileName);

            state.pixelDocuments.push(newDocument);
            state.activeDocument = newDocument;
        },
        switchTo(state, pixelDocument) {
            state.activeDocument = pixelDocument;
        },
        closeDocument(state, pixelDocument) {
            let index = state.pixelDocuments.indexOf(pixelDocument);
            state.pixelDocuments.splice(index, 1);

            if (state.pixelDocuments[index]) {
                state.activeDocument = state.pixelDocuments[index];
            } else if (state.pixelDocuments[index - 1]) {
                state.activeDocument = state.pixelDocuments[index - 1];
            } else {
                state.activeDocument = null;
                state.isWelcomePage = true;
            }
        },
        createLayer(state, layerInfo) {
            if (layerInfo) {
                state.activeDocument.layers.push({
                    name: layerInfo.name || "Layer " + this.length,
                    image: layerInfo.image || null
                })
            } else {
                state.activeDocument.layers.push({
                    name: "Layer " + this.length
                });
            }
        },
        openImage(state, fileInfo) {
            let image = new Image();
            image.src = fileInfo.src;
            let _this = this;
            let isRepetition = false;
            image.addEventListener('load', function () {
                _this.getters.pixelDocuments.forEach(function (pixelDocument) {
                    if (pixelDocument.backgroundImage.src === image.src) {
                        alert('This file has been opened!');
                        isRepetition = true;
                        return false;
                    }
                });

                if (!isRepetition) {
                    _this.commit('createDocument', {fileName: fileInfo.fileName, backgroundImage: image});
                }

            }, false);
            image.addEventListener('error', function () {
                alert('Loading image failed, please try again, or try other ways to open.');
            }, false);
        },
        createLayer(state, image) {
            let layers = state.activeDocument.layers;
            let layerName = layers.length === 0 ? 'Background' : ('Layer ' + layers.length);

            layers.push({
                name: layerName,
                image: image
            });

        },
        addRecentFile(state, file) {
            let _this = this;
            state.recentFiles.forEach(function (item, index) {
                if (item.fileName === file.fileName && item.src === file.src) {
                    _this.commit('removeRecentFile', item);
                    return false;
                }
            });

            state.recentFiles.unshift(file);
            localStorage.setItem('recentFiles', JSON.stringify(state.recentFiles));
        },
        removeRecentFile(state, file) {
            state.recentFiles.forEach(function (item, index) {
                if (item === file) {
                    state.recentFiles.splice(index, 1);
                }
            });
            localStorage.setItem('recentFiles', JSON.stringify(state.recentFiles));
        },
    }
}
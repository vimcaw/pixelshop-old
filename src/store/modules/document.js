let recentFiles = localStorage.recentFiles ? JSON.parse(localStorage.recentFiles) : [];

function PixelDocument (backgroundImage, fileName) {
    this.fileName = fileName ? fileName : _getUrlFileName(src);
    this.backgroundImage = backgroundImage;
    this.image = backgroundImage;
    this.layers = [new Layer("Background", backgroundImage)];
}

function Layer(name, image) {
    this.isVisible = true;
    this.name = name;
    this.image = image;
    this.src = '';
}

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

            this.commit('addRecentFile', {
                fileName: newDocument.fileName,
                src: newDocument.backgroundImage.src,
                date: new Date().toLocaleString()
            });

            state.pixelDocuments.push(newDocument);
            state.activeDocument = newDocument;
        },
        openImage(state, fileInfo) {
            let isRepetition = false;
            this.getters.pixelDocuments.forEach(function (pixelDocument) {
                if (pixelDocument.backgroundImage.src === fileInfo.src) {
                    alert('This file has been opened!');
                    isRepetition = true;
                    return false;
                }
            });
            if (isRepetition) return false;
            let image = new Image();
            image.src = fileInfo.src;
            let _this = this;

            image.addEventListener('load', function () {
                _this.commit('createDocument', {
                    fileName: fileInfo.fileName,
                    backgroundImage: image
                });
            }, false);
            image.addEventListener('error', function () {
                alert('Loading image failed, please try again, or try other ways to open.');
            }, false);
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
        switchTo(state, pixelDocument) {
            state.activeDocument = pixelDocument;
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
        updateImage(state, image) {
            state.activeDocument.image = image;
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
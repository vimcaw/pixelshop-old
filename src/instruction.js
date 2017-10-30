import store from './store/index';
import Nox from './nox';

export default {
    methods: {
        openFromLocal() {
            if (!FileReader) {
                return Nox.openWindow("Can't Read Local File");
            }
            let inpFile = document.createElement('input');
            inpFile.type = 'file';
            inpFile.click();
            inpFile.onchange = function () {
                if (this.value) {
                    let reader = new FileReader(),
                        file = this.files[0];
                    reader.readAsDataURL(file);
                    reader.addEventListener('load', function() {
                        store.commit('openImage', {src: this.result, fileName: file.name});
                    }, false);
                }
            };
        },
        save() {
            let downloader = document.createElement('a'),
                imageName = '',
                imageFormat = '',
                format = {
                    png: 'png',
                    jpg: 'jpeg',
                    webp: 'webp'
                };
            imageName = store.getters.activeDocument.fileName;
            let result = store.getters.activeDocument.fileName.match(/\..+/g);
            imageFormat = result && result[result.length - 1].substring(1);
            downloader.download = imageName;

            // downloader.href = designBoardDirector.current.$canvas.toDataURL('image/' + format[imageFormat]);
            downloader.click();
        },
        about() {
            store.commit('openWindow', 'about')
        }
    }
}
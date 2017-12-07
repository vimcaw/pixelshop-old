import Vue from 'vue';

import Menu from './menu';
import {Window, windowEvent} from './window';

let components = [Menu, Window];

components.forEach(function (module) {
    Object.keys(module).forEach(function (key) {
        Vue.component(key, module[key]);
    });
});

export default {
    openWindow: function (windowTitle, args) {
        windowEvent.$emit('openWindow', windowTitle, args);
    },
    closeWindow: function (windowTitle) {
        windowEvent.$emit('closeWindow', windowTitle);
    }
}
/**
 * Created by vimcaw on 2017/5/27.
 */
import Vue from 'vue';

import './style.css';
// import './windowsUI.css';
import './iconfont/iconfont.css';
import './font-awesome-4.7.0/css/font-awesome.min.css';

import './element';
import './common';
// import './tool';

import {$} from './element';

import App from './components/App.vue';
import store from './store/index';

new Vue({
    el: '#app',
    store,
	render: h => h(App)
});

function getlimitSize($img, maxWidth, maxHeight) {
	let width = $img.width,
		height = $img.height;
	
	if (width > maxWidth && height > maxHeight) {
		//如果宽高都超过限制，取宽高中最大值，按比例缩放至符合要求的最大尺寸
		let rate = width / height;
		let max = Math.max(width, height);
		if (max === width) {
			width = maxWidth;
			height = maxWidth / rate;
		} else {
			height = maxHeight;
			width = maxHeight * rate;
		}
	} else if (width > maxWidth) {
		width = maxWidth;
	} else if (height > maxHeight) {
		height = maxHeight;
	}
	
	return {
		width: width,
		height: height
	};
}

function limitImageSize($img, maxWidth, maxHeight) {
	let size = getlimitSize($img, maxWidth, maxHeight);
	$img.width = size.width;
	$img.height = size.height;
}



/**
 * 窗口操作指令集
 * @type {{full-screen: windowCommand.full-screen}}
 */
let windowCommand = {
	'full-screen'() {
		let fullscreenElement = document.fullscreenElement ||
			document.mozFullScreenElement ||
			document.webkitFullscreenElement;
		
		if (fullscreenElement) {
			fullScreen.exitFullscreen(document.documentElement);
		} else {
			fullScreen.launchFullscreen(document.documentElement);
		}
	}
};

/**
 * 给窗口操作按钮添加指令
 * @param $windowControlUl {HTMLUListElement} 要绑定的按钮列表
 * @param command {Object} 要添加的指令集
 */
let bindWindowControlClick = function ($windowControlUl, commandSet) {
	// let $uls = $windowControlUl.children;
	// $uls.forEach(function (item) {
	// 	let id = getIdSuffix(item.id);
	// 	if (id && commandSet[id]) {
	// 		item.onclick = function () {
	// 			commandSet[id]();
	// 		}
	// 	}
	//
	// });
};

let defaultKeymap = {
	menu: {
		new: '',
		openFromLocal: 'Ctrl+O'
	},
	tool: {
		move: 'V',
		crop: 'C',
		eyedropper: 'I',
		blush: 'B',
		eraser: 'E',
		text: 'T',
		rect: 'U',
		hand: 'H',
		zoom: 'Z'
	},
	color: {
		reset: 'D',
		exchange: 'X'
	}
};


bindWindowControlClick($('.window-control'), windowCommand);
window.oncontextmenu = function () {
	return false;
};

String.prototype.firstUpperCase=function(){
    return this.replace(/^\S/,function(s){return s.toUpperCase();});
}
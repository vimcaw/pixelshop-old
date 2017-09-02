/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 5);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = $;
/* harmony export (immutable) */ __webpack_exports__["b"] = $$;
/**
 * query选择器
 * @param selector {String} 选择器
 * @returns {*} {Node/NodeList} 若为id选择器，返回单个元素，否则返回NodeList
 */
function $ (selector) {
	return document.querySelector(selector);
};

function $$ (selector) {
	return document.querySelectorAll(selector);
}

NodeList.prototype.forEach = function (callback) {
	for (var i = 0,item; item = this[i++];) {
		callback(item, i - 1);
	}
};

HTMLCollection.prototype.forEach = NodeList.prototype.forEach;

/**
 * 给某个元素添加类名
 * @param className {string} 要添加的类名
 */
Element.prototype.addClass= function (className) {
    if (this.className === '') {
        this.className = className;
    } else {
        this.className += ' ' + className;
    }
};

/**
 * 移除元素的某个类名
 * @param className {string} 要移除的类名
 * @returns {boolean} 如果找不到该类名则返回 false，成功移除返回 true
 */
Element.prototype.removeClass = function (className) {
    var regExpMatch = new RegExp('^' + className + '$|^'
        + className + ' +| +'
        + className + '$| +'
        + className + ' +');

    if (this.className.match(regExpMatch)) {        //找到符合的类名
        this.className = this.className.replace(regExpMatch, '');
        return true;
    } else {        //找不到该类名
        return false;
    }
};

Element.prototype.disabled = function () {
	this.addClass('disabled');
}

Element.prototype.enable = function () {
	this.removeClass('disabled');
}

/**
 * 获取网页元素相对浏览器左部的距离
 * @returns {number} 网页元素相对浏览器左部的距离
 */
Element.prototype.getViewOffsetLeft = function () {
	var actualLeft = this.offsetLeft;
	var current = this.offsetParent;
	while (current !== null) {
		actualLeft += current.offsetLeft;
		current = current.offsetParent;
	}
	if (document.compatMode == "BackCompat") {
		var elementScrollLeft = document.body.scrollLeft;
	} else {
		var elementScrollLeft = document.documentElement.scrollLeft;
	}
	return actualLeft - elementScrollLeft;
};

/**
 * 获取网页元素相对浏览器顶部的距离
 * @returns {number} 网页元素相对浏览器顶部的距离
 */
Element.prototype.getViewOffsetTop = function () {
	var actualTop = this.offsetTop;
	var current = this.offsetParent;
	while (current !== null) {
		actualTop += current. offsetTop;
		current = current.offsetParent;
	}
	if (document.compatMode == "BackCompat") {
		var elementScrollTop = document.body.scrollTop;
	} else {
		var elementScrollTop = document.documentElement.scrollTop;
	}
	return actualTop - elementScrollTop;
};

/**
 * 让某个元素播放一次动画（通过切换类名实现），可多次触发
 * @param $element {Element} 要播放动画的元素
 * @param classBefore {String} 播放之前，没有animation属性的class
 * @param classAfter {String} 带有animation属性的class
 */
Element.prototype.playAnimation = function ( classBefore, classAfter) {
	this.className = classBefore;
	window.requestAnimationFrame(function(time) {
		window.requestAnimationFrame(function(time) {
			this.className = classAfter;
		});
	});
}

/***/ }),
/* 1 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

var stylesInDom = {};

var	memoize = function (fn) {
	var memo;

	return function () {
		if (typeof memo === "undefined") memo = fn.apply(this, arguments);
		return memo;
	};
};

var isOldIE = memoize(function () {
	// Test for IE <= 9 as proposed by Browserhacks
	// @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
	// Tests for existence of standard globals is to allow style-loader
	// to operate correctly into non-standard environments
	// @see https://github.com/webpack-contrib/style-loader/issues/177
	return window && document && document.all && !window.atob;
});

var getElement = (function (fn) {
	var memo = {};

	return function(selector) {
		if (typeof memo[selector] === "undefined") {
			memo[selector] = fn.call(this, selector);
		}

		return memo[selector]
	};
})(function (target) {
	return document.querySelector(target)
});

var singleton = null;
var	singletonCounter = 0;
var	stylesInsertedAtTop = [];

var	fixUrls = __webpack_require__(10);

module.exports = function(list, options) {
	if (typeof DEBUG !== "undefined" && DEBUG) {
		if (typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};

	options.attrs = typeof options.attrs === "object" ? options.attrs : {};

	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (!options.singleton) options.singleton = isOldIE();

	// By default, add <style> tags to the <head> element
	if (!options.insertInto) options.insertInto = "head";

	// By default, add <style> tags to the bottom of the target
	if (!options.insertAt) options.insertAt = "bottom";

	var styles = listToStyles(list, options);

	addStylesToDom(styles, options);

	return function update (newList) {
		var mayRemove = [];

		for (var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];

			domStyle.refs--;
			mayRemove.push(domStyle);
		}

		if(newList) {
			var newStyles = listToStyles(newList, options);
			addStylesToDom(newStyles, options);
		}

		for (var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];

			if(domStyle.refs === 0) {
				for (var j = 0; j < domStyle.parts.length; j++) domStyle.parts[j]();

				delete stylesInDom[domStyle.id];
			}
		}
	};
};

function addStylesToDom (styles, options) {
	for (var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];

		if(domStyle) {
			domStyle.refs++;

			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}

			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];

			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}

			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles (list, options) {
	var styles = [];
	var newStyles = {};

	for (var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = options.base ? item[0] + options.base : item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};

		if(!newStyles[id]) styles.push(newStyles[id] = {id: id, parts: [part]});
		else newStyles[id].parts.push(part);
	}

	return styles;
}

function insertStyleElement (options, style) {
	var target = getElement(options.insertInto)

	if (!target) {
		throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
	}

	var lastStyleElementInsertedAtTop = stylesInsertedAtTop[stylesInsertedAtTop.length - 1];

	if (options.insertAt === "top") {
		if (!lastStyleElementInsertedAtTop) {
			target.insertBefore(style, target.firstChild);
		} else if (lastStyleElementInsertedAtTop.nextSibling) {
			target.insertBefore(style, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			target.appendChild(style);
		}
		stylesInsertedAtTop.push(style);
	} else if (options.insertAt === "bottom") {
		target.appendChild(style);
	} else {
		throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
	}
}

function removeStyleElement (style) {
	if (style.parentNode === null) return false;
	style.parentNode.removeChild(style);

	var idx = stylesInsertedAtTop.indexOf(style);
	if(idx >= 0) {
		stylesInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement (options) {
	var style = document.createElement("style");

	options.attrs.type = "text/css";

	addAttrs(style, options.attrs);
	insertStyleElement(options, style);

	return style;
}

function createLinkElement (options) {
	var link = document.createElement("link");

	options.attrs.type = "text/css";
	options.attrs.rel = "stylesheet";

	addAttrs(link, options.attrs);
	insertStyleElement(options, link);

	return link;
}

function addAttrs (el, attrs) {
	Object.keys(attrs).forEach(function (key) {
		el.setAttribute(key, attrs[key]);
	});
}

function addStyle (obj, options) {
	var style, update, remove, result;

	// If a transform function was defined, run it on the css
	if (options.transform && obj.css) {
	    result = options.transform(obj.css);

	    if (result) {
	    	// If transform returns a value, use that instead of the original css.
	    	// This allows running runtime transformations on the css.
	    	obj.css = result;
	    } else {
	    	// If the transform function returns a falsy value, don't add this css.
	    	// This allows conditional loading of css
	    	return function() {
	    		// noop
	    	};
	    }
	}

	if (options.singleton) {
		var styleIndex = singletonCounter++;

		style = singleton || (singleton = createStyleElement(options));

		update = applyToSingletonTag.bind(null, style, styleIndex, false);
		remove = applyToSingletonTag.bind(null, style, styleIndex, true);

	} else if (
		obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function"
	) {
		style = createLinkElement(options);
		update = updateLink.bind(null, style, options);
		remove = function () {
			removeStyleElement(style);

			if(style.href) URL.revokeObjectURL(style.href);
		};
	} else {
		style = createStyleElement(options);
		update = applyToTag.bind(null, style);
		remove = function () {
			removeStyleElement(style);
		};
	}

	update(obj);

	return function updateStyle (newObj) {
		if (newObj) {
			if (
				newObj.css === obj.css &&
				newObj.media === obj.media &&
				newObj.sourceMap === obj.sourceMap
			) {
				return;
			}

			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;

		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag (style, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (style.styleSheet) {
		style.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = style.childNodes;

		if (childNodes[index]) style.removeChild(childNodes[index]);

		if (childNodes.length) {
			style.insertBefore(cssNode, childNodes[index]);
		} else {
			style.appendChild(cssNode);
		}
	}
}

function applyToTag (style, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		style.setAttribute("media", media)
	}

	if(style.styleSheet) {
		style.styleSheet.cssText = css;
	} else {
		while(style.firstChild) {
			style.removeChild(style.firstChild);
		}

		style.appendChild(document.createTextNode(css));
	}
}

function updateLink (link, options, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	/*
		If convertToAbsoluteUrls isn't defined, but sourcemaps are enabled
		and there is no publicPath defined then lets turn convertToAbsoluteUrls
		on by default.  Otherwise default to the convertToAbsoluteUrls option
		directly
	*/
	var autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;

	if (options.convertToAbsoluteUrls || autoFixUrls) {
		css = fixUrls(css);
	}

	if (sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = link.href;

	link.href = URL.createObjectURL(blob);

	if(oldSrc) URL.revokeObjectURL(oldSrc);
}


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return windowUIList; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return bindMenuClick; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return getIdSuffix; });
//常用函数封装

/**
 * query选择器
 * @param selector {String} 选择器
 * @returns {*} {Node/NodeList} 若为id选择器，返回单个元素，否则返回NodeList
 */
var $$ = function (selector) {
	return document.querySelectorAll(selector);
};

/**
 * 遍历数组或类数组并对每项进行操作
 * @param array {Array} 要遍历的数组
 * @param callback {Function} 对每项进行处理的函数
 */
var forEach = function (array, callback) {
	for (var i = 0,item; item = array[i++];) {
		callback(item, i - 1);
	}
};

/**
 * 给某个元素添加类名
 * @param className {string} 要添加的类名
 */
Element.prototype.addClass= function (className) {
	if (this.className === '') {
		this.className = className;
	} else {
		this.className += ' ' + className;
	}
};

/**
 * 移除元素的某个类名
 * @param className {string} 要移除的类名
 * @returns {boolean} 如果找不到该类名则返回 false，成功移除返回 true
 */
Element.prototype.removeClass = function (className) {
	var regExpMatch = new RegExp('^' + className + '$|^'
		+ className + ' +| +'
		+ className + '$| +'
		+ className + ' +');
	
	if (this.className.match(regExpMatch)) {        //找到符合的类名
		this.className = this.className.replace(regExpMatch, '');
		return true;
	} else {        //找不到该类名
		return false;
	}
};

/**
 * 让某个元素播放一次动画（通过切换类名实现），可多次触发
 * @param $element {Element} 要播放动画的元素
 * @param classBefore {String} 播放之前，没有animation属性的class
 * @param classAfter {String} 带有animation属性的class
 */
function playAnimation($element, classBefore, classAfter) {
	$element.className = classBefore;
	window.requestAnimationFrame(function() {
		window.requestAnimationFrame(function() {
			$element.className = classAfter;
		});
	});
}

/**
 * 使某个元素可以被鼠标拖动来改变位置
 * @param $enable 能发生拖动的元素
 * @param $move 被拖动的元素
 */
var setDragMoving = function ($enable, $move) {
	var isDraging = false;
	var oldPosX, oldPosY, startPosX, startPosY;
	
	/**
	 * 使浮出层保持在屏幕内
	 * @param pos {Number} 浮出层的坐标
	 * @param maxPos {Number} 浮出层的最大坐标
	 * @returns {Number} 修正后的坐标
	 */
	var getPosInScreen = function (pos, maxPos) {
		if (pos < 0) {
			return 0;
		}
		else if (pos > maxPos) {
			return maxPos;
		}
		else {
			return pos;
		}
	};
	
	$enable.addEventListener('mousedown', function (event) {
		isDraging = true;
		//保存要移动的对象的当前位置
		oldPosX = parseInt($move.style.left.split('px')[0]);
		oldPosY = parseInt($move.style.top.split('px')[0]);
		//保存鼠标当前的位置
		startPosX = event.screenX;
		startPosY = event.screenY;
		return false;       //防止浏览器选中内容
	});
	
	window.addEventListener('mouseup', function () {
		isDraging = false;
	});
	
	window.addEventListener('mousemove', function (event) {
		if (isDraging) {
			//当前坐标 = 开始拖动时浮出层的坐标 + 鼠标移动的坐标
			var currentPosX = oldPosX + event.screenX - startPosX;
			var currentPosY = oldPosY + event.screenY - startPosY;
			
			//最大拖动范围
			var maxPosX = window.innerWidth - $move.offsetWidth;
			var maxPosY = window.innerHeight - $move.offsetHeight;
			
			//修正当前坐标，使浮出层保持在屏幕内
			currentPosX = getPosInScreen(currentPosX, maxPosX);
			currentPosY = getPosInScreen(currentPosY, maxPosY);
			
			$move.style.left = currentPosX + 'px';
			$move.style.top = currentPosY + 'px';
		}
	});
};

/**
 * 获取某个radio选中的元素
 * @param radioName {String} 要获取的name属性
 * @returns {HTMLInputElement} 选中的元素
 */
function getRadioCheckedElement(radioName) {
	var $radios = document.getElementsByName(radioName);
	for (var i = 0, item; item = $radios[i++];) {
		if (item.checked) {
			return item;
		}
	}
}

/**
 * 遍历监听radio的change事件
 * @param radioName {String} 要监听的radio的name
 * @param callback {Function} 对change之后新选中的元素进行操作的回调，this指向新选中的元素
 */
function listenRadioChange(radioName, callback) {
	var $radios = document.getElementsByName(radioName);
	forEach($radios, function (item) {
		item.addEventListener('change', function () {
			if (this.checked) {
				return callback.call(this, arguments);
			}
		});
	});
}

/**
 * 获取元素id后缀（第一个横杠“-”以后的内容）
 * @param id {string} 要获取后缀的id
 * @returns {string} id后缀
 */
function getIdSuffix(id) {
	var index = id.indexOf('-');
	if (index === -1) {
		return id;
	} else {
		return id.substring(index + 1);
	}
}

/*---------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------*/
/*---------------------------------- Menu -----------------------------------*/
/*---------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------*/

/**
 * 遍历所有子菜单并执行操作
 * @param $ul {HTMLUIListElement} 菜单ul容器元素
 * @param callback {Function} 对每个子菜单执行操作的回调函数，传递该子菜单元素作为回调参数
 */
function forEachMenu ($ul, callback) {
	var $uls = $ul.children;
	forEach($uls, function (item) {
		if (item.children.length === 0) {
			callback(item);
		} else {
			forEachMenu(item.querySelector('ul'), callback);
		}
	});
}

/**
 * 给菜单绑定指令
 * @param $menuUl {HTMLUListElement} 要绑定的菜单列表
 * @param commandSet {Object} 要绑定的指令集
 */
function bindMenuClick ($menuUl, commandSet) {
	//遍历菜单，给每项子菜单绑定指令集中的指令
	forEachMenu($menuUl, function (item) {
		var id = item.id.search('-') ? getIdSuffix(item.id) : item.id;      //id值去前缀
		if (id && commandSet[id]) {
			item.onclick = function () {
				commandSet[id]();
			};
		} else {
			item.onclick = function () {
				alert('undefined Task');
			}
		}
	});
	//给二级菜单框绑定点击事件，在子菜单点击后的冒泡阶段隐藏此二级菜单
	var $ul_2 = $menuUl.getElementsByTagName('ul');
	forEach($ul_2, function (item) { 
		item.onclick = function () {
			item.addClass('hide');
		}
	});
}

/*---------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------*/
/*--------------------------------- Window ----------------------------------*/
/*---------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------*/

/**
 * windowUI组件构造函数，生成windowUI组件对象
 * @param $window {Element} 窗口容器元素
 * @constructor
 */
function WindowUI ($window) {
	this.$window = $window;   //窗口本身元素
	this.$elements = this.$window.children;   //窗口子元素集合
	this.$titleBar = document.createElement('div');     //标题栏
	this.$title = document.createElement('p');      //标题文本

	//Hook
	this.hook = {
		open: [],
		close: []
	}

	this.$titleBar.className = 'title-bar';

	var title = this.$window.id;
	title = title.replace(/([A-Z])/g, ' $1');
	title = title[0].toUpperCase() + title.substring(1);
	this.$title.innerText = title;

	//关闭按钮
	var $close = document.createElement('div');
	$close.className = 'close';
	var _this = this;
	$close.onclick = function () {
		_this.close();
	};

	//构建DOM
	this.$titleBar.appendChild(this.$title);
	this.$titleBar.appendChild($close);
	this.$window.insertBefore(this.$titleBar, this.$window.firstChild);

	//给窗口标题栏添加拖拽移动功能
	setDragMoving(this.$titleBar, this.$window);
}

WindowUI.prototype = {
	constructor: WindowUI,
	//窗口打开时，非窗口区域的覆盖块，用来屏蔽非窗口区域的交互
	$block: null,
	/**
	 * 打开这个窗口
	 * @param isCenter {Boolean} 打开时窗口是否居中（默认true)
	 */
	open: function (isCenter) {
		this.$window.style.display = 'block';

		if (WindowUI.prototype.$block) {
			this.$block.style.display = 'block';
		} else {
			var $block = document.createElement('div');
			$block.className = 'block-all';
			document.body.appendChild($block);
			WindowUI.prototype.$block = $block;
		}
		
		var _this = this;
		
		if (isCenter === undefined || isCenter === true) {
			//让窗口居中
			this.setCenter();
		}
		
		//点击非窗口区域时，闪烁窗口
		this.$block.onclick = function () {
			_this.twinkle();
		};
		
		this.hook.open && this.hook.open.forEach(function (callback) {
			callback();
		})
	},
	/**
	 * 关闭这个窗口
	 */
	close: function () {
		this.$window.style.display = 'none';
		this.$block.style.display = 'none';
		//修复类名，防止下次窗口刚出现就闪烁
		this.$window.className = 'window';
		this.$titleBar.className = 'title-bar';

		this.hook.close && this.hook.close.forEach(function (callback) {
			callback();
		})
	},
	/**
	 * 查找窗口中的符合选择器的第一个元素
	 * @param selector {String} 要查找元素的css选择器
	 * @returns {Element} 找到的元素
	 */
	find: function (selector) {
		return this.$window.querySelector(selector);
	},

	/**
	 * 查找窗口中的符合选择器的所有元素
	 * @param selector {String} 要查找元素的css选择器
	 * @returns {HTMLCollection} 找到的元素集合
	 */
	findAll: function (selector) {
		return this.$window.querySelectorAll(selector);
	},

	/**
	 * 让这个窗口居中
	 */
	setCenter: function () {
		var left = (window.innerWidth - this.$window.offsetWidth) / 2;
		var top = (window.innerHeight - this.$window.offsetHeight) / 2;
		this.$window.style.left = left + 'px';
		this.$window.style.top = top + 'px';
	},
	/**
	 * 闪烁窗口的标题栏和边框
	 */
	twinkle: function () {
		playAnimation(this.$window, 'window', 'window twinkle-border');
		playAnimation(this.$titleBar, 'title-bar', 'title-bar twinkle-title');
	},

	on: function (hook, callback) {
		this.hook[hook].push(callback);
	}
};

/**
 * 获取所有窗口组件
 * @returns {{}} WindowUI对象列表
 */
function getAllWindowUI () {
	var windowUIList = {};
	var $windows = $$('.window');
	forEach($windows, function (item) {
		windowUIList[item.id] = new WindowUI(item);
	});
	return windowUIList;
};


/*---------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------*/
/*--------------------------------- Tab ----------------------------------*/
/*---------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------*/

function Tab (tabId) {
	var $tab = document.getElementById(tabId);
	this.$tabList = $tab.querySelectorAll('ul>li');
	this.$tabContentList = $tab.querySelectorAll('.tab-content>div');
	this.currentId = 0;
	
	if (this.$tabList.length !== 0) {
		this.switchTab(this.currentId);
		var _this = this;
		forEach(this.$tabList, function (item, index) {
			item.onclick = function () {
				_this.switchTab(index);
			}
		});
	}
}

Tab.prototype = {
	constructor: Tab,
	switchTab: function (id) {
		this.$tabList[this.currentId].removeClass('checked');
		this.$tabContentList[this.currentId].removeClass('checked');
		this.currentId = id;
		this.$tabList[this.currentId].addClass('checked');
		this.$tabContentList[this.currentId].addClass('checked');
	}
}

function getAllTab() {
	var $tabUIList = $$('.tab');
	var tabUIList = [];
	
	$tabUIList && forEach($tabUIList, function (item) {
		tabUIList.push(new Tab(item));
	});
	
	return tabUIList;
}

/*---------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------*/
/*--------------------------------- Tree ------------------------------------*/
/*---------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------*/

// data 格式：
// data = [
// 	'demo.txt',     //item
// 	'a',        //item
//  //folder:
// 	{
// 		label: 'folder',
// 		children: [
// 			'a.mp4',
// 			'b',
// 			{
// 				//folder
// 				label: 'c',
// 				[
// 					'c0001',
// 					'c0002',
// 					'c0003'
// 				]
// 			}
// 		]
// 	},
//  'd0001',
//  'd0002'
// ];

function Tree(data) {
	this.$tree = this.createTree(data);
	this.$tree.className = 'tree';
	this.$value = null;
}

Tree.prototype = {
	constructor: Tree,
	createItem: function (item) {
		var $li = document.createElement('li'),
			$span = document.createElement('span'),
			_this = this;
		
		$span.innerText = item;
		$span.onclick = function() {
			_this.check(this);
		};
		$li.appendChild($span);
		return $li;
	},
	createTree: function (data) {
		var $ul = document.createElement('ul'),
			_this = this;
		forEach(data, function (item) {
			if (item.label) {
				var $li = document.createElement('li'),
					$span = document.createElement('span');
				$span.className = 'folder';
				$span.innerText = item.label;
				$span.onclick = function() {
					this.removeClass('expanded') || this.addClass('expanded');
				};
				$li.appendChild($span);
				$li.appendChild(_this.createTree(item.children));
				$ul.appendChild($li);
			} else {
				$ul.appendChild(_this.createItem(item));
			}
		});
		return $ul;
	},
    /**
	 * 选中元素更改事件
     */
	onchange: function () {

    },
	/**
	 * 选中某项
	 * @param $item {Element} 要选中的元素
	 */
	check: function ($item) {
		this.$value && this.$value.removeClass('checked');
		this.$value = $item;
		this.$value.addClass('checked');
		this.onchange();
	},
	/**
	 * 渲染树形组件到某个元素下面
	 * @param $target {Element} 要存放树形组件的父节点，若没有指定则存放到body元素下
	 */
	render: function ($target) {
		$target = $target || document.body;
		$target.appendChild(this.$tree);
	}
};

/*---------------------------------------------------------------------------*/
var windowUIList = getAllWindowUI();



/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__element__ = __webpack_require__(0);


Element.prototype.bindWhellOver = function (callback) {
	var isOnOver = false;
	this.onmouseover = function () {
		isOnOver = true;
	};
	this.onmouseout = function () {
		isOnOver = false;
	};
	window.onwheel = function (event) {
		if (isOnOver && callback) {
			return callback.call(this, event);
		}
	};
}

var view = (function () {
	var $view = Object(__WEBPACK_IMPORTED_MODULE_0__element__["a" /* $ */])('.view'),
		$canvas = Object(__WEBPACK_IMPORTED_MODULE_0__element__["a" /* $ */])('.view canvas'),
		context = $canvas.getContext('2d'),
		$title = Object(__WEBPACK_IMPORTED_MODULE_0__element__["a" /* $ */])('.title'),
		$size = Object(__WEBPACK_IMPORTED_MODULE_0__element__["a" /* $ */])('.canvas-size'),
		$scale = Object(__WEBPACK_IMPORTED_MODULE_0__element__["a" /* $ */])('.canvas-scale'),
		fileName = '';

	const initFillRate = 0.9;	//view打开图片时，图片的占比
	
	var scaleRate = 1;

	/**
	 * 从网址中获取文件名
	 * @param url {String} 网址
	 * @returns {string} 文件名
	 */
	function _getUrlFileName(url) {
		var slashIndex = url.lastIndexOf('/');
		return url.substring(slashIndex + 1);
	}

	function _adjustImage () {
		var width = $canvas.offsetWidth,
			height = $canvas.offsetHeight,
			maxWidth = $view.offsetWidth * initFillRate,
			maxHeight = $view.offsetHeight * initFillRate,
			sizeRate = width / height,
			maxSizeRate = maxWidth / maxHeight;
	
		if (width > maxWidth && height > maxHeight) {
			//如果宽高都超过限制，取宽高中最大值，按比例缩放至符合要求的最大尺寸
			if (sizeRate >= maxSizeRate) {
				scaleRate = maxWidth / width;
			} else {
				scaleRate = maxHeight / height;
			}
		} else if (width > maxWidth) {
			scaleRate = maxWidth / width;
		} else if (height > maxHeight) {
			scaleRate = maxHeight / height;
		} else {
			$canvas.addClass('inner');
		}
		$canvas.style.transform = 'scale(' + scaleRate + ')';
		$scale.innerText = ((scaleRate * 100).toFixed(2)) + '%';
	}
	
	
	function scale(increment, x, y) {
		if (increment && typeof increment === 'number') {
			var oldScaleRate = scaleRate;
			scaleRate += increment;
			if (scaleRate >= 10) {
				scaleRate = 10;
			} else if (scaleRate <= 0.2) {
				scaleRate = 0.2;
			}
			$canvas.style.transform = 'scale(' + scaleRate + ')';
			$scale.innerText = ((scaleRate * 100).toFixed(2)) + '%';
			if (x && y) {
				$view.scrollLeft = scaleRate * ($view.scrollLeft + x) / oldScaleRate - x;
				$view.scrollTop = scaleRate * ($view.scrollTop + y) / oldScaleRate - y;
			}
			// if ($canvas.offsetWidth <= $view.offsetWidth) {
			// 	$view.addClass('disable-scroll-x');
			// } else {
			// 	$view.removeClass('disable-scroll-x');
			// }
			// if ($canvas.offsetHeight <= $view.offsetHeight) {
			// 	$view.addClass('disable-scroll-y');
			// } else {
			// 	$view.removeClass('disable-scroll-y');
			// }
		}
	}
	
	function setCenter () {
		var left = ($view.clientWidth - $canvas.clientWidth * scaleRate) / 2;
		var top = ($view.clientHeight - $canvas.clientHeight * scaleRate) / 2;
		if (left < 0) {
			left = 0;
		}
		if (top < 0) {
			top = 0;
		}
		$canvas.style.marginLeft = left + 'px';
		$canvas.style.marginTop = top + 'px';
	}
	
	$view.bindWhellOver(function (event) {
		if (event.ctrlKey) {
			//如果ctrl键按下，滑动滚轮左右移动画布
			if (event.deltaY > 0) {
				this.scrollLeft += 200;
			} else {
				this.scrollLeft -= 200;
			}
			return false;
		} else if (event.altKey) {
			//如果alt键按下，缩放画布
			var x = event.clientX - $canvas.getViewOffsetLeft(),
				y = event.clientY - $canvas.getViewOffsetTop();
			if (event.deltaY > 0) {
				scale(-0.2, x, y);
			} else {
				scale(0.2, x, y);
			}
			return false;
		}
	});

	
	function load (src, fileName) {
		var image = new Image();
		image.src = src;
		view.fileName = fileName ? fileName : _getUrlFileName(src);
		$title.innerText = view.fileName;
		
		var _this = this;
		image.onload = function () {
			$canvas.width = image.width;
			$canvas.height = image.height;
			$size.innerText = image.width + '×' + image.height;
			$scale.innerText = '100%';
			// var size = getlimitSize(image, 800, 500);
			// scaleRate = size.width / $canvas.width;
			_adjustImage();
			context.drawImage(image, 0, 0);
			
			// _this.scale(0);
			_this.setCenter();
			window.addEventListener('resize', function () {
				_this.setCenter();
			});
			Object(__WEBPACK_IMPORTED_MODULE_0__element__["a" /* $ */])('#menu-save').enable();
			Object(__WEBPACK_IMPORTED_MODULE_0__element__["a" /* $ */])('#menu-saveAs').enable();
			$canvas.onmousemove = function (event) {
				var x = event.clientX - this.getViewOffsetLeft() + $view.scrollLeft,
					y = event.clientY - this.getViewOffsetTop() + $view.scrollTop;
				Object(__WEBPACK_IMPORTED_MODULE_0__element__["a" /* $ */])('#pos-x').innerText = Math.round(x / scaleRate);
				Object(__WEBPACK_IMPORTED_MODULE_0__element__["a" /* $ */])('#pos-y').innerText = Math.round(y / scaleRate);
			}
		};
	}
	
	return {
		$canvas: $canvas,
		fileName: fileName,
		load: load,
		setCenter: setCenter,
		scale: scale,
		context: context
	};
})();

/* harmony default export */ __webpack_exports__["a"] = (view);

/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__style_css__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__style_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__style_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__windowsUI_css__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__windowsUI_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__windowsUI_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__iconfont_iconfont_css__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__iconfont_iconfont_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__iconfont_iconfont_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__font_awesome_4_7_0_css_font_awesome_min_css__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__font_awesome_4_7_0_css_font_awesome_min_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__font_awesome_4_7_0_css_font_awesome_min_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__color_picker_color_picker_min_css__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__color_picker_color_picker_min_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4__color_picker_color_picker_min_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__element__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__common__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__common___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6__common__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__tool__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__WebDesktop__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__hotkey__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__view__ = __webpack_require__(4);
/**
 * Created by vimcaw on 2017/5/27.
 */

















function getlimitSize($img, maxWidth, maxHeight) {
	var width = $img.width,
		height = $img.height;
	
	if (width > maxWidth && height > maxHeight) {
		//如果宽高都超过限制，取宽高中最大值，按比例缩放至符合要求的最大尺寸
		var rate = width / height;
		var max = Math.max(width, height);
		if (max == width) {
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
	var size = getlimitSize($img, maxWidth, maxHeight);
	$img.width = size.width;
	$img.height = size.height;
}

var commandSet = {
	openFromLocal: function () {
		if (!FileReader) {
			var windowError = __WEBPACK_IMPORTED_MODULE_8__WebDesktop__["c" /* windowUIList */].canNotReadLocalFile;
			return windowError.open();
		}
		var inpFile = document.createElement('input');
		inpFile.type = 'file';
		inpFile.className = 'hide';
		document.body.appendChild(inpFile);
		inpFile.click();
		inpFile.onchange = function () {
			if (this.value) {
				var reader = new FileReader(),
					file = this.files[0];
				reader.readAsDataURL(file);
				reader.onload = function() {
					__WEBPACK_IMPORTED_MODULE_10__view__["a" /* default */].load(this.result, file.name);
				}
			}
		};
	},
	openFromUrl: function () {
		var windowForm = __WEBPACK_IMPORTED_MODULE_8__WebDesktop__["c" /* windowUIList */].openWebPicture;
		windowForm.open();
		windowForm.find('#preview').onclick = function () {
			var $img = windowForm.find('img');
			$img.src = windowForm.find('input').value;
			$img.onload = function () {
				limitImageSize(this, 500, 300);
				windowForm.setCenter();
			}
		};
		windowForm.find('#confirm').onclick = function () {
			__WEBPACK_IMPORTED_MODULE_10__view__["a" /* default */].load(windowForm.find('input').value);
			windowForm.close();
		};
	},
	save: function () {
		var downloader = document.createElement('a'),
			imageName = '',
			imageFormat = '',
			format = {
				png: 'png',
				jpg: 'jpeg',
				webp: 'webp'
			};
		imageName = __WEBPACK_IMPORTED_MODULE_10__view__["a" /* default */].fileName;
		var result = __WEBPACK_IMPORTED_MODULE_10__view__["a" /* default */].fileName.match(/\..+/g);
		imageFormat = result && result[result.length - 1].substring(1);
		downloader.download = imageName;

		downloader.href = __WEBPACK_IMPORTED_MODULE_10__view__["a" /* default */].$canvas.toDataURL('image/' + format[imageFormat]);
		document.body.appendChild(downloader);
		downloader.click();
	},
	about: function () {
		__WEBPACK_IMPORTED_MODULE_8__WebDesktop__["c" /* windowUIList */].about.open();
	}
};

/**
 * 窗口操作指令集
 * @type {{full-screen: windowCommand.full-screen}}
 */
var windowCommand = {
	'full-screen': function () {
		var fullscreenElement = document.fullscreenElement ||
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
var bindWindowControlClick = function ($windowControlUl, commandSet) {
	var $uls = $windowControlUl.children;
	$uls.forEach(function (item) {
		var id = Object(__WEBPACK_IMPORTED_MODULE_8__WebDesktop__["b" /* getIdSuffix */])(item.id);
		if (id && commandSet[id]) {
			item.onclick = function () {
				commandSet[id]();
			}
		}
		
	});
};



var defaultKeymap = {
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

Object(__WEBPACK_IMPORTED_MODULE_8__WebDesktop__["a" /* bindMenuClick */])(Object(__WEBPACK_IMPORTED_MODULE_5__element__["a" /* $ */])('.menu'), commandSet);
bindWindowControlClick(Object(__WEBPACK_IMPORTED_MODULE_5__element__["a" /* $ */])('.window-control'), windowCommand);
window.oncontextmenu = function () {
	return false;
};

__WEBPACK_IMPORTED_MODULE_9__hotkey__["a" /* default */].loadKeymap(defaultKeymap);

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(7);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(2)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../node_modules/css-loader/index.js!./style.css", function() {
			var newContent = require("!!../node_modules/css-loader/index.js!./style.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(undefined);
// imports


// module
exports.push([module.i, "html, body{\r\n    width: 100%;\r\n    height: 100%;\r\n    background: #2c2c2c;\r\n    color: #f0f0f0;\r\n    overflow: hidden;\r\n}\r\n\r\na, a:visited{\r\n    color: #9bb5e3;\r\n}\r\n\r\n@keyframes twinkleBorder {\r\n    from {\r\n        border-color: #ff3e3e;\r\n    }\r\n    to {\r\n        border-color: #2c2c2c;\r\n    }\r\n}\r\n\r\n@keyframes twinkleTitle {\r\n    from {\r\n        background-color: #fff;\r\n    }\r\n    to {\r\n        background-color: #2c2c2c;\r\n    }\r\n}\r\n\r\n/*Common Style*/\r\n.hide{\r\n    display: none;\r\n}\r\n.block-all{\r\n    position: fixed;\r\n    top: 0;\r\n    left: 0;\r\n    width: 100%;\r\n    height: 100%;\r\n    z-index: 100;\r\n}\r\n.twinkle-border{\r\n    animation: .15s twinkleBorder;\r\n    animation-iteration-count: 6;\r\n}\r\n.twinkle-title{\r\n    animation: .15s twinkleTitle;\r\n    animation-iteration-count: 6;\r\n}\r\n.row>div{\r\n    display: inline-block;\r\n}\r\nbutton{\r\n    padding: 0.3em 1em;\r\n    background: #3b3b3b;\r\n    color: #f0f0f0;\r\n    border-radius: 0.5em;\r\n    border: 0.1em solid #727272;\r\n    transition: all 0.8s;\r\n}\r\nbutton:hover{\r\n    background: #2c2c2c;\r\n}\r\n/*全局样式*/\r\n.top, .option, .tool, .panel{\r\n    position: relative;\r\n    background: #535353;\r\n    z-index: 30;\r\n}\r\n.top:hover, .option:hover, .tool:hover, .panel:hover, .window{\r\n    position: relative;\r\n    box-shadow: 0 0 2em #000000;\r\n    z-index: 50;\r\n}\r\n::-webkit-scrollbar, ::-webkit-scrollbar-corner{\r\n    background: #3b3b3b;\r\n}\r\n::-webkit-scrollbar-thumb{\r\n    background: #535353;\r\n}\r\n\r\n/* 菜单 */\r\n.menu>li li.hasHotkey{\r\n    position: relative;\r\n    padding-right: 10em !important;\r\n}\r\n.menu li.hasHotkey span.hotkey-hint{\r\n    position: absolute;\r\n    top: 0.25em;\r\n    right: 1em;\r\n    font-size: 0.8rem;\r\n    color: #B8B8B8;\r\n}\r\n\r\n/*窗口操作按钮*/\r\n.window-control li{\r\n    display: block;\r\n    position: absolute;\r\n    top: 0;\r\n    right: 0;\r\n    padding: 0.5em;\r\n}\r\n.window-control li:hover{\r\n    background: #2c2c2c;\r\n}\r\n\r\n/*选项栏*/\r\n.option{\r\n    height: 2em;\r\n    margin: 0.2em 0;\r\n    padding-left: 0.5em;\r\n    background: #535353;\r\n    font-size: 1em;\r\n}\r\n\r\n.option div{\r\n    display: none;\r\n}\r\n.option div.actived{\r\n    display: inline-block;\r\n}\r\n.option *{\r\n    display: inline;\r\n    margin: 0 5px;\r\n    padding: 0;\r\n    line-height: 30px;\r\n}\r\n\r\n.option #current-tool{\r\n    font-size: 1em;\r\n    line-height: 2em;\r\n}\r\n\r\n/*底部区域容器*/\r\n.bottom-container{\r\n    position: absolute;\r\n    top: 4.1em;\r\n    bottom: 0;\r\n    width: 100%;\r\n    overflow: hidden;\r\n}\r\n\r\n/*工具栏*/\r\n.tool{\r\n    float: left;\r\n    width: 2.2em;\r\n    height:100%;\r\n}\r\n.tool>ul{\r\n    list-style-type: none;\r\n}\r\n.tool>ul div{\r\n    display: inline-block;\r\n    font-size: 1em;\r\n    padding: 0.4em;\r\n    margin: 0.2em;\r\n}\r\n.tool>ul div:hover{\r\n    background: #404040;\r\n}\r\n.tool>ul div.checked{\r\n    background: #2c2c2c;\r\n}\r\n.tool .color #color-reset, .tool .color #color-exchange{\r\n    display: inline-block;\r\n    width: 0.7em;\r\n    height: 0.7em;\r\n    padding: 0.1em;\r\n    margin-bottom: 0.2em;\r\n}\r\n.tool .color #color-reset{\r\n    background: url(" + __webpack_require__(8) + ");\r\n}\r\n.tool .color #color-exchange{\r\n    background: url(" + __webpack_require__(9) + ");\r\n\r\n}\r\n.tool #display-color{\r\n    position: relative;\r\n}\r\n.tool .color #display-color div{\r\n    position: absolute;\r\n    width: 1em;\r\n    height: 1em;\r\n}\r\n.tool .color #display-color #fore-color{\r\n    left: 0.3em;\r\n    background: #000;\r\n    border: 0.05em solid #fff;\r\n    outline: 0.1em solid #000;\r\n    z-index: 1;\r\n}\r\n.tool .color #display-color #back-color{\r\n    top: 0.7em;\r\n    right: 0.3em;\r\n    background: #fff;\r\n    border: 0.05em solid #fff;\r\n    outline: 0.1em solid #000;\r\n    z-index: 0;\r\n}\r\n\r\n/*画布*/\r\n#view-container{\r\n    position: relative;\r\n    height: 100%;\r\n    margin: 0 15em 0 2.4em;\r\n    z-index: 1;\r\n    overflow: hidden;\r\n}\r\n#view-container ul.title-bar{\r\n    font-size: 0.8em;\r\n    margin-bottom: 0.2em;\r\n    list-style-type: none;\r\n    background: #3b3b3b;\r\n}\r\n#view-container ul.title-bar li{\r\n    display: inline-block;\r\n    background: #535353;\r\n    cursor: default;\r\n}\r\n#view-container ul.title-bar li span{\r\n    margin: 0.4em 0.5em;\r\n}\r\n#view-container ul.title-bar li .close{\r\n    padding: 0.1em;\r\n    margin-left: 0;\r\n    vertical-align: middle;\r\n}\r\n#view-container ul.title-bar li .close:hover{\r\n    background: #ff5458;\r\n    border-radius: 50%;\r\n}\r\n#view-container canvas{\r\n    transform-origin: 0 0;\r\n}\r\n#view-container .view{\r\n    position: absolute;\r\n    top: 2em;\r\n    bottom: 1.6em;\r\n    width: 100%;\r\n    overflow: scroll;\r\n}\r\n#view-container .disable-scroll-x{\r\n    overflow-x: hidden;\r\n}\r\n#view-container .disable-scroll-y{\r\n    overflow-y: hidden;\r\n}\r\n#view-container .status{\r\n    position: absolute;\r\n    bottom: 0;\r\n    width: 100%;\r\n    font-size: 0.8em;\r\n    line-height: 1.8em;\r\n    background: #535353;\r\n    padding-left: 1em;\r\n    margin-top: 0.2em;\r\n}\r\n\r\n/*面板*/\r\n.panel-group{\r\n    float: right;\r\n    width: 15em;\r\n    height: 30em;\r\n}\r\n\r\n.panel{\r\n    position: relative;\r\n    width: 90%;\r\n    margin: 1%;\r\n    padding: 5%;\r\n    background: #535353;\r\n}\r\n.panel .title-bar{\r\n    position: absolute;\r\n    top: 0;\r\n    left: 0;\r\n    margin: 0;\r\n    width: 100%;\r\n    height: 30px;\r\n    font-size: 12px;\r\n    background: #2c2c2c;\r\n    overflow: hidden;\r\n    cursor: default;\r\n}\r\n.panel .title-bar>p{\r\n    position: absolute;\r\n    margin: 0;\r\n    padding-left: 15px;\r\n    line-height: 30px;\r\n}\r\n\r\n/*自定义样式*/\r\n#about{\r\n    text-align: center;\r\n    padding-left: 5em;\r\n    padding-right: 5em;\r\n}\r\n\r\n#canNotReadLocalFile{\r\n    width: 40em;\r\n}\r\n#canNotReadLocalFile span{\r\n    float: left;\r\n    font-size: 9em;\r\n}\r\n#canNotReadLocalFile ul, #canNotReadLocalFile h2{\r\n    clear: both;\r\n}\r\n/* Color Picker */\r\n.color-picker.static{\r\n    display:inline-block !important;\r\n    position:static !important;\r\n    top:0 !important;\r\n    left:0 !important;\r\n}\r\n.color-picker.static *{\r\n    margin: 0;\r\n}\r\n.color-picker-control{\r\n    border: none !important;\r\n    box-shadow: none !important;\r\n}\r\n.color-picker-sv, .color-picker-h{\r\n    height: 15em !important;\r\n    border: 0.1em solid #000 !important;\r\n}\r\n.color-picker-sv{\r\n    width: 15em !important;\r\n}\r\n.color-picker-h{\r\n    width: 1.5em !important;\r\n    margin-left: 1em !important;\r\n}\r\n#colorPicker #picker-UI, #colorPicker .handle, #colorPicker ul{\r\n    display: inline-block;\r\n}\r\n#colorPicker #picker-UI{\r\n    height: 100%;\r\n}\r\n#colorPicker ul{\r\n    list-style-type: none;\r\n}\r\n#colorPicker .hsv input, #colorPicker .rgb input{\r\n    width: 3em;\r\n}\r\n#colorPicker .hex input{\r\n    width: 5em;\r\n}\r\n#colorPicker .button button{\r\n    display: block;\r\n    margin: 1em;\r\n}\r\n#colorPicker .color-comparison{\r\n    text-align: center;\r\n    margin: 0 1.2em;\r\n}\r\n#colorPicker .color-comparison div{\r\n    width: 4em;\r\n    height: 2em;\r\n    background: #000;\r\n    margin: 0;\r\n}\r\n#colorPicker .row div{\r\n    vertical-align: middle;\r\n}", ""]);

// exports


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "3290229427b852a3c49621abf2a04ba0.svg";

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "c736e48a5e9b346e55504954d744a2ae.svg";

/***/ }),
/* 10 */
/***/ (function(module, exports) {


/**
 * When source maps are enabled, `style-loader` uses a link element with a data-uri to
 * embed the css on the page. This breaks all relative urls because now they are relative to a
 * bundle instead of the current page.
 *
 * One solution is to only use full urls, but that may be impossible.
 *
 * Instead, this function "fixes" the relative urls to be absolute according to the current page location.
 *
 * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.
 *
 */

module.exports = function (css) {
  // get current location
  var location = typeof window !== "undefined" && window.location;

  if (!location) {
    throw new Error("fixUrls requires window.location");
  }

	// blank or null?
	if (!css || typeof css !== "string") {
	  return css;
  }

  var baseUrl = location.protocol + "//" + location.host;
  var currentDir = baseUrl + location.pathname.replace(/\/[^\/]*$/, "/");

	// convert each url(...)
	/*
	This regular expression is just a way to recursively match brackets within
	a string.

	 /url\s*\(  = Match on the word "url" with any whitespace after it and then a parens
	   (  = Start a capturing group
	     (?:  = Start a non-capturing group
	         [^)(]  = Match anything that isn't a parentheses
	         |  = OR
	         \(  = Match a start parentheses
	             (?:  = Start another non-capturing groups
	                 [^)(]+  = Match anything that isn't a parentheses
	                 |  = OR
	                 \(  = Match a start parentheses
	                     [^)(]*  = Match anything that isn't a parentheses
	                 \)  = Match a end parentheses
	             )  = End Group
              *\) = Match anything and then a close parens
          )  = Close non-capturing group
          *  = Match anything
       )  = Close capturing group
	 \)  = Match a close parens

	 /gi  = Get all matches, not the first.  Be case insensitive.
	 */
	var fixedCss = css.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function(fullMatch, origUrl) {
		// strip quotes (if they exist)
		var unquotedOrigUrl = origUrl
			.trim()
			.replace(/^"(.*)"$/, function(o, $1){ return $1; })
			.replace(/^'(.*)'$/, function(o, $1){ return $1; });

		// already a full url? no change
		if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/)/i.test(unquotedOrigUrl)) {
		  return fullMatch;
		}

		// convert the url to a full url
		var newUrl;

		if (unquotedOrigUrl.indexOf("//") === 0) {
		  	//TODO: should we add protocol?
			newUrl = unquotedOrigUrl;
		} else if (unquotedOrigUrl.indexOf("/") === 0) {
			// path should be relative to the base url
			newUrl = baseUrl + unquotedOrigUrl; // already starts with '/'
		} else {
			// path should be relative to current directory
			newUrl = currentDir + unquotedOrigUrl.replace(/^\.\//, ""); // Strip leading './'
		}

		// send back the fixed url(...)
		return "url(" + JSON.stringify(newUrl) + ")";
	});

	// send back the fixed css
	return fixedCss;
};


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(12);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(2)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../node_modules/css-loader/index.js!./windowsUI.css", function() {
			var newContent = require("!!../node_modules/css-loader/index.js!./windowsUI.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(undefined);
// imports


// module
exports.push([module.i, "body, ul, li{\r\n    margin: 0;\r\n    padding: 0;\r\n}\r\n.hide{\r\n    display: none;\r\n}\r\n\r\n/*一级菜单*/\r\nul.menu{\r\n    margin-left: 20px;\r\n}\r\nul.menu>li{\r\n    position: relative;\r\n    display: inline-block;\r\n    padding: 0.2em 0.8em;\r\n    list-style-type: none;\r\n}\r\nul.menu>li:hover{\r\n    background: #2c2c2c;\r\n    cursor: default;\r\n}\r\n/*二级菜单、右键菜单*/\r\nul.menu>li:hover ul{\r\n    display: block;\r\n}\r\nul.menu ul, .context{\r\n    display: none;\r\n    position: absolute;\r\n    left: 0;\r\n    background: #535353;\r\n    color: #f0f0f0;\r\n    list-style-type: none;\r\n    border: 1px solid #6a6a6a;\r\n    box-shadow: 2px 2px 30px #000000;\r\n    padding: 2px;\r\n}\r\nul.menu ul li, .context li{\r\n    padding: 2px 20px;\r\n    white-space: nowrap;\r\n}\r\nul.menu ul li:hover, .context li:hover{\r\n    background: #f0f0f0;\r\n    color: #2c2c2c;\r\n}\r\nul.menu ul li.disabled, .context li.disabled{\r\n    color: #8F8F8F;\r\n}\r\nul.menu ul li.disabled:hover, .context li.disabled:hover{\r\n    background: #717171;\r\n    color: #8F8F8F;\r\n}\r\n\r\n/*窗口*/\r\n.window{\r\n    display: none;\r\n    position: absolute;\r\n    padding: 10px;\r\n    padding-top: 40px;\r\n    background: #535353;\r\n    border: 1px solid #6a6a6a;\r\n    z-index: 500;\r\n}\r\n.window *{\r\n    margin: 5px;\r\n}\r\n\r\n.window .title-bar{\r\n    position: absolute;\r\n    top: 0;\r\n    left: 0;\r\n    margin: 0;\r\n    width: 100%;\r\n    height: 30px;\r\n    background: #2c2c2c;\r\n    overflow: hidden;\r\n    cursor: default;\r\n}\r\n.window .title-bar>p{\r\n    position: absolute;\r\n    margin: 0;\r\n    padding-left: 15px;\r\n    line-height: 30px;\r\n}\r\n/*标题栏关闭按钮*/\r\n.window .title-bar .close{\r\n    position: absolute;\r\n    top: 0;\r\n    right: 0;\r\n    margin: 0;\r\n    padding: 0 20px;\r\n    line-height: 30px;\r\n    transition: all .6s;\r\n}\r\n.window .title-bar .close::before{\r\n    content: '\\2716';\r\n}\r\n.window .title-bar .close:hover{\r\n    background: #ff3e36;\r\n}\r\n", ""]);

// exports


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(14);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(2)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../node_modules/css-loader/index.js!./iconfont.css", function() {
			var newContent = require("!!../../node_modules/css-loader/index.js!./iconfont.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(undefined);
// imports


// module
exports.push([module.i, "\r\n@font-face {\r\n  font-family: \"iconfont\";\r\n  src: url(" + __webpack_require__(15) + ") format('woff'), \r\n  url(" + __webpack_require__(16) + ") format('truetype') /* chrome, firefox, opera, Safari, Android, iOS 4.2+*/\r\n}\r\n\r\n.iconfont {\r\n  font-family:\"iconfont\" !important;\r\n  font-size:16px;\r\n  font-style:normal;\r\n  -webkit-font-smoothing: antialiased;\r\n  -moz-osx-font-smoothing: grayscale;\r\n}\r\n\r\n.icon-fangdajing:before { content: \"\\E605\"; }\r\n\r\n.icon-icon:before { content: \"\\E628\"; }\r\n\r\n.icon-wenben:before { content: \"\\E632\"; }\r\n\r\n.icon-quanping:before { content: \"\\E601\"; }\r\n\r\n.icon-hand:before { content: \"\\E648\"; }\r\n\r\n.icon-yidong:before { content: \"\\E633\"; }\r\n\r\n.icon-duobianxing:before { content: \"\\E78F\"; }\r\n\r\n.icon-tuoyuan:before { content: \"\\E503\"; }\r\n\r\n.icon-icon-straw:before { content: \"\\E606\"; }\r\n\r\n.icon-yuanjiaojuxing:before { content: \"\\E651\"; }\r\n\r\n.icon-juxing:before { content: \"\\E663\"; }\r\n\r\n.icon-tupiancaijian:before { content: \"\\E66E\"; }\r\n\r\n.icon-xiangpi:before { content: \"\\E568\"; }\r\n\r\n.icon-xian:before { content: \"\\E61C\"; }\r\n\r\n", ""]);

// exports


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "d4c054e26e314d5a2f97ca2a6d29f86c.woff";

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "f21c6efddece7eca944a52dcf35e7026.ttf";

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(18);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(2)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../node_modules/css-loader/index.js!./font-awesome.min.css", function() {
			var newContent = require("!!../../../node_modules/css-loader/index.js!./font-awesome.min.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(undefined);
// imports


// module
exports.push([module.i, "/*!\r\n *  Font Awesome 4.7.0 by @davegandy - http://fontawesome.io - @fontawesome\r\n *  License - http://fontawesome.io/license (Font: SIL OFL 1.1, CSS: MIT License)\r\n */@font-face{font-family:'FontAwesome';src:url(" + __webpack_require__(19) + ");src:url(" + __webpack_require__(20) + "?#iefix&v=4.7.0) format('embedded-opentype'),url(" + __webpack_require__(21) + ") format('woff2'),url(" + __webpack_require__(22) + ") format('woff'),url(" + __webpack_require__(23) + ") format('truetype'),url(" + __webpack_require__(24) + "#fontawesomeregular) format('svg');font-weight:normal;font-style:normal}.fa{display:inline-block;font:normal normal normal 14px/1 FontAwesome;font-size:inherit;text-rendering:auto;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}.fa-lg{font-size:1.33333333em;line-height:.75em;vertical-align:-15%}.fa-2x{font-size:2em}.fa-3x{font-size:3em}.fa-4x{font-size:4em}.fa-5x{font-size:5em}.fa-fw{width:1.28571429em;text-align:center}.fa-ul{padding-left:0;margin-left:2.14285714em;list-style-type:none}.fa-ul>li{position:relative}.fa-li{position:absolute;left:-2.14285714em;width:2.14285714em;top:.14285714em;text-align:center}.fa-li.fa-lg{left:-1.85714286em}.fa-border{padding:.2em .25em .15em;border:solid .08em #eee;border-radius:.1em}.fa-pull-left{float:left}.fa-pull-right{float:right}.fa.fa-pull-left{margin-right:.3em}.fa.fa-pull-right{margin-left:.3em}.pull-right{float:right}.pull-left{float:left}.fa.pull-left{margin-right:.3em}.fa.pull-right{margin-left:.3em}.fa-spin{-webkit-animation:fa-spin 2s infinite linear;animation:fa-spin 2s infinite linear}.fa-pulse{-webkit-animation:fa-spin 1s infinite steps(8);animation:fa-spin 1s infinite steps(8)}@-webkit-keyframes fa-spin{0%{-webkit-transform:rotate(0deg);transform:rotate(0deg)}100%{-webkit-transform:rotate(359deg);transform:rotate(359deg)}}@keyframes fa-spin{0%{-webkit-transform:rotate(0deg);transform:rotate(0deg)}100%{-webkit-transform:rotate(359deg);transform:rotate(359deg)}}.fa-rotate-90{-ms-filter:\"progid:DXImageTransform.Microsoft.BasicImage(rotation=1)\";-webkit-transform:rotate(90deg);-ms-transform:rotate(90deg);transform:rotate(90deg)}.fa-rotate-180{-ms-filter:\"progid:DXImageTransform.Microsoft.BasicImage(rotation=2)\";-webkit-transform:rotate(180deg);-ms-transform:rotate(180deg);transform:rotate(180deg)}.fa-rotate-270{-ms-filter:\"progid:DXImageTransform.Microsoft.BasicImage(rotation=3)\";-webkit-transform:rotate(270deg);-ms-transform:rotate(270deg);transform:rotate(270deg)}.fa-flip-horizontal{-ms-filter:\"progid:DXImageTransform.Microsoft.BasicImage(rotation=0, mirror=1)\";-webkit-transform:scale(-1, 1);-ms-transform:scale(-1, 1);transform:scale(-1, 1)}.fa-flip-vertical{-ms-filter:\"progid:DXImageTransform.Microsoft.BasicImage(rotation=2, mirror=1)\";-webkit-transform:scale(1, -1);-ms-transform:scale(1, -1);transform:scale(1, -1)}:root .fa-rotate-90,:root .fa-rotate-180,:root .fa-rotate-270,:root .fa-flip-horizontal,:root .fa-flip-vertical{filter:none}.fa-stack{position:relative;display:inline-block;width:2em;height:2em;line-height:2em;vertical-align:middle}.fa-stack-1x,.fa-stack-2x{position:absolute;left:0;width:100%;text-align:center}.fa-stack-1x{line-height:inherit}.fa-stack-2x{font-size:2em}.fa-inverse{color:#fff}.fa-glass:before{content:\"\\F000\"}.fa-music:before{content:\"\\F001\"}.fa-search:before{content:\"\\F002\"}.fa-envelope-o:before{content:\"\\F003\"}.fa-heart:before{content:\"\\F004\"}.fa-star:before{content:\"\\F005\"}.fa-star-o:before{content:\"\\F006\"}.fa-user:before{content:\"\\F007\"}.fa-film:before{content:\"\\F008\"}.fa-th-large:before{content:\"\\F009\"}.fa-th:before{content:\"\\F00A\"}.fa-th-list:before{content:\"\\F00B\"}.fa-check:before{content:\"\\F00C\"}.fa-remove:before,.fa-close:before,.fa-times:before{content:\"\\F00D\"}.fa-search-plus:before{content:\"\\F00E\"}.fa-search-minus:before{content:\"\\F010\"}.fa-power-off:before{content:\"\\F011\"}.fa-signal:before{content:\"\\F012\"}.fa-gear:before,.fa-cog:before{content:\"\\F013\"}.fa-trash-o:before{content:\"\\F014\"}.fa-home:before{content:\"\\F015\"}.fa-file-o:before{content:\"\\F016\"}.fa-clock-o:before{content:\"\\F017\"}.fa-road:before{content:\"\\F018\"}.fa-download:before{content:\"\\F019\"}.fa-arrow-circle-o-down:before{content:\"\\F01A\"}.fa-arrow-circle-o-up:before{content:\"\\F01B\"}.fa-inbox:before{content:\"\\F01C\"}.fa-play-circle-o:before{content:\"\\F01D\"}.fa-rotate-right:before,.fa-repeat:before{content:\"\\F01E\"}.fa-refresh:before{content:\"\\F021\"}.fa-list-alt:before{content:\"\\F022\"}.fa-lock:before{content:\"\\F023\"}.fa-flag:before{content:\"\\F024\"}.fa-headphones:before{content:\"\\F025\"}.fa-volume-off:before{content:\"\\F026\"}.fa-volume-down:before{content:\"\\F027\"}.fa-volume-up:before{content:\"\\F028\"}.fa-qrcode:before{content:\"\\F029\"}.fa-barcode:before{content:\"\\F02A\"}.fa-tag:before{content:\"\\F02B\"}.fa-tags:before{content:\"\\F02C\"}.fa-book:before{content:\"\\F02D\"}.fa-bookmark:before{content:\"\\F02E\"}.fa-print:before{content:\"\\F02F\"}.fa-camera:before{content:\"\\F030\"}.fa-font:before{content:\"\\F031\"}.fa-bold:before{content:\"\\F032\"}.fa-italic:before{content:\"\\F033\"}.fa-text-height:before{content:\"\\F034\"}.fa-text-width:before{content:\"\\F035\"}.fa-align-left:before{content:\"\\F036\"}.fa-align-center:before{content:\"\\F037\"}.fa-align-right:before{content:\"\\F038\"}.fa-align-justify:before{content:\"\\F039\"}.fa-list:before{content:\"\\F03A\"}.fa-dedent:before,.fa-outdent:before{content:\"\\F03B\"}.fa-indent:before{content:\"\\F03C\"}.fa-video-camera:before{content:\"\\F03D\"}.fa-photo:before,.fa-image:before,.fa-picture-o:before{content:\"\\F03E\"}.fa-pencil:before{content:\"\\F040\"}.fa-map-marker:before{content:\"\\F041\"}.fa-adjust:before{content:\"\\F042\"}.fa-tint:before{content:\"\\F043\"}.fa-edit:before,.fa-pencil-square-o:before{content:\"\\F044\"}.fa-share-square-o:before{content:\"\\F045\"}.fa-check-square-o:before{content:\"\\F046\"}.fa-arrows:before{content:\"\\F047\"}.fa-step-backward:before{content:\"\\F048\"}.fa-fast-backward:before{content:\"\\F049\"}.fa-backward:before{content:\"\\F04A\"}.fa-play:before{content:\"\\F04B\"}.fa-pause:before{content:\"\\F04C\"}.fa-stop:before{content:\"\\F04D\"}.fa-forward:before{content:\"\\F04E\"}.fa-fast-forward:before{content:\"\\F050\"}.fa-step-forward:before{content:\"\\F051\"}.fa-eject:before{content:\"\\F052\"}.fa-chevron-left:before{content:\"\\F053\"}.fa-chevron-right:before{content:\"\\F054\"}.fa-plus-circle:before{content:\"\\F055\"}.fa-minus-circle:before{content:\"\\F056\"}.fa-times-circle:before{content:\"\\F057\"}.fa-check-circle:before{content:\"\\F058\"}.fa-question-circle:before{content:\"\\F059\"}.fa-info-circle:before{content:\"\\F05A\"}.fa-crosshairs:before{content:\"\\F05B\"}.fa-times-circle-o:before{content:\"\\F05C\"}.fa-check-circle-o:before{content:\"\\F05D\"}.fa-ban:before{content:\"\\F05E\"}.fa-arrow-left:before{content:\"\\F060\"}.fa-arrow-right:before{content:\"\\F061\"}.fa-arrow-up:before{content:\"\\F062\"}.fa-arrow-down:before{content:\"\\F063\"}.fa-mail-forward:before,.fa-share:before{content:\"\\F064\"}.fa-expand:before{content:\"\\F065\"}.fa-compress:before{content:\"\\F066\"}.fa-plus:before{content:\"\\F067\"}.fa-minus:before{content:\"\\F068\"}.fa-asterisk:before{content:\"\\F069\"}.fa-exclamation-circle:before{content:\"\\F06A\"}.fa-gift:before{content:\"\\F06B\"}.fa-leaf:before{content:\"\\F06C\"}.fa-fire:before{content:\"\\F06D\"}.fa-eye:before{content:\"\\F06E\"}.fa-eye-slash:before{content:\"\\F070\"}.fa-warning:before,.fa-exclamation-triangle:before{content:\"\\F071\"}.fa-plane:before{content:\"\\F072\"}.fa-calendar:before{content:\"\\F073\"}.fa-random:before{content:\"\\F074\"}.fa-comment:before{content:\"\\F075\"}.fa-magnet:before{content:\"\\F076\"}.fa-chevron-up:before{content:\"\\F077\"}.fa-chevron-down:before{content:\"\\F078\"}.fa-retweet:before{content:\"\\F079\"}.fa-shopping-cart:before{content:\"\\F07A\"}.fa-folder:before{content:\"\\F07B\"}.fa-folder-open:before{content:\"\\F07C\"}.fa-arrows-v:before{content:\"\\F07D\"}.fa-arrows-h:before{content:\"\\F07E\"}.fa-bar-chart-o:before,.fa-bar-chart:before{content:\"\\F080\"}.fa-twitter-square:before{content:\"\\F081\"}.fa-facebook-square:before{content:\"\\F082\"}.fa-camera-retro:before{content:\"\\F083\"}.fa-key:before{content:\"\\F084\"}.fa-gears:before,.fa-cogs:before{content:\"\\F085\"}.fa-comments:before{content:\"\\F086\"}.fa-thumbs-o-up:before{content:\"\\F087\"}.fa-thumbs-o-down:before{content:\"\\F088\"}.fa-star-half:before{content:\"\\F089\"}.fa-heart-o:before{content:\"\\F08A\"}.fa-sign-out:before{content:\"\\F08B\"}.fa-linkedin-square:before{content:\"\\F08C\"}.fa-thumb-tack:before{content:\"\\F08D\"}.fa-external-link:before{content:\"\\F08E\"}.fa-sign-in:before{content:\"\\F090\"}.fa-trophy:before{content:\"\\F091\"}.fa-github-square:before{content:\"\\F092\"}.fa-upload:before{content:\"\\F093\"}.fa-lemon-o:before{content:\"\\F094\"}.fa-phone:before{content:\"\\F095\"}.fa-square-o:before{content:\"\\F096\"}.fa-bookmark-o:before{content:\"\\F097\"}.fa-phone-square:before{content:\"\\F098\"}.fa-twitter:before{content:\"\\F099\"}.fa-facebook-f:before,.fa-facebook:before{content:\"\\F09A\"}.fa-github:before{content:\"\\F09B\"}.fa-unlock:before{content:\"\\F09C\"}.fa-credit-card:before{content:\"\\F09D\"}.fa-feed:before,.fa-rss:before{content:\"\\F09E\"}.fa-hdd-o:before{content:\"\\F0A0\"}.fa-bullhorn:before{content:\"\\F0A1\"}.fa-bell:before{content:\"\\F0F3\"}.fa-certificate:before{content:\"\\F0A3\"}.fa-hand-o-right:before{content:\"\\F0A4\"}.fa-hand-o-left:before{content:\"\\F0A5\"}.fa-hand-o-up:before{content:\"\\F0A6\"}.fa-hand-o-down:before{content:\"\\F0A7\"}.fa-arrow-circle-left:before{content:\"\\F0A8\"}.fa-arrow-circle-right:before{content:\"\\F0A9\"}.fa-arrow-circle-up:before{content:\"\\F0AA\"}.fa-arrow-circle-down:before{content:\"\\F0AB\"}.fa-globe:before{content:\"\\F0AC\"}.fa-wrench:before{content:\"\\F0AD\"}.fa-tasks:before{content:\"\\F0AE\"}.fa-filter:before{content:\"\\F0B0\"}.fa-briefcase:before{content:\"\\F0B1\"}.fa-arrows-alt:before{content:\"\\F0B2\"}.fa-group:before,.fa-users:before{content:\"\\F0C0\"}.fa-chain:before,.fa-link:before{content:\"\\F0C1\"}.fa-cloud:before{content:\"\\F0C2\"}.fa-flask:before{content:\"\\F0C3\"}.fa-cut:before,.fa-scissors:before{content:\"\\F0C4\"}.fa-copy:before,.fa-files-o:before{content:\"\\F0C5\"}.fa-paperclip:before{content:\"\\F0C6\"}.fa-save:before,.fa-floppy-o:before{content:\"\\F0C7\"}.fa-square:before{content:\"\\F0C8\"}.fa-navicon:before,.fa-reorder:before,.fa-bars:before{content:\"\\F0C9\"}.fa-list-ul:before{content:\"\\F0CA\"}.fa-list-ol:before{content:\"\\F0CB\"}.fa-strikethrough:before{content:\"\\F0CC\"}.fa-underline:before{content:\"\\F0CD\"}.fa-table:before{content:\"\\F0CE\"}.fa-magic:before{content:\"\\F0D0\"}.fa-truck:before{content:\"\\F0D1\"}.fa-pinterest:before{content:\"\\F0D2\"}.fa-pinterest-square:before{content:\"\\F0D3\"}.fa-google-plus-square:before{content:\"\\F0D4\"}.fa-google-plus:before{content:\"\\F0D5\"}.fa-money:before{content:\"\\F0D6\"}.fa-caret-down:before{content:\"\\F0D7\"}.fa-caret-up:before{content:\"\\F0D8\"}.fa-caret-left:before{content:\"\\F0D9\"}.fa-caret-right:before{content:\"\\F0DA\"}.fa-columns:before{content:\"\\F0DB\"}.fa-unsorted:before,.fa-sort:before{content:\"\\F0DC\"}.fa-sort-down:before,.fa-sort-desc:before{content:\"\\F0DD\"}.fa-sort-up:before,.fa-sort-asc:before{content:\"\\F0DE\"}.fa-envelope:before{content:\"\\F0E0\"}.fa-linkedin:before{content:\"\\F0E1\"}.fa-rotate-left:before,.fa-undo:before{content:\"\\F0E2\"}.fa-legal:before,.fa-gavel:before{content:\"\\F0E3\"}.fa-dashboard:before,.fa-tachometer:before{content:\"\\F0E4\"}.fa-comment-o:before{content:\"\\F0E5\"}.fa-comments-o:before{content:\"\\F0E6\"}.fa-flash:before,.fa-bolt:before{content:\"\\F0E7\"}.fa-sitemap:before{content:\"\\F0E8\"}.fa-umbrella:before{content:\"\\F0E9\"}.fa-paste:before,.fa-clipboard:before{content:\"\\F0EA\"}.fa-lightbulb-o:before{content:\"\\F0EB\"}.fa-exchange:before{content:\"\\F0EC\"}.fa-cloud-download:before{content:\"\\F0ED\"}.fa-cloud-upload:before{content:\"\\F0EE\"}.fa-user-md:before{content:\"\\F0F0\"}.fa-stethoscope:before{content:\"\\F0F1\"}.fa-suitcase:before{content:\"\\F0F2\"}.fa-bell-o:before{content:\"\\F0A2\"}.fa-coffee:before{content:\"\\F0F4\"}.fa-cutlery:before{content:\"\\F0F5\"}.fa-file-text-o:before{content:\"\\F0F6\"}.fa-building-o:before{content:\"\\F0F7\"}.fa-hospital-o:before{content:\"\\F0F8\"}.fa-ambulance:before{content:\"\\F0F9\"}.fa-medkit:before{content:\"\\F0FA\"}.fa-fighter-jet:before{content:\"\\F0FB\"}.fa-beer:before{content:\"\\F0FC\"}.fa-h-square:before{content:\"\\F0FD\"}.fa-plus-square:before{content:\"\\F0FE\"}.fa-angle-double-left:before{content:\"\\F100\"}.fa-angle-double-right:before{content:\"\\F101\"}.fa-angle-double-up:before{content:\"\\F102\"}.fa-angle-double-down:before{content:\"\\F103\"}.fa-angle-left:before{content:\"\\F104\"}.fa-angle-right:before{content:\"\\F105\"}.fa-angle-up:before{content:\"\\F106\"}.fa-angle-down:before{content:\"\\F107\"}.fa-desktop:before{content:\"\\F108\"}.fa-laptop:before{content:\"\\F109\"}.fa-tablet:before{content:\"\\F10A\"}.fa-mobile-phone:before,.fa-mobile:before{content:\"\\F10B\"}.fa-circle-o:before{content:\"\\F10C\"}.fa-quote-left:before{content:\"\\F10D\"}.fa-quote-right:before{content:\"\\F10E\"}.fa-spinner:before{content:\"\\F110\"}.fa-circle:before{content:\"\\F111\"}.fa-mail-reply:before,.fa-reply:before{content:\"\\F112\"}.fa-github-alt:before{content:\"\\F113\"}.fa-folder-o:before{content:\"\\F114\"}.fa-folder-open-o:before{content:\"\\F115\"}.fa-smile-o:before{content:\"\\F118\"}.fa-frown-o:before{content:\"\\F119\"}.fa-meh-o:before{content:\"\\F11A\"}.fa-gamepad:before{content:\"\\F11B\"}.fa-keyboard-o:before{content:\"\\F11C\"}.fa-flag-o:before{content:\"\\F11D\"}.fa-flag-checkered:before{content:\"\\F11E\"}.fa-terminal:before{content:\"\\F120\"}.fa-code:before{content:\"\\F121\"}.fa-mail-reply-all:before,.fa-reply-all:before{content:\"\\F122\"}.fa-star-half-empty:before,.fa-star-half-full:before,.fa-star-half-o:before{content:\"\\F123\"}.fa-location-arrow:before{content:\"\\F124\"}.fa-crop:before{content:\"\\F125\"}.fa-code-fork:before{content:\"\\F126\"}.fa-unlink:before,.fa-chain-broken:before{content:\"\\F127\"}.fa-question:before{content:\"\\F128\"}.fa-info:before{content:\"\\F129\"}.fa-exclamation:before{content:\"\\F12A\"}.fa-superscript:before{content:\"\\F12B\"}.fa-subscript:before{content:\"\\F12C\"}.fa-eraser:before{content:\"\\F12D\"}.fa-puzzle-piece:before{content:\"\\F12E\"}.fa-microphone:before{content:\"\\F130\"}.fa-microphone-slash:before{content:\"\\F131\"}.fa-shield:before{content:\"\\F132\"}.fa-calendar-o:before{content:\"\\F133\"}.fa-fire-extinguisher:before{content:\"\\F134\"}.fa-rocket:before{content:\"\\F135\"}.fa-maxcdn:before{content:\"\\F136\"}.fa-chevron-circle-left:before{content:\"\\F137\"}.fa-chevron-circle-right:before{content:\"\\F138\"}.fa-chevron-circle-up:before{content:\"\\F139\"}.fa-chevron-circle-down:before{content:\"\\F13A\"}.fa-html5:before{content:\"\\F13B\"}.fa-css3:before{content:\"\\F13C\"}.fa-anchor:before{content:\"\\F13D\"}.fa-unlock-alt:before{content:\"\\F13E\"}.fa-bullseye:before{content:\"\\F140\"}.fa-ellipsis-h:before{content:\"\\F141\"}.fa-ellipsis-v:before{content:\"\\F142\"}.fa-rss-square:before{content:\"\\F143\"}.fa-play-circle:before{content:\"\\F144\"}.fa-ticket:before{content:\"\\F145\"}.fa-minus-square:before{content:\"\\F146\"}.fa-minus-square-o:before{content:\"\\F147\"}.fa-level-up:before{content:\"\\F148\"}.fa-level-down:before{content:\"\\F149\"}.fa-check-square:before{content:\"\\F14A\"}.fa-pencil-square:before{content:\"\\F14B\"}.fa-external-link-square:before{content:\"\\F14C\"}.fa-share-square:before{content:\"\\F14D\"}.fa-compass:before{content:\"\\F14E\"}.fa-toggle-down:before,.fa-caret-square-o-down:before{content:\"\\F150\"}.fa-toggle-up:before,.fa-caret-square-o-up:before{content:\"\\F151\"}.fa-toggle-right:before,.fa-caret-square-o-right:before{content:\"\\F152\"}.fa-euro:before,.fa-eur:before{content:\"\\F153\"}.fa-gbp:before{content:\"\\F154\"}.fa-dollar:before,.fa-usd:before{content:\"\\F155\"}.fa-rupee:before,.fa-inr:before{content:\"\\F156\"}.fa-cny:before,.fa-rmb:before,.fa-yen:before,.fa-jpy:before{content:\"\\F157\"}.fa-ruble:before,.fa-rouble:before,.fa-rub:before{content:\"\\F158\"}.fa-won:before,.fa-krw:before{content:\"\\F159\"}.fa-bitcoin:before,.fa-btc:before{content:\"\\F15A\"}.fa-file:before{content:\"\\F15B\"}.fa-file-text:before{content:\"\\F15C\"}.fa-sort-alpha-asc:before{content:\"\\F15D\"}.fa-sort-alpha-desc:before{content:\"\\F15E\"}.fa-sort-amount-asc:before{content:\"\\F160\"}.fa-sort-amount-desc:before{content:\"\\F161\"}.fa-sort-numeric-asc:before{content:\"\\F162\"}.fa-sort-numeric-desc:before{content:\"\\F163\"}.fa-thumbs-up:before{content:\"\\F164\"}.fa-thumbs-down:before{content:\"\\F165\"}.fa-youtube-square:before{content:\"\\F166\"}.fa-youtube:before{content:\"\\F167\"}.fa-xing:before{content:\"\\F168\"}.fa-xing-square:before{content:\"\\F169\"}.fa-youtube-play:before{content:\"\\F16A\"}.fa-dropbox:before{content:\"\\F16B\"}.fa-stack-overflow:before{content:\"\\F16C\"}.fa-instagram:before{content:\"\\F16D\"}.fa-flickr:before{content:\"\\F16E\"}.fa-adn:before{content:\"\\F170\"}.fa-bitbucket:before{content:\"\\F171\"}.fa-bitbucket-square:before{content:\"\\F172\"}.fa-tumblr:before{content:\"\\F173\"}.fa-tumblr-square:before{content:\"\\F174\"}.fa-long-arrow-down:before{content:\"\\F175\"}.fa-long-arrow-up:before{content:\"\\F176\"}.fa-long-arrow-left:before{content:\"\\F177\"}.fa-long-arrow-right:before{content:\"\\F178\"}.fa-apple:before{content:\"\\F179\"}.fa-windows:before{content:\"\\F17A\"}.fa-android:before{content:\"\\F17B\"}.fa-linux:before{content:\"\\F17C\"}.fa-dribbble:before{content:\"\\F17D\"}.fa-skype:before{content:\"\\F17E\"}.fa-foursquare:before{content:\"\\F180\"}.fa-trello:before{content:\"\\F181\"}.fa-female:before{content:\"\\F182\"}.fa-male:before{content:\"\\F183\"}.fa-gittip:before,.fa-gratipay:before{content:\"\\F184\"}.fa-sun-o:before{content:\"\\F185\"}.fa-moon-o:before{content:\"\\F186\"}.fa-archive:before{content:\"\\F187\"}.fa-bug:before{content:\"\\F188\"}.fa-vk:before{content:\"\\F189\"}.fa-weibo:before{content:\"\\F18A\"}.fa-renren:before{content:\"\\F18B\"}.fa-pagelines:before{content:\"\\F18C\"}.fa-stack-exchange:before{content:\"\\F18D\"}.fa-arrow-circle-o-right:before{content:\"\\F18E\"}.fa-arrow-circle-o-left:before{content:\"\\F190\"}.fa-toggle-left:before,.fa-caret-square-o-left:before{content:\"\\F191\"}.fa-dot-circle-o:before{content:\"\\F192\"}.fa-wheelchair:before{content:\"\\F193\"}.fa-vimeo-square:before{content:\"\\F194\"}.fa-turkish-lira:before,.fa-try:before{content:\"\\F195\"}.fa-plus-square-o:before{content:\"\\F196\"}.fa-space-shuttle:before{content:\"\\F197\"}.fa-slack:before{content:\"\\F198\"}.fa-envelope-square:before{content:\"\\F199\"}.fa-wordpress:before{content:\"\\F19A\"}.fa-openid:before{content:\"\\F19B\"}.fa-institution:before,.fa-bank:before,.fa-university:before{content:\"\\F19C\"}.fa-mortar-board:before,.fa-graduation-cap:before{content:\"\\F19D\"}.fa-yahoo:before{content:\"\\F19E\"}.fa-google:before{content:\"\\F1A0\"}.fa-reddit:before{content:\"\\F1A1\"}.fa-reddit-square:before{content:\"\\F1A2\"}.fa-stumbleupon-circle:before{content:\"\\F1A3\"}.fa-stumbleupon:before{content:\"\\F1A4\"}.fa-delicious:before{content:\"\\F1A5\"}.fa-digg:before{content:\"\\F1A6\"}.fa-pied-piper-pp:before{content:\"\\F1A7\"}.fa-pied-piper-alt:before{content:\"\\F1A8\"}.fa-drupal:before{content:\"\\F1A9\"}.fa-joomla:before{content:\"\\F1AA\"}.fa-language:before{content:\"\\F1AB\"}.fa-fax:before{content:\"\\F1AC\"}.fa-building:before{content:\"\\F1AD\"}.fa-child:before{content:\"\\F1AE\"}.fa-paw:before{content:\"\\F1B0\"}.fa-spoon:before{content:\"\\F1B1\"}.fa-cube:before{content:\"\\F1B2\"}.fa-cubes:before{content:\"\\F1B3\"}.fa-behance:before{content:\"\\F1B4\"}.fa-behance-square:before{content:\"\\F1B5\"}.fa-steam:before{content:\"\\F1B6\"}.fa-steam-square:before{content:\"\\F1B7\"}.fa-recycle:before{content:\"\\F1B8\"}.fa-automobile:before,.fa-car:before{content:\"\\F1B9\"}.fa-cab:before,.fa-taxi:before{content:\"\\F1BA\"}.fa-tree:before{content:\"\\F1BB\"}.fa-spotify:before{content:\"\\F1BC\"}.fa-deviantart:before{content:\"\\F1BD\"}.fa-soundcloud:before{content:\"\\F1BE\"}.fa-database:before{content:\"\\F1C0\"}.fa-file-pdf-o:before{content:\"\\F1C1\"}.fa-file-word-o:before{content:\"\\F1C2\"}.fa-file-excel-o:before{content:\"\\F1C3\"}.fa-file-powerpoint-o:before{content:\"\\F1C4\"}.fa-file-photo-o:before,.fa-file-picture-o:before,.fa-file-image-o:before{content:\"\\F1C5\"}.fa-file-zip-o:before,.fa-file-archive-o:before{content:\"\\F1C6\"}.fa-file-sound-o:before,.fa-file-audio-o:before{content:\"\\F1C7\"}.fa-file-movie-o:before,.fa-file-video-o:before{content:\"\\F1C8\"}.fa-file-code-o:before{content:\"\\F1C9\"}.fa-vine:before{content:\"\\F1CA\"}.fa-codepen:before{content:\"\\F1CB\"}.fa-jsfiddle:before{content:\"\\F1CC\"}.fa-life-bouy:before,.fa-life-buoy:before,.fa-life-saver:before,.fa-support:before,.fa-life-ring:before{content:\"\\F1CD\"}.fa-circle-o-notch:before{content:\"\\F1CE\"}.fa-ra:before,.fa-resistance:before,.fa-rebel:before{content:\"\\F1D0\"}.fa-ge:before,.fa-empire:before{content:\"\\F1D1\"}.fa-git-square:before{content:\"\\F1D2\"}.fa-git:before{content:\"\\F1D3\"}.fa-y-combinator-square:before,.fa-yc-square:before,.fa-hacker-news:before{content:\"\\F1D4\"}.fa-tencent-weibo:before{content:\"\\F1D5\"}.fa-qq:before{content:\"\\F1D6\"}.fa-wechat:before,.fa-weixin:before{content:\"\\F1D7\"}.fa-send:before,.fa-paper-plane:before{content:\"\\F1D8\"}.fa-send-o:before,.fa-paper-plane-o:before{content:\"\\F1D9\"}.fa-history:before{content:\"\\F1DA\"}.fa-circle-thin:before{content:\"\\F1DB\"}.fa-header:before{content:\"\\F1DC\"}.fa-paragraph:before{content:\"\\F1DD\"}.fa-sliders:before{content:\"\\F1DE\"}.fa-share-alt:before{content:\"\\F1E0\"}.fa-share-alt-square:before{content:\"\\F1E1\"}.fa-bomb:before{content:\"\\F1E2\"}.fa-soccer-ball-o:before,.fa-futbol-o:before{content:\"\\F1E3\"}.fa-tty:before{content:\"\\F1E4\"}.fa-binoculars:before{content:\"\\F1E5\"}.fa-plug:before{content:\"\\F1E6\"}.fa-slideshare:before{content:\"\\F1E7\"}.fa-twitch:before{content:\"\\F1E8\"}.fa-yelp:before{content:\"\\F1E9\"}.fa-newspaper-o:before{content:\"\\F1EA\"}.fa-wifi:before{content:\"\\F1EB\"}.fa-calculator:before{content:\"\\F1EC\"}.fa-paypal:before{content:\"\\F1ED\"}.fa-google-wallet:before{content:\"\\F1EE\"}.fa-cc-visa:before{content:\"\\F1F0\"}.fa-cc-mastercard:before{content:\"\\F1F1\"}.fa-cc-discover:before{content:\"\\F1F2\"}.fa-cc-amex:before{content:\"\\F1F3\"}.fa-cc-paypal:before{content:\"\\F1F4\"}.fa-cc-stripe:before{content:\"\\F1F5\"}.fa-bell-slash:before{content:\"\\F1F6\"}.fa-bell-slash-o:before{content:\"\\F1F7\"}.fa-trash:before{content:\"\\F1F8\"}.fa-copyright:before{content:\"\\F1F9\"}.fa-at:before{content:\"\\F1FA\"}.fa-eyedropper:before{content:\"\\F1FB\"}.fa-paint-brush:before{content:\"\\F1FC\"}.fa-birthday-cake:before{content:\"\\F1FD\"}.fa-area-chart:before{content:\"\\F1FE\"}.fa-pie-chart:before{content:\"\\F200\"}.fa-line-chart:before{content:\"\\F201\"}.fa-lastfm:before{content:\"\\F202\"}.fa-lastfm-square:before{content:\"\\F203\"}.fa-toggle-off:before{content:\"\\F204\"}.fa-toggle-on:before{content:\"\\F205\"}.fa-bicycle:before{content:\"\\F206\"}.fa-bus:before{content:\"\\F207\"}.fa-ioxhost:before{content:\"\\F208\"}.fa-angellist:before{content:\"\\F209\"}.fa-cc:before{content:\"\\F20A\"}.fa-shekel:before,.fa-sheqel:before,.fa-ils:before{content:\"\\F20B\"}.fa-meanpath:before{content:\"\\F20C\"}.fa-buysellads:before{content:\"\\F20D\"}.fa-connectdevelop:before{content:\"\\F20E\"}.fa-dashcube:before{content:\"\\F210\"}.fa-forumbee:before{content:\"\\F211\"}.fa-leanpub:before{content:\"\\F212\"}.fa-sellsy:before{content:\"\\F213\"}.fa-shirtsinbulk:before{content:\"\\F214\"}.fa-simplybuilt:before{content:\"\\F215\"}.fa-skyatlas:before{content:\"\\F216\"}.fa-cart-plus:before{content:\"\\F217\"}.fa-cart-arrow-down:before{content:\"\\F218\"}.fa-diamond:before{content:\"\\F219\"}.fa-ship:before{content:\"\\F21A\"}.fa-user-secret:before{content:\"\\F21B\"}.fa-motorcycle:before{content:\"\\F21C\"}.fa-street-view:before{content:\"\\F21D\"}.fa-heartbeat:before{content:\"\\F21E\"}.fa-venus:before{content:\"\\F221\"}.fa-mars:before{content:\"\\F222\"}.fa-mercury:before{content:\"\\F223\"}.fa-intersex:before,.fa-transgender:before{content:\"\\F224\"}.fa-transgender-alt:before{content:\"\\F225\"}.fa-venus-double:before{content:\"\\F226\"}.fa-mars-double:before{content:\"\\F227\"}.fa-venus-mars:before{content:\"\\F228\"}.fa-mars-stroke:before{content:\"\\F229\"}.fa-mars-stroke-v:before{content:\"\\F22A\"}.fa-mars-stroke-h:before{content:\"\\F22B\"}.fa-neuter:before{content:\"\\F22C\"}.fa-genderless:before{content:\"\\F22D\"}.fa-facebook-official:before{content:\"\\F230\"}.fa-pinterest-p:before{content:\"\\F231\"}.fa-whatsapp:before{content:\"\\F232\"}.fa-server:before{content:\"\\F233\"}.fa-user-plus:before{content:\"\\F234\"}.fa-user-times:before{content:\"\\F235\"}.fa-hotel:before,.fa-bed:before{content:\"\\F236\"}.fa-viacoin:before{content:\"\\F237\"}.fa-train:before{content:\"\\F238\"}.fa-subway:before{content:\"\\F239\"}.fa-medium:before{content:\"\\F23A\"}.fa-yc:before,.fa-y-combinator:before{content:\"\\F23B\"}.fa-optin-monster:before{content:\"\\F23C\"}.fa-opencart:before{content:\"\\F23D\"}.fa-expeditedssl:before{content:\"\\F23E\"}.fa-battery-4:before,.fa-battery:before,.fa-battery-full:before{content:\"\\F240\"}.fa-battery-3:before,.fa-battery-three-quarters:before{content:\"\\F241\"}.fa-battery-2:before,.fa-battery-half:before{content:\"\\F242\"}.fa-battery-1:before,.fa-battery-quarter:before{content:\"\\F243\"}.fa-battery-0:before,.fa-battery-empty:before{content:\"\\F244\"}.fa-mouse-pointer:before{content:\"\\F245\"}.fa-i-cursor:before{content:\"\\F246\"}.fa-object-group:before{content:\"\\F247\"}.fa-object-ungroup:before{content:\"\\F248\"}.fa-sticky-note:before{content:\"\\F249\"}.fa-sticky-note-o:before{content:\"\\F24A\"}.fa-cc-jcb:before{content:\"\\F24B\"}.fa-cc-diners-club:before{content:\"\\F24C\"}.fa-clone:before{content:\"\\F24D\"}.fa-balance-scale:before{content:\"\\F24E\"}.fa-hourglass-o:before{content:\"\\F250\"}.fa-hourglass-1:before,.fa-hourglass-start:before{content:\"\\F251\"}.fa-hourglass-2:before,.fa-hourglass-half:before{content:\"\\F252\"}.fa-hourglass-3:before,.fa-hourglass-end:before{content:\"\\F253\"}.fa-hourglass:before{content:\"\\F254\"}.fa-hand-grab-o:before,.fa-hand-rock-o:before{content:\"\\F255\"}.fa-hand-stop-o:before,.fa-hand-paper-o:before{content:\"\\F256\"}.fa-hand-scissors-o:before{content:\"\\F257\"}.fa-hand-lizard-o:before{content:\"\\F258\"}.fa-hand-spock-o:before{content:\"\\F259\"}.fa-hand-pointer-o:before{content:\"\\F25A\"}.fa-hand-peace-o:before{content:\"\\F25B\"}.fa-trademark:before{content:\"\\F25C\"}.fa-registered:before{content:\"\\F25D\"}.fa-creative-commons:before{content:\"\\F25E\"}.fa-gg:before{content:\"\\F260\"}.fa-gg-circle:before{content:\"\\F261\"}.fa-tripadvisor:before{content:\"\\F262\"}.fa-odnoklassniki:before{content:\"\\F263\"}.fa-odnoklassniki-square:before{content:\"\\F264\"}.fa-get-pocket:before{content:\"\\F265\"}.fa-wikipedia-w:before{content:\"\\F266\"}.fa-safari:before{content:\"\\F267\"}.fa-chrome:before{content:\"\\F268\"}.fa-firefox:before{content:\"\\F269\"}.fa-opera:before{content:\"\\F26A\"}.fa-internet-explorer:before{content:\"\\F26B\"}.fa-tv:before,.fa-television:before{content:\"\\F26C\"}.fa-contao:before{content:\"\\F26D\"}.fa-500px:before{content:\"\\F26E\"}.fa-amazon:before{content:\"\\F270\"}.fa-calendar-plus-o:before{content:\"\\F271\"}.fa-calendar-minus-o:before{content:\"\\F272\"}.fa-calendar-times-o:before{content:\"\\F273\"}.fa-calendar-check-o:before{content:\"\\F274\"}.fa-industry:before{content:\"\\F275\"}.fa-map-pin:before{content:\"\\F276\"}.fa-map-signs:before{content:\"\\F277\"}.fa-map-o:before{content:\"\\F278\"}.fa-map:before{content:\"\\F279\"}.fa-commenting:before{content:\"\\F27A\"}.fa-commenting-o:before{content:\"\\F27B\"}.fa-houzz:before{content:\"\\F27C\"}.fa-vimeo:before{content:\"\\F27D\"}.fa-black-tie:before{content:\"\\F27E\"}.fa-fonticons:before{content:\"\\F280\"}.fa-reddit-alien:before{content:\"\\F281\"}.fa-edge:before{content:\"\\F282\"}.fa-credit-card-alt:before{content:\"\\F283\"}.fa-codiepie:before{content:\"\\F284\"}.fa-modx:before{content:\"\\F285\"}.fa-fort-awesome:before{content:\"\\F286\"}.fa-usb:before{content:\"\\F287\"}.fa-product-hunt:before{content:\"\\F288\"}.fa-mixcloud:before{content:\"\\F289\"}.fa-scribd:before{content:\"\\F28A\"}.fa-pause-circle:before{content:\"\\F28B\"}.fa-pause-circle-o:before{content:\"\\F28C\"}.fa-stop-circle:before{content:\"\\F28D\"}.fa-stop-circle-o:before{content:\"\\F28E\"}.fa-shopping-bag:before{content:\"\\F290\"}.fa-shopping-basket:before{content:\"\\F291\"}.fa-hashtag:before{content:\"\\F292\"}.fa-bluetooth:before{content:\"\\F293\"}.fa-bluetooth-b:before{content:\"\\F294\"}.fa-percent:before{content:\"\\F295\"}.fa-gitlab:before{content:\"\\F296\"}.fa-wpbeginner:before{content:\"\\F297\"}.fa-wpforms:before{content:\"\\F298\"}.fa-envira:before{content:\"\\F299\"}.fa-universal-access:before{content:\"\\F29A\"}.fa-wheelchair-alt:before{content:\"\\F29B\"}.fa-question-circle-o:before{content:\"\\F29C\"}.fa-blind:before{content:\"\\F29D\"}.fa-audio-description:before{content:\"\\F29E\"}.fa-volume-control-phone:before{content:\"\\F2A0\"}.fa-braille:before{content:\"\\F2A1\"}.fa-assistive-listening-systems:before{content:\"\\F2A2\"}.fa-asl-interpreting:before,.fa-american-sign-language-interpreting:before{content:\"\\F2A3\"}.fa-deafness:before,.fa-hard-of-hearing:before,.fa-deaf:before{content:\"\\F2A4\"}.fa-glide:before{content:\"\\F2A5\"}.fa-glide-g:before{content:\"\\F2A6\"}.fa-signing:before,.fa-sign-language:before{content:\"\\F2A7\"}.fa-low-vision:before{content:\"\\F2A8\"}.fa-viadeo:before{content:\"\\F2A9\"}.fa-viadeo-square:before{content:\"\\F2AA\"}.fa-snapchat:before{content:\"\\F2AB\"}.fa-snapchat-ghost:before{content:\"\\F2AC\"}.fa-snapchat-square:before{content:\"\\F2AD\"}.fa-pied-piper:before{content:\"\\F2AE\"}.fa-first-order:before{content:\"\\F2B0\"}.fa-yoast:before{content:\"\\F2B1\"}.fa-themeisle:before{content:\"\\F2B2\"}.fa-google-plus-circle:before,.fa-google-plus-official:before{content:\"\\F2B3\"}.fa-fa:before,.fa-font-awesome:before{content:\"\\F2B4\"}.fa-handshake-o:before{content:\"\\F2B5\"}.fa-envelope-open:before{content:\"\\F2B6\"}.fa-envelope-open-o:before{content:\"\\F2B7\"}.fa-linode:before{content:\"\\F2B8\"}.fa-address-book:before{content:\"\\F2B9\"}.fa-address-book-o:before{content:\"\\F2BA\"}.fa-vcard:before,.fa-address-card:before{content:\"\\F2BB\"}.fa-vcard-o:before,.fa-address-card-o:before{content:\"\\F2BC\"}.fa-user-circle:before{content:\"\\F2BD\"}.fa-user-circle-o:before{content:\"\\F2BE\"}.fa-user-o:before{content:\"\\F2C0\"}.fa-id-badge:before{content:\"\\F2C1\"}.fa-drivers-license:before,.fa-id-card:before{content:\"\\F2C2\"}.fa-drivers-license-o:before,.fa-id-card-o:before{content:\"\\F2C3\"}.fa-quora:before{content:\"\\F2C4\"}.fa-free-code-camp:before{content:\"\\F2C5\"}.fa-telegram:before{content:\"\\F2C6\"}.fa-thermometer-4:before,.fa-thermometer:before,.fa-thermometer-full:before{content:\"\\F2C7\"}.fa-thermometer-3:before,.fa-thermometer-three-quarters:before{content:\"\\F2C8\"}.fa-thermometer-2:before,.fa-thermometer-half:before{content:\"\\F2C9\"}.fa-thermometer-1:before,.fa-thermometer-quarter:before{content:\"\\F2CA\"}.fa-thermometer-0:before,.fa-thermometer-empty:before{content:\"\\F2CB\"}.fa-shower:before{content:\"\\F2CC\"}.fa-bathtub:before,.fa-s15:before,.fa-bath:before{content:\"\\F2CD\"}.fa-podcast:before{content:\"\\F2CE\"}.fa-window-maximize:before{content:\"\\F2D0\"}.fa-window-minimize:before{content:\"\\F2D1\"}.fa-window-restore:before{content:\"\\F2D2\"}.fa-times-rectangle:before,.fa-window-close:before{content:\"\\F2D3\"}.fa-times-rectangle-o:before,.fa-window-close-o:before{content:\"\\F2D4\"}.fa-bandcamp:before{content:\"\\F2D5\"}.fa-grav:before{content:\"\\F2D6\"}.fa-etsy:before{content:\"\\F2D7\"}.fa-imdb:before{content:\"\\F2D8\"}.fa-ravelry:before{content:\"\\F2D9\"}.fa-eercast:before{content:\"\\F2DA\"}.fa-microchip:before{content:\"\\F2DB\"}.fa-snowflake-o:before{content:\"\\F2DC\"}.fa-superpowers:before{content:\"\\F2DD\"}.fa-wpexplorer:before{content:\"\\F2DE\"}.fa-meetup:before{content:\"\\F2E0\"}.sr-only{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0, 0, 0, 0);border:0}.sr-only-focusable:active,.sr-only-focusable:focus{position:static;width:auto;height:auto;margin:0;overflow:visible;clip:auto}\r\n", ""]);

// exports


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "674f50d287a8c48dc19ba404d20fe713.eot";

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "674f50d287a8c48dc19ba404d20fe713.eot";

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "af7ae505a9eed503f8b8e6982036873e.woff2";

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "fee66e712a8a08eef5805a46892932ad.woff";

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "b06871f281fee6b241d60582ae9369b9.ttf";

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "acf3dcb7ff752b5296ca23ba2c7c2606.svg";

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(26);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(2)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../node_modules/css-loader/index.js!./color-picker.min.css", function() {
			var newContent = require("!!../../node_modules/css-loader/index.js!./color-picker.min.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(undefined);
// imports


// module
exports.push([module.i, ".color-picker,.color-picker *,.color-picker :after,.color-picker :before,.color-picker:after,.color-picker:before{-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box}.color-picker{position:absolute;top:0;left:0;z-index:9999}.color-picker-control{border:1px solid #000;-webkit-box-shadow:1px 5px 10px rgba(0,0,0,.5);-moz-box-shadow:1px 5px 10px rgba(0,0,0,.5);box-shadow:1px 5px 10px rgba(0,0,0,.5)}.color-picker-control *,.color-picker-control :after,.color-picker-control :before{border-color:inherit}.color-picker-control:after{content:\" \";display:table;clear:both}.color-picker i{font:inherit}.color-picker-h{position:relative;width:20px;height:150px;float:right;border-left:1px solid;border-left-color:inherit;cursor:ns-resize;background:url(" + __webpack_require__(27) + ") 50% 50% no-repeat;background-image:-webkit-linear-gradient(to top,red 0,#ff0 17%,#0f0 33%,#0ff 50%,#00f 67%,#f0f 83%,red 100%);background-image:-moz-linear-gradient(to top,red 0,#ff0 17%,#0f0 33%,#0ff 50%,#00f 67%,#f0f 83%,red 100%);background-image:linear-gradient(to top,red 0,#ff0 17%,#0f0 33%,#0ff 50%,#00f 67%,#f0f 83%,red 100%);-webkit-background-size:100% 100%;-moz-background-size:100% 100%;background-size:100% 100%;overflow:hidden}.color-picker-h i,.color-picker-h i:before{left:0;display:block;position:absolute;right:0}.color-picker-h i{top:-3px;z-index:3;height:6px}.color-picker-h i:before{content:\"\";top:0;bottom:0;border:3px solid;border-color:inherit;border-top-color:transparent;border-bottom-color:transparent}.color-picker-sv{position:relative;width:150px;height:150px;float:left;background:url(" + __webpack_require__(28) + ") 50% 50% no-repeat;background-image:-webkit-linear-gradient(to top,#000,rgba(0,0,0,0)),linear-gradient(to right,#fff,rgba(255,255,255,0));background-image:-moz-linear-gradient(to top,#000,rgba(0,0,0,0)),linear-gradient(to right,#fff,rgba(255,255,255,0));background-image:linear-gradient(to top,#000,rgba(0,0,0,0)),linear-gradient(to right,#fff,rgba(255,255,255,0));-webkit-background-size:100% 100%;-moz-background-size:100% 100%;background-size:100% 100%;cursor:crosshair}.color-picker-sv i{position:absolute;top:-4px;right:-4px;z-index:3;display:block;width:8px;height:8px}.color-picker-sv i:after,.color-picker-sv i:before{content:\"\";position:absolute;top:0;right:0;bottom:0;left:0;display:block;border:1px solid;border-color:inherit;-webkit-border-radius:100%;-moz-border-radius:100%;border-radius:100%}.color-picker-sv i:before{top:-1px;right:-1px;bottom:-1px;left:-1px;border-color:#fff}.color-picker-h,.color-picker-sv{-webkit-touch-callout:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;-webkit-tap-highlight-color:transparent}", ""]);

// exports


/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "0c502eb2a7a499f460383ab08c3096c6.png";

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "cac8d86d3b4c2731cafced509d4b26c4.png";

/***/ }),
/* 29 */
/***/ (function(module, exports) {

/**
 * Created by 10399 on 2017/5/29.
 */



/**
 * 让浏览器全屏的函数
 * @type {{launchFullscreen: fullScreen.launchFullscreen, exitFullscreen: fullScreen.exitFullscreen}}
 */
var fullScreen = {
	launchFullscreen: function (element) {
		if(element.requestFullscreen) {
			element.requestFullscreen();
		} else if(element.mozRequestFullScreen) {
			element.mozRequestFullScreen();
		} else if(element.msRequestFullscreen){
			element.msRequestFullscreen();
		} else if(element.webkitRequestFullscreen) {
			element.webkitRequestFullScreen();
		}
	},
	exitFullscreen: function () {
		if (document.exitFullscreen) {
			document.exitFullscreen();
		} else if (document.msExitFullscreen) {
			document.msExitFullscreen();
		} else if (document.mozCancelFullScreen) {
			document.mozCancelFullScreen();
		} else if (document.webkitExitFullscreen) {
			document.webkitExitFullscreen();
		}
	}
};

/**
 * 使某个元素可以被鼠标拖动来改变位置
 * @param $enable 能发生拖动的元素
 * @param $move 被拖动的元素
 */
var setDragMoving = function ($enable, $move) {
	var isDraging = false;
	var oldPosX, oldPosY, startPosX, startPosY;
	
	/**
	 * 使浮出层保持在屏幕内
	 * @param pos {Number} 浮出层的坐标
	 * @param maxPos {Number} 浮出层的最大坐标
	 * @returns {Number} 修正后的坐标
	 */
	var getPosInScreen = function (pos, maxPos) {
		if (pos < 0) {
			return 0;
		}
		else if (pos > maxPos) {
			return maxPos;
		}
		else {
			return pos;
		}
	};
	
	$enable.addEventListener('mousedown', function (event) {
		isDraging = true;
		//保存要移动的对象的当前位置
		oldPosX = parseInt($move.style.left.split('px')[0]);
		oldPosY = parseInt($move.style.top.split('px')[0]);
		//保存鼠标当前的位置
		startPosX = event.screenX;
		startPosY = event.screenY;
		return false;       //防止浏览器选中内容
	});
	
	window.addEventListener('mouseup', function () {
		isDraging = false;
	});
	
	window.addEventListener('mousemove', function (event) {
		if (isDraging) {
			//当前坐标 = 开始拖动时浮出层的坐标 + 鼠标移动的坐标
			var currentPosX = oldPosX + event.screenX - startPosX;
			var currentPosY = oldPosY + event.screenY - startPosY;
			
			//最大拖动范围
			var maxPosX = window.innerWidth - $move.offsetWidth;
			var maxPosY = window.innerHeight - $move.offsetHeight;
			
			//修正当前坐标，使浮出层保持在屏幕内
			currentPosX = getPosInScreen(currentPosX, maxPosX);
			currentPosY = getPosInScreen(currentPosY, maxPosY);
			
			$move.style.left = currentPosX + 'px';
			$move.style.top = currentPosY + 'px';
		}
	});
};



/**
 * 获取某个radio选中的元素
 * @param radioName {String} 要获取的name属性
 * @returns {HTMLInputElement} 选中的元素
 */
function getRadioCheckedElement(radioName) {
	var $radios = document.getElementsByName(radioName);
	for (var i = 0, item; item = $radios[i++];) {
		if (item.checked) {
			return item;
		}
	}
}

/**
 * 遍历监听radio的change事件
 * @param radioName {String} 要监听的radio的name
 * @param callback {Function} 对change之后新选中的元素进行操作的回调，this指向新选中的元素
 */
function listenRadioChange(radioName, callback) {
	var $radios = document.getElementsByName(radioName);
	$radios.forEach(function (item) {
		item.addEventListener('change', function () {
			if (this.checked) {
				return callback.call(this, arguments);
			}
		});
	});
}

/***/ }),
/* 30 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export option */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__element__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__color__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__view__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__WebDesktop__ = __webpack_require__(3);





var option = (function () {
	var $option = Object(__WEBPACK_IMPORTED_MODULE_0__element__["a" /* $ */])('.option'),
		currentTool = '',
		$currentOption = null,
		$currentToolDisplay = Object(__WEBPACK_IMPORTED_MODULE_0__element__["a" /* $ */])('#current-tool');
	return {
		switchOption: function (toolId) {
			$currentToolDisplay.className = Object(__WEBPACK_IMPORTED_MODULE_0__element__["a" /* $ */])('#tool-' + toolId).className;
			$currentOption && ($currentOption.className = '');
			$currentOption = Object(__WEBPACK_IMPORTED_MODULE_0__element__["a" /* $ */])('#option-' + toolId);
			$currentOption && ($currentOption.className = 'actived');
		}
	}
})();

var tool = (function () {
	var currentTool = 'move',
		toolCommandSet = null,
		isEnable = true;

	function _forEachEvents (isAdd) {
		if (toolCommandSet && toolCommandSet[currentTool]) {
			let commands = toolCommandSet[currentTool],
				keys = Object.keys(commands.event),
				handle;
			
			__WEBPACK_IMPORTED_MODULE_2__view__["a" /* default */].$canvas.style.cursor = commands.cursor ? commands.cursor : 'default';

			handle = isAdd ? 'addEventListener' : 'removeEventListener';

			keys.forEach(function (item) {
				if (item === 'keydown' || item === 'keyup') {
					window[handle](item, commands.event[item]);
				} else {
					__WEBPACK_IMPORTED_MODULE_2__view__["a" /* default */].$canvas[handle](item, commands.event[item]);
				}
			});
		} else {
			__WEBPACK_IMPORTED_MODULE_2__view__["a" /* default */].$canvas.style.cursor = 'default';
		}
	}

	function switchTool(toolId) {
		if (! Object(__WEBPACK_IMPORTED_MODULE_0__element__["a" /* $ */])('#tool-' + toolId)) return false;
		currentTool && Object(__WEBPACK_IMPORTED_MODULE_0__element__["a" /* $ */])('#tool-' + currentTool).removeClass('checked');
		_forEachEvents(false);
		currentTool = toolId;
        Object(__WEBPACK_IMPORTED_MODULE_0__element__["a" /* $ */])('#tool-' + currentTool).addClass('checked');
		option.switchOption(toolId);
		_forEachEvents(true);	
		
	}
	
	function bindToolCommandSet(_toolCommandSet) {
		toolCommandSet = _toolCommandSet;
	}

	function init() {
		switchTool('move');
		Object(__WEBPACK_IMPORTED_MODULE_0__element__["b" /* $$ */])('.tool>ul div').forEach(function (item) {
			item.onclick = function () {
				switchTool(Object(__WEBPACK_IMPORTED_MODULE_3__WebDesktop__["b" /* getIdSuffix */])(this.id));
            }
        });
    }

    init();

	return {
		currentTool: '',
		switchTool: switchTool,
		bindToolCommandSet: bindToolCommandSet,
		isEnable: isEnable
	};
})();

var toolCommandSet = (function () {
	var eyedropper = {
		// cursor: 'url("image/Eyedropper.png"), progress',
		event: {
			click: function (event) {
				var x = Object(__WEBPACK_IMPORTED_MODULE_0__element__["a" /* $ */])('#pos-x').innerText,
					y = Object(__WEBPACK_IMPORTED_MODULE_0__element__["a" /* $ */])('#pos-y').innerText,
					imageData = __WEBPACK_IMPORTED_MODULE_2__view__["a" /* default */].context.getImageData(x, y, 1, 1);

				__WEBPACK_IMPORTED_MODULE_1__color__["a" /* default */].setForeColor(__WEBPACK_IMPORTED_MODULE_1__color__["a" /* default */].RGB2HEX(imageData.data));
			}
		}
		
	};

	var hand = (function () {
		var _isKeyDown = false;

		function keydown (event) {
			_isKeyDown = true;
		}

		function mousemove (event) {
			if (_isKeyDown) {
				//
			}
		}

		return {
			cursor: '-webkit-grab, grab',
			event: {
				keydown: keydown,
				mousemove:mousemove
			}
		};
	})();

	var zoom = (function () {
		var _isZoomIn = true,
			_scaleRate = 0.2,
			cursor = 'zoom-in';
		function click (event) {
			var rate = _isZoomIn ? _scaleRate : (-1 * _scaleRate);
			__WEBPACK_IMPORTED_MODULE_2__view__["a" /* default */].scale(rate, event.clientX, event.clientY);
		}
		function keydown (event) {
			if (event.altKey) {
				_isZoomIn = false;
				__WEBPACK_IMPORTED_MODULE_2__view__["a" /* default */].$canvas.style.cursor = 'zoom-out';
			}
			event.preventDefault();
		}
		function keyup () {
			if (!_isZoomIn) {
				_isZoomIn = true;
				__WEBPACK_IMPORTED_MODULE_2__view__["a" /* default */].$canvas.style.cursor = 'zoom-in';
			}
		}

		return {
			cursor: cursor,
			event: {
				click: click,
				keydown : keydown,
				keyup: keyup
			}
		}
	})();

	return {
		eyedropper: eyedropper,
		hand: hand,
		zoom: zoom
	};
})();

tool.bindToolCommandSet(toolCommandSet);

/* unused harmony default export */ var _unused_webpack_default_export = (tool);

/***/ }),
/* 31 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export color */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__element__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__color_picker_color_picker_min__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__color_picker_color_picker_min___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__color_picker_color_picker_min__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__WebDesktop__ = __webpack_require__(3);




String.prototype.forEach = NodeList.prototype.forEach;

var color = (function () {
	var _foreColor = '000000',
		_backColor = 'ffffff',
		_$foreColorDisplay = Object(__WEBPACK_IMPORTED_MODULE_0__element__["a" /* $ */])('#fore-color'),
		_$backColorDisplay = Object(__WEBPACK_IMPORTED_MODULE_0__element__["a" /* $ */])('#back-color');

	var HSV2RGB = CP.HSV2RGB,
		HSV2HEX = CP.HSV2HEX,
		RGB2HSV = CP.RGB2HSV,
		RGB2HEX = CP.RGB2HEX,
		HEX2HSV = CP.HEX2HSV,
		HEX2RGB = CP.HEX2RGB;

	var colorPicker = (function () {
		var picker = new CP(Object(__WEBPACK_IMPORTED_MODULE_0__element__["a" /* $ */])('#colorPicker #picker-UI'), false),
			windowForm = __WEBPACK_IMPORTED_MODULE_2__WebDesktop__["c" /* windowUIList */].colorPicker,
			_colorType = '',
			_tempColor = '';
		
		picker.picker.classList.add('static');

		picker.setH = function (h) {
			
		}
			
		windowForm.find('.cancel').addEventListener('click', function () {
			close();
		});

		windowForm.on('close', function () {
			picker.off('change');
		});

		windowForm.find('.confirm').addEventListener('click', function () {
			if (_colorType === 'foreColor') {
				setForeColor(_tempColor);
			} else if (_colorType === 'backColor') {
				setBackColor(_tempColor);
			}
			close();
		});

		function limitRange (value, min, max) {
			if (value > max) {
				return max;
			} else if (value < min || value === NaN) {
				return min;
			} else {
				return value;
			}
		}

		windowForm.findAll('input').forEach(function ($input) {
			$input.oninput = $input.onpaste = $input.oncut = $input.onkeyup = function (event) {
				var id = $input.id.substring(6);
				if (id === "r" || id === "g" || id === 'b') {
					$input.value = limitRange($input.value, 0, 255);
				} else if (id === 'h') {
					$input.value = limitRange($input.value, 0, 360);
				} else if (id === 's' || id === 'v') {
					$input.value = limitRange($input.value, 0, 100);
				} else if (id === 'hex') {
					if ($input.value.length > 6) {
						$input.value = $input.value.substring(0, 5);
						return;
					}
					let hex = '';
					$input.value.forEach(function (char, index) {
						if (isNaN(parseInt(char))) {
							hex += limitRange(char, 'a', 'f');
						} else {
							hex += char;
						}
					});
					$input.value = hex;
					if ($input.value.length < 6) return;
				}
				_updateColor(this);
			}
		});

		function _updateData (color) {
			var rgb = HEX2RGB(color),
				hsv = HEX2HSV(color);

			windowForm.find('#color-current').style.backgroundColor = '#' + color;

			windowForm.find('#input-hex').value = color;

			windowForm.find('#input-r').value = rgb[0];
			windowForm.find('#input-g').value = rgb[1];
			windowForm.find('#input-b').value = rgb[2];

			windowForm.find('#input-h').value = hsv[0];
			windowForm.find('#input-s').value = hsv[1];
			windowForm.find('#input-v').value = hsv[2];
		}

		function _updateColor ($input) {
			var id = $input.id.substring(6);
			if (id === "r" || id === "g" || id === 'b') {
				let r = Object(__WEBPACK_IMPORTED_MODULE_0__element__["a" /* $ */])('#input-r').value,
					g = Object(__WEBPACK_IMPORTED_MODULE_0__element__["a" /* $ */])('#input-g').value,
					b = Object(__WEBPACK_IMPORTED_MODULE_0__element__["a" /* $ */])('#input-b').value;
				picker.set('rgb(' + r + ', ' + g + ', ' + b + ')');
				_updateData(RGB2HEX([r, g, b]));
			} else if (id === 'h' || id === 's' || id === 'v') {
				let h = Object(__WEBPACK_IMPORTED_MODULE_0__element__["a" /* $ */])('#input-h').value,
					s = Object(__WEBPACK_IMPORTED_MODULE_0__element__["a" /* $ */])('#input-s').value,
					v = Object(__WEBPACK_IMPORTED_MODULE_0__element__["a" /* $ */])('#input-v').value;
				picker.set('#' + HSV2HEX([h, s, v]));
				_updateData(HSV2HEX([h, s, v]));
			} else if (id === 'hex') {
				picker.set('#' + $input.value);
				_updateData($input.value);
			}
		}

		function open (colorType) {
			_colorType = colorType
			windowForm.open();

			var beforeColor = '';

			windowForm.open();

			if (colorType === 'foreColor') {
				beforeColor = _foreColor;
			} else if (colorType === 'backColor') {
				beforeColor = _backColor;
			}

			picker.set('#' + beforeColor);
			windowForm.find('#color-before').style.backgroundColor = '#' + beforeColor;
			_updateData(beforeColor);
			
			picker.enter(windowForm.find('#picker-UI'));
			picker.on('change', function (color) {
				_tempColor = color;
				_updateData(color);
			});
		}

		function close () {
			windowForm.close()
		}

		return {
			open: open,
			close: close
		};
	})();

	function getForeColor () {
		return _foreColor;
	}

	function getBackColor () {
		return _backColor;
	}
	
	function setForeColor (color) {
		_foreColor = color;
		_$foreColorDisplay.style.backgroundColor = '#' + color;
	}

	function setBackColor (color) {
		_backColor = color;
		_$backColorDisplay.style.backgroundColor = '#' + color;
	}

	function getComplementaryColor (hexColor) {
		var color = HEX2RGB(hexColor),
			complementaryColor = [];

		color.forEach(function (item, index) {
			complementaryColor[index] = 255 - item;
		});

		return RGB2HEX(complementaryColor);
	}

	function getGrayScale (hexColor) {
		var color = HEX2RGB(hexColor);
		return (color[0]*38 + color[1]*75 + color[2]*15) >> 7;
	}

	function getGrayScaleColor (grayScale) {
		return RGB2HEX([grayScale, grayScale, grayScale]);
	}

	(function init () {
		Object(__WEBPACK_IMPORTED_MODULE_0__element__["a" /* $ */])('#fore-color').addEventListener('click', function () {
			colorPicker.open('foreColor');
		});
		Object(__WEBPACK_IMPORTED_MODULE_0__element__["a" /* $ */])('#back-color').addEventListener('click', function () {
			colorPicker.open('backColor');
		});
		Object(__WEBPACK_IMPORTED_MODULE_0__element__["a" /* $ */])('#color-reset').addEventListener('click', function () {
			setForeColor('000000');
			setBackColor('ffffff');
		});
		Object(__WEBPACK_IMPORTED_MODULE_0__element__["a" /* $ */])('#color-exchange').addEventListener('click', function () {
			var temp = _foreColor;
			setForeColor(_backColor);
			setBackColor(temp);
		})
	})();

	return {
		getForeColor: getForeColor,
		getBackColor: getBackColor,
		setForeColor: setForeColor,
		setBackColor: setBackColor,
		HSV2RGB: HSV2RGB,
		HSV2HEX: HSV2HEX,
		RGB2HSV: RGB2HSV,
		RGB2HEX: RGB2HEX,
		HEX2HSV: HEX2HSV,
		HEX2RGB: HEX2RGB,
		getGrayScale: getGrayScale
	}
})();

/* harmony default export */ __webpack_exports__["a"] = (color);

/***/ }),
/* 32 */
/***/ (function(module, exports) {

/*!
 * ==========================================================
 *  COLOR PICKER PLUGIN 1.3.5
 * ==========================================================
 * Author: Taufik Nurrohman <https://github.com/tovic>
 * License: MIT
 * ----------------------------------------------------------
 */
!function(t,n,e){function r(t){return void 0!==t}function o(t){return"string"==typeof t}function i(t){return"object"==typeof t}function u(t){return Object.keys(t).length}function c(t,n,e){return n>t?n:t>e?e:t}function s(t,n){return parseInt(t,n||10)}function a(t){return Math.round(t)}function f(t){var n,e,r,o,i,u,c,s,f=+t[0],l=+t[1],h=+t[2];switch(o=Math.floor(6*f),i=6*f-o,u=h*(1-l),c=h*(1-i*l),s=h*(1-(1-i)*l),o=o||0,c=c||0,s=s||0,o%6){case 0:n=h,e=s,r=u;break;case 1:n=c,e=h,r=u;break;case 2:n=u,e=h,r=s;break;case 3:n=u,e=c,r=h;break;case 4:n=s,e=u,r=h;break;case 5:n=h,e=u,r=c}return[a(255*n),a(255*e),a(255*r)]}function l(t){return p(f(t))}function h(t){var n,e=+t[0],r=+t[1],o=+t[2],i=Math.max(e,r,o),u=Math.min(e,r,o),c=i-u,s=0===i?0:c/i,a=i/255;switch(i){case u:n=0;break;case e:n=r-o+c*(o>r?6:0),n/=6*c;break;case r:n=o-e+2*c,n/=6*c;break;case o:n=e-r+4*c,n/=6*c}return[n,s,a]}function p(t){var n=+t[2]|+t[1]<<8|+t[0]<<16;return n="000000"+n.toString(16),n.slice(-6)}function v(t){return h(d(t))}function d(t){return 3===t.length&&(t=t.replace(/./g,"$&$&")),[s(t[0]+t[1],16),s(t[2]+t[3],16),s(t[4]+t[5],16)]}function g(t){return[+t[0]/360,+t[1]/100,+t[2]/100]}function y(t){return[a(360*+t[0]),a(100*+t[1]),a(100*+t[2])]}function x(t){return[+t[0]/255,+t[1]/255,+t[2]/255]}function m(t){if(i(t))return t;var n=/\s*rgb\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)\s*$/i.exec(t),e=/\s*hsv\s*\(\s*(\d+)\s*,\s*(\d+)%\s*,\s*(\d+)%\s*\)\s*$/i.exec(t),r="#"===t[0]&&t.match(/^#([\da-f]{3}|[\da-f]{6})$/i);return r?v(t.slice(1)):e?g([+e[1],+e[2],+e[3]]):n?h([+n[1],+n[2],+n[3]]):[0,1,1]}var b="__instance__",H="firstChild",k="scrollLeft",w="scrollTop",E="offsetLeft",X="offsetTop",S=setTimeout;!function(t){t.version="1.3.5",t[b]={},t.each=function(n,e){return S(function(){var e,r=t[b];for(e in r)n(r[e],e,r)},0===e?0:e||1),t},t.parse=m,t._HSV2RGB=f,t._HSV2HEX=l,t._RGB2HSV=h,t._HEX2HSV=v,t._HEX2RGB=function(t){return x(d(t))},t.HSV2RGB=function(t){return f(g(t))},t.HSV2HEX=function(t){return l(g(t))},t.RGB2HSV=function(t){return y(h(t))},t.RGB2HEX=p,t.HEX2HSV=function(t){return y(v(t))},t.HEX2RGB=d}(t[e]=function(s,a){function h(t,n,e){t=t.split(/\s+/);for(var r=0,o=t.length;o>r;++r)n.addEventListener(t[r],e,!1)}function p(t,n,e){t=t.split(/\s+/);for(var r=0,o=t.length;o>r;++r)n.removeEventListener(t[r],e)}function v(t,n){var e=n.touches?n.touches[0].pageX:n.pageX,r=n.touches?n.touches[0].pageY:n.pageY,o=d(t);return{x:e-o.l,y:r-o.t}}function d(n){if(n===t)var e=t.pageXOffset||T[k],r=t.pageYOffset||T[w];else for(var e=n[E],r=n[X];n=n.offsetParent;)e+=n[E],r+=n[X];return{l:e,t:r}}function g(t,n){for(;(t=t.parentElement)&&t!==n;);return t}function y(t){t&&t.preventDefault()}function x(n){return n===t?{w:t.innerWidth,h:t.innerHeight}:{w:n.offsetWidth,h:n.offsetHeight}}function m(t){return Y||(r(t)?t:!1)}function _(t){Y=t}function V(t,n,e){return r(t)?r(n)?(r(N[t])||(N[t]={}),r(e)||(e=u(N[t])),N[t][e]=n,j):N[t]:N}function B(t,n){return r(t)?r(n)?(delete N[t][n],j):(N[t]={},j):(N={},j)}function G(t,n,e){if(!r(N[t]))return j;if(r(e))r(N[t][e])&&N[t][e].apply(j,n);else for(var o in N[t])N[t][o].apply(j,n);return j}function R(t,n){t&&"h"!==t||G("change:h",n),t&&"sv"!==t||G("change:sv",n),G("change",n)}function M(){return W.parentNode}function L(e,r){function o(t){var n=t.target,e=n===s||g(n,s)===s;e?L():j.exit(),G(e?"enter":"exit",[j])}function i(t){var n=(f(F),f([F[0],1,1]));K.style.backgroundColor="rgb("+n.join(",")+")",_(F),y(t)}function u(t){var n=c(v(J,t).y,0,S);F[0]=(S-n)/S,Q.style.top=n-T/2+"px",i(t)}function d(t){var n=v(K,t),e=c(n.x,0,V),r=c(n.y,0,B);F[1]=1-(V-e)/V,F[2]=(B-r)/B,U.style.right=V-e-O/2+"px",U.style.top=r-Y/2+"px",i(t)}function b(t){nn&&(u(t),sn=l(F),Z||(G("drag:h",[sn,j]),G("drag",[sn,j]),R("h",[sn,j]))),en&&(d(t),sn=l(F),tn||(G("drag:sv",[sn,j]),G("drag",[sn,j]),R("sv",[sn,j]))),Z=0,tn=0}function H(t){var n=t.target,e=nn?"h":"sv",r=[l(F),j],o=n===s||g(n,s)===s,i=n===W||g(n,W)===W;o||i?i&&(G("stop:"+e,r),G("stop",r),R(e,r)):M()&&a!==!1&&(j.exit(),G("exit",[j]),R(0,r)),nn=0,en=0}function k(t){Z=1,nn=1,b(t),y(t),G("start:h",[sn,j]),G("start",[sn,j]),R("h",[sn,j])}function w(t){tn=1,en=1,b(t),y(t),G("start:sv",[sn,j]),G("start",[sn,j]),R("sv",[sn,j])}e||((r||C).appendChild(W),j.visible=!0),un=x(W).w,cn=x(W).h;var E=x(K),X=x(U),S=x(J).h,V=E.w,B=E.h,T=x(Q).h,O=X.w,Y=X.h;e?(W.style.left=W.style.top="-9999px",a!==!1&&h(a,s,o),j.create=function(){return L(1),G("create",[j]),j},j.destroy=function(){return a!==!1&&p(a,s,o),j.exit(),_(!1),G("destroy",[j]),j}):$(),I=function(){F=m(F),i(),Q.style.top=S-T/2-S*+F[0]+"px",U.style.right=V-O/2-V*+F[1]+"px",U.style.top=B-Y/2-B*+F[2]+"px"},j.exit=function(){return M()&&(M().removeChild(W),j.visible=!1),p(P,J,k),p(P,K,w),p(z,n,b),p(A,n,H),p(D,t,$),j},I(),e||(h(P,J,k),h(P,K,w),h(z,n,b),h(A,n,H),h(D,t,$))}function $(){return j.fit()}var C=n.body,T=n.documentElement,j=this,O=t[e],Y=!1,N={},W=n.createElement("div"),P="touchstart mousedown",z="touchmove mousemove",A="touchend mouseup",D="orientationchange resize";if(!(j instanceof O))return new O(s,a);O[b][s.id||s.name||u(O[b])]=j,r(a)||(a=P),_(O.parse(s.getAttribute("data-color")||s.value||[0,1,1])),W.className="color-picker",W.innerHTML='<div class="color-picker-control"><span class="color-picker-h"><i></i></span><span class="color-picker-sv"><i></i></span></div>';var I,q=W[H].children,F=m([0,1,1]),J=q[0],K=q[1],Q=J[H],U=K[H],Z=0,tn=0,nn=0,en=0,rn=0,on=0,un=0,cn=0,sn=l(F);return L(1),S(function(){var t=[l(F),j];G("create",t),R(0,t)},0),j.fit=function(n){var e=x(t),o=x(T),u=o.h>e.h,c=d(t),a=(d(T),u?o.w:e.w+c.l),f=u?e.h+c.t:Math.max(o.h,e.h),l=d(s);return rn=l.l,on=l.t+x(s).h,i(n)?(r(n[0])&&(rn=n[0]),r(n[1])&&(on=n[1])):(rn+un>a&&(rn=a-un),on+cn>f&&(on=f-cn)),W.style.left=rn+"px",W.style.top=on+"px",G("fit",[j]),j},j.set=function(t){return r(t)?(o(t)&&(t=O.parse(t)),_(t),I(),j):m()},j.get=function(t){return m(t)},j.target=s,j.picker=W,j.visible=!1,j.on=V,j.off=B,j.trigger=G,j.hooks=N,j.enter=function(t){return L(0,t)},j})}(window,document,"CP");

/***/ }),
/* 33 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__element__ = __webpack_require__(0);


/**
* 快捷键对象，负责管理快捷键
*/
var hotkey = (function () {
   var _registeredHotkeys = [];

   function addHotkeyHint (key, targetId) {
       var $target = Object(__WEBPACK_IMPORTED_MODULE_0__element__["a" /* $ */])('#' + targetId);
       if (targetId.match(/menu-/) || Object(__WEBPACK_IMPORTED_MODULE_0__element__["a" /* $ */])('.menu #' + targetId)) {
           //给菜单项添加快捷键提示
           let $hotkeyHint = document.createElement('span');
           $hotkeyHint.className = 'hotkey-hint';
           $hotkeyHint.innerText = key.replace(/(^[a-z]|\b[a-z])/g, (match) => {return match.toUpperCase();});
           $target.appendChild($hotkeyHint);
           $target.addClass('hasHotkey');
       } else {
           //给按钮添加快捷键提示
           $target.title += '(' + key + ')';
       }
   }

   function registerHotkey (key, targetId) {
       var testingKey = new RegExp(/^((Ctrl|ctrl|Alt|alt|Shift|shift)\+)*[A-Za-z0-9]$/),
           $target = Object(__WEBPACK_IMPORTED_MODULE_0__element__["a" /* $ */])('#' + targetId),
           stateKeys = key.match(/(Ctrl|ctrl|Alt|alt|Shift|shift)/),
           mainKey = key.substring(key.length - 1);
   
       //如果此键已被注册过/格式不正确/指向得目标不存在，结束并返回false
       if (_registeredHotkeys.includes(key) || !testingKey.test(key) || !$target) {
           return false;
       }
   
       document.addEventListener('keypress', function (event) {
           var isStateKeysDown = true;
           stateKeys && stateKeys.forEach(function (stateKey) {
               isStateKeysDown = isStateKeysDown && event[stateKey.toLowerCase() + 'Key'];
           })
           if (isStateKeysDown && (event.key.toUpperCase() === mainKey.toUpperCase())) {
               event.preventDefault();
               $target.click();
               return false;
           }
       }, false);

       addHotkeyHint(key, targetId);
       _registeredHotkeys.push(key);
   }
   
   function loadKeymap (keymap) {
       keymap && Object.keys(keymap).forEach(function (part) {
           part && Object.keys(keymap[part]).forEach(function (command) {
               registerHotkey(keymap[part][command], part + '-' + command);
           })
       })
   }
   
   // function loadKeymapJSON (filePath) {
   // 	var xhr = new XMLHttpRequest();
   // 	xhr.onreadystatechange = function () {
   // 		if (xhr.readyState === 4) {
   // 			if ((xhr.status >= 200 && xhr.status < 300) || xhr.status === 304) {
   // 				alert(xhr.responseText);
   // 			} else {
   // 				console.log('request keymap.json failed, status: ' + xhr.status);
   // 			}
   // 		}
   // 	}
   // 	xhr.open('data', filePath, true);
   // 	xhr.send(null);
   // }

   return {
       registerHotkey: registerHotkey,
       loadKeymap: loadKeymap,
       addHotkeyHint: addHotkeyHint
   }
})();

/* harmony default export */ __webpack_exports__["a"] = (hotkey);

/***/ })
/******/ ]);
//# sourceMappingURL=app.js.map
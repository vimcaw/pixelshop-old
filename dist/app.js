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
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
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
			// item.addClass('hide');
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
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__element__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__layer__ = __webpack_require__(14);



Element.prototype.bindWhellOver = function (callback) {
	let isOnOver = false;
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
};

function DesignBoard (src, fileName) {
	let image = new Image();
	let $titleBar = document.createElement('div');
	let $title = document.createElement('span');
	let $close = document.createElement('span');
	let $board = document.createElement('div');

	let initFillRate = 0.8;

	this.$li = document.createElement('li');
	this.$canvases = document.createElement('div');
	this.fileName = fileName ? fileName : _getUrlFileName(src);
	this.src = src;
	this.scaling = 1;

	$title.innerText = adjustFileNameLength(this.fileName, 10);
	$title.addClass('title');

	$close.className = 'fa fa-times close';

	$titleBar.appendChild($title);
	$titleBar.appendChild($close);
	$titleBar.addClass('title-bar');

    this.$canvases.addClass('canvases');

	$board.appendChild(this.$canvases);
	$board.addClass('board');

	this.$li.appendChild($titleBar);
	this.$li.appendChild($board);
	Object(__WEBPACK_IMPORTED_MODULE_0__element__["a" /* $ */])('#design-boards ul').appendChild(this.$li);

	image.src = src;
	let _this = this;
	image.onload = function () {
	    localStorage.setItem(this.fileName, src);
        _this.createLayer(image);
		Object(__WEBPACK_IMPORTED_MODULE_0__element__["a" /* $ */])('.canvas-size').innerText = image.width + '×' + image.height;
		_adjustImage();
		setCenter();
		window.addEventListener('resize', function () {
			_this.setCenter();
		});
		Object(__WEBPACK_IMPORTED_MODULE_0__element__["a" /* $ */])('#menu-save').enable();
		Object(__WEBPACK_IMPORTED_MODULE_0__element__["a" /* $ */])('#menu-saveAs').enable();
		_this.$canvases.onmousemove = function (event) {
			let x = event.clientX - this.getViewOffsetLeft() + $board.scrollLeft,
				y = event.clientY - this.getViewOffsetTop() + $board.scrollTop;
			Object(__WEBPACK_IMPORTED_MODULE_0__element__["a" /* $ */])('#pos-x').innerText = Math.round(x / _this.scaling);
			Object(__WEBPACK_IMPORTED_MODULE_0__element__["a" /* $ */])('#pos-y').innerText = Math.round(y / _this.scaling);
		};
		_this.$li.addEventListener('click', function () {
            designBoardDirector.switchTo(_this);
        }, false);
		$close.addEventListener('click', function (event) {
            _this.close();
            event.stopPropagation();
        }, false);
	};

    image.addEventListener('error', function () {
        alert("Loading image failed, please try again, or try other ways.");
    }, false);

    /**
     * 从网址中获取文件名
     *
     * @param {string} url 网址
     * @returns 文件名
     */
    function _getUrlFileName(url) {
        let slashIndex = url.lastIndexOf('/');
        return url.substring(slashIndex + 1);
    }

    function adjustFileNameLength (fileName, maxLength) {
        let pointIndex = fileName.lastIndexOf('.');
        let name = fileName.substring(0, pointIndex);
        let nameEx = fileName.substring(pointIndex + 1);
        if (name.length > maxLength) {
            name = name.substr(0, maxLength) + '... ';
        }
        if (nameEx.length > 4) {
            nameEx = nameEx.substr(0, 4);
        }
        return name + '.' + nameEx;
    }

    function _adjustImage () {
        let width = _this.$canvases.offsetWidth,
            height = _this.$canvases.offsetHeight,
            maxWidth = $board.offsetWidth * initFillRate,
            maxHeight = $board.offsetHeight * initFillRate,
            sizeRate = width / height,
            maxSizeRate = maxWidth / maxHeight;

        if (width > maxWidth && height > maxHeight) {
            //如果宽高都超过限制，取宽高中最大值，按比例缩放至符合要求的最大尺寸
            if (sizeRate >= maxSizeRate) {
                _this.scaling = maxWidth / width;
            } else {
                _this.scaling = maxHeight / height;
            }
        } else if (width > maxWidth) {
            _this.scaling = maxWidth / width;
        } else if (height > maxHeight) {
            _this.scaling = maxHeight / height;
        }
        _this.scale(_this.scaling);
    }

    function setCenter () {
        let left = ($board.clientWidth - _this.$canvases.clientWidth * _this.scaling) / 2;
        let top = ($board.clientHeight - _this.$canvases.clientHeight * _this.scaling) / 2;
        if (left < 0) {
            left = 0;
        }
        if (top < 0) {
            top = 0;
        }
        _this.$canvases.style.marginLeft = left + 'px';
        _this.$canvases.style.marginTop = top + 'px';
    }

    $board.bindWhellOver(function (event) {
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
            let x = event.clientX - _this.$canvases.getViewOffsetLeft(),
                y = event.clientY - _this.$canvases.getViewOffsetTop();
            if (event.deltaY > 0) {
                _this.scalingUp(-0.2, x, y);
            } else {
                _this.scalingUp(0.2, x, y);
            }
            return false;
        }
    });
}

DesignBoard.prototype = {
	constructor: DesignBoard,
    layers: [],
    $scale: Object(__WEBPACK_IMPORTED_MODULE_0__element__["a" /* $ */])('.canvas-scale'),
	close: function () {
		this.$li.parentElement.removeChild(this.$li);
		designBoardDirector.remove(this);
	},
	scale: function (scaling) {
	    this.scaling = scaling;
		this.$canvases.style.transform = 'scale(' + scaling + ')';
		this.$scale.innerText = ((scaling * 100).toFixed(2)) + '%';
	},
    scalingUp: function (increment, centerX, centerY) {
        if (increment && typeof increment === 'number') {
            let oldscaling = this.scaling;
            this.scaling += increment;
            this.scale(this.scaling);
            // if (x && y) {
            //     $view.scrollLeft = scaling * ($view.scrollLeft + centerX) / oldscaling - centerX;
            //     $view.scrollTop = scaling * ($view.scrollTop + centerY) / oldscaling - centerY;
            // }
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
    },
    createLayer: function (image) {
        this.layers.push(new __WEBPACK_IMPORTED_MODULE_1__layer__["a" /* default */](this.$canvases, image));
    },
    save: function () {
        // .$canvas.toDataURL('image/' + format[imageFormat]);
    }
};

let designBoardDirector = (function () {
    let _designBoards = [];
    let current = null;

    function create (src, fileName) {
        let designBoard,
            isOpened = false;
        _designBoards.forEach(function (designBoard) {
            if (designBoard.src === src) {
                alert('This file has been opened!');
                isOpened = true;
            }
        });
        if (isOpened) {
            return false;
        }
        designBoard = new DesignBoard(src, fileName);
        _designBoards.push(designBoard);
        switchTo(designBoard);
    }
    function switchTo(designBoard) {
        if (current) {
            current.$li.removeClass('active');
        }
        current = designBoard;
        designBoard.$li.addClass('active');
    }

    function remove(designBoard) {
        let index =_designBoards.indexOf(designBoard);
        _designBoards.splice(index, 1);
        current = null;
        if (_designBoards[index]) {
            switchTo(_designBoards[index]);
        } else if (_designBoards[index - 1]) {
            switchTo(_designBoards[index - 1]);
        } else {
            return false;
        }
    }

    return {
        current: current,
        create: create,
        switchTo: switchTo,
        remove: remove
    };
})();

/* harmony default export */ __webpack_exports__["a"] = (designBoardDirector);

/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__style_css__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__style_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__style_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__windowsUI_css__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__windowsUI_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__windowsUI_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__iconfont_iconfont_css__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__iconfont_iconfont_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__iconfont_iconfont_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__font_awesome_4_7_0_css_font_awesome_min_css__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__font_awesome_4_7_0_css_font_awesome_min_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__font_awesome_4_7_0_css_font_awesome_min_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__color_picker_color_picker_min_css__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__color_picker_color_picker_min_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4__color_picker_color_picker_min_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__element__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__start__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__common__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__common___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7__common__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__tool__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__WebDesktop__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__hotkey__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__designBoard__ = __webpack_require__(2);
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
			var windowError = __WEBPACK_IMPORTED_MODULE_9__WebDesktop__["c" /* windowUIList */].canNotReadLocalFile;
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
					__WEBPACK_IMPORTED_MODULE_11__designBoard__["a" /* default */].create(this.result, file.name);
				}
			}
		};
	},
	openFromUrl: function () {
		var windowForm = __WEBPACK_IMPORTED_MODULE_9__WebDesktop__["c" /* windowUIList */].openWebPicture;
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
            __WEBPACK_IMPORTED_MODULE_11__designBoard__["a" /* default */].create(windowForm.find('input').value);
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
		imageName = view.fileName;
		var result = view.fileName.match(/\..+/g);
		imageFormat = result && result[result.length - 1].substring(1);
		downloader.download = imageName;

		downloader.href = __WEBPACK_IMPORTED_MODULE_11__designBoard__["a" /* default */].current.$canvas.toDataURL('image/' + format[imageFormat]);
		document.body.appendChild(downloader);
		downloader.click();
	},
	about: function () {
		__WEBPACK_IMPORTED_MODULE_9__WebDesktop__["c" /* windowUIList */].about.open();
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
		var id = Object(__WEBPACK_IMPORTED_MODULE_9__WebDesktop__["b" /* getIdSuffix */])(item.id);
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

Object(__WEBPACK_IMPORTED_MODULE_9__WebDesktop__["a" /* bindMenuClick */])(Object(__WEBPACK_IMPORTED_MODULE_5__element__["a" /* $ */])('.menu'), commandSet);
bindWindowControlClick(Object(__WEBPACK_IMPORTED_MODULE_5__element__["a" /* $ */])('.window-control'), windowCommand);
window.oncontextmenu = function () {
	return false;
};

__WEBPACK_IMPORTED_MODULE_10__hotkey__["a" /* default */].loadKeymap(defaultKeymap);

/***/ }),
/* 4 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 5 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 6 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 7 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 8 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__element__ = __webpack_require__(0);


Object(__WEBPACK_IMPORTED_MODULE_0__element__["a" /* $ */])('#welcome-openFromLocal').addEventListener('click', function () {
    Object(__WEBPACK_IMPORTED_MODULE_0__element__["a" /* $ */])('#menu-openFromLocal').click();
    Object(__WEBPACK_IMPORTED_MODULE_0__element__["a" /* $ */])('#welcome').addClass('hide');
});

Object(__WEBPACK_IMPORTED_MODULE_0__element__["a" /* $ */])('#welcome-openFromUrl').addEventListener('click', function () {
    Object(__WEBPACK_IMPORTED_MODULE_0__element__["a" /* $ */])('#menu-openFromUrl').click();
    Object(__WEBPACK_IMPORTED_MODULE_0__element__["a" /* $ */])('#welcome').addClass('hide');
});

function createRecentFile(src, fileName, date) {
    let $li = document.createElement('li'),
        $div = document.createElement('div'),
        $img = document.createElement('img'),
        $fileName = document.createElement('p'),
        $date = document.createElement('p');
    $img.src = src;
    $div.className = 'info';
    $fileName.innerText = fileName;
    $fileName.className = 'file-name';
    $date.innerText = date;
    $date.className = 'date';
    $div.appendChild($fileName);
    $div.appendChild($date);
    $li.appendChild($img);
    $li.appendChild($div);
    Object(__WEBPACK_IMPORTED_MODULE_0__element__["a" /* $ */])('.recent-file ul').appendChild($li);
}


/***/ }),
/* 10 */
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
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__element__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__color__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__designBoard__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__WebDesktop__ = __webpack_require__(1);





let option = (function () {
	let $option = Object(__WEBPACK_IMPORTED_MODULE_0__element__["a" /* $ */])('.option'),
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

let tool = (function () {
	let currentTool = 'move',
		toolCommandSet = null,
		isEnable = true;

	function _forEachEvents (isAdd) {
		// if (toolCommandSet && toolCommandSet[currentTool]) {
		// 	let commands = toolCommandSet[currentTool],
		// 		keys = Object.keys(commands.event),
		// 		handle;
		//
		// 	designBoardDirector.current.$canvases.style.cursor = commands.cursor ? commands.cursor : 'default';
        //
		// 	handle = isAdd ? 'addEventListener' : 'removeEventListener';
        //
		// 	keys.forEach(function (item) {
		// 		if (item === 'keydown' || item === 'keyup') {
		// 			window[handle](item, commands.event[item]);
		// 		} else {
		// 			designBoardDirector.current.$canvas[handle](item, commands.event[item]);
		// 		}
		// 	});
		// } else {
         //    designBoardDirector.current.$canvases.style.cursor = 'default';
		// }
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
            };
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

let toolCommandSet = (function () {
	let blush = {
		event: {
			keydown: function () {
				
			}
		}
	}
	let eyedropper = {
		cursor: 'none',
		event: {
			click: function (event) {
				let x = Object(__WEBPACK_IMPORTED_MODULE_0__element__["a" /* $ */])('#pos-x').innerText,
					y = Object(__WEBPACK_IMPORTED_MODULE_0__element__["a" /* $ */])('#pos-y').innerText,
					imageData = __WEBPACK_IMPORTED_MODULE_2__designBoard__["a" /* default */].current.context.getImageData(x, y, 1, 1);

				__WEBPACK_IMPORTED_MODULE_1__color__["a" /* default */].setForeColor(__WEBPACK_IMPORTED_MODULE_1__color__["a" /* default */].RGB2HEX(imageData.data));
			}
		}
		
	};

	let hand = (function () {
		let _isKeyDown = false;

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

	let zoom = (function () {
		let _isZoomIn = true,
			_scaleRate = 0.2,
			cursor = 'zoom-in';
		function click (event) {
			let rate = _isZoomIn ? _scaleRate : (-1 * _scaleRate);
			__WEBPACK_IMPORTED_MODULE_2__designBoard__["a" /* default */].current.scale(rate, event.clientX, event.clientY);
		}
		function keydown (event) {
			if (event.altKey) {
				_isZoomIn = false;
				__WEBPACK_IMPORTED_MODULE_2__designBoard__["a" /* default */].current.$canvas.style.cursor = 'zoom-out';
			}
			event.preventDefault();
		}
		function keyup () {
			if (!_isZoomIn) {
				_isZoomIn = true;
				__WEBPACK_IMPORTED_MODULE_2__designBoard__["a" /* default */].current.$canvas.style.cursor = 'zoom-in';
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
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export color */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__element__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__color_picker_color_picker_min__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__color_picker_color_picker_min___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__color_picker_color_picker_min__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__WebDesktop__ = __webpack_require__(1);




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

			_tempColor = color;
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
			windowForm.close();
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
/* 13 */
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
/* 14 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = Layer;
function Layer($container, image) {
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

/***/ }),
/* 15 */
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
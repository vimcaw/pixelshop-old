/**
 * Created by neoherus on 2017/5/27.
 */

/**
 * query选择器
 * @param selector {String} 选择器
 * @returns {*} {Node/NodeList} 若为id选择器，返回单个元素，否则返回NodeList
 */
var $ = function (selector) {
	if (selector.charAt(0) === '#') {
		return document.querySelector(selector);
	} else {
		return document.querySelectorAll(selector);
	}
};

/**
 * 遍历数组或类数组并对每项进行操作
 * @param array {Array/likeArray} 要遍历的数组
 * @param callback {Function} 对每项进行处理的函数
 */
var foreach = function (array, callback) {
	for (var i = 0,item; item = array[i++];) {
		callback(item);
	}
};

function limitImageSize($img, maxWidth, maxHeight) {
	if ($img.width > maxWidth && $img.height > maxHeight) {
		var rate = $img.width / $img.height;
		var max = Math.max($img.width, $img.height);
		if (max == $img.width) {
			$img.width = maxWidth;
			$img.height = maxWidth / rate;
		} else {
			$img.height = maxHeight;
			$img.width = maxHeight * rate;
		}
	} else if ($img.width > maxWidth) {
		$img.width = maxWidth;
	} else if ($img.height > maxHeight) {
		$img.height = maxHeight;
	}
}

function playAnimation($element, classBefore, classAfter) {
	$element.className = classBefore;
	window.requestAnimationFrame(function(time) {
		window.requestAnimationFrame(function(time) {
			$element.className = classAfter;
		});
	});
}

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

var WindowUI = function ($windowUI) {
	this.$this = $windowUI;
	this.$titleBar = null;
	this.title = this.$this.id;
	this.$elements = null;
	
	var _this = this;
	(function init() {
		_this.$titleBar = document.createElement('div');
		_this.$title = document.createElement('p');
		var $close = document.createElement('div');
		_this.$titleBar.className = 'title-bar';
		_this.$title.innerText = _this.title;
		$close.className = 'close';
		$close.onclick = function () {
			_this.close();
		}
		
		_this.$titleBar.appendChild(_this.$title);
		_this.$titleBar.appendChild($close);
		_this.$this.insertBefore(_this.$titleBar, _this.$this.firstChild);
		_this.$elements = _this.$this.children;
		setDragMoving(_this.$titleBar, _this.$this);
	})();
};

WindowUI.prototype = {
	constructor: WindowUI,
	$block: (function () {
		var $block = document.createElement('div');
		$block.className = 'block-all';
		$block.style.height = window.innerHeight + 'px';
		$block.style.display = 'none';
		document.body.appendChild($block);
		return $block;
	})(),
	open: function () {
		this.$this.style.display = 'block';
		this.$block.style.display = 'block';
		var _this = this;
		this.$block.onclick = function () {
			_this.twinkle();
		};
		this.setCenter();
		var _this = this;
		window.addEventListener('resize', function () {
			_this.setCenter();
		});
	},
	close: function () {
		this.$this.style.display = 'none';
		this.$block.style.display = 'none';
		//修复类名，防止下次窗口刚出现就闪烁
		this.$this.className = 'windowUI';
		this.$titleBar.className = 'title-bar';
	},
	find: function (selector) {
		return this.$this.querySelector(selector);
	},
	setCenter: function () {
		var left = (window.innerWidth - this.$this.offsetWidth) / 2;
		var top = (window.innerHeight - this.$this.offsetHeight) / 2;
		this.$this.style.left = left + 'px';
		this.$this.style.top = top + 'px';
	},
	twinkle: function () {
		playAnimation(this.$this, 'windowUI', 'windowUI twinkle-border');
		playAnimation(this.$titleBar, 'title-bar', 'title-bar twinkle-title');
	}
};

var windowRegister = function () {
	var windowUIList = {};
	var $windowsUIs = $('.windowUI');
	foreach($windowsUIs, function (item) {
		windowUIList[item.id] = new WindowUI(item);
	});
	return windowUIList;
};

var command = {
	openFromLocal: function () {
		var inpFile = document.createElement('input');
		inpFile.type = 'file';
		inpFile.className = 'hide';
		document.body.appendChild(inpFile);
		inpFile.click();
		inpFile.onchange = function () {
			if (this.value) {
				canvas.load(this.value);
			}
		};
	},
	openFromUrl: function () {
		var windowForm = windowUIList.openWebPicture;
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
			canvas.load(windowForm.find('input').value);
			windowForm.close();
		}
	},
	save: function () {
	
	},
	about: function () {
		windowUIList.about.open();
	}
};

/**
 * 窗口操作指令集
 * @type {{full-screen: windowCommand.full-screen}}
 */
var windowCommand = {
	'full-screen': function () {
		fullScreen.launchFullscreen(document.documentElement);
	}
}

/**
 * 给某个元素绑定指令（点击触发指令）
 * @param $element {Element} 要绑定的元素
 * @param command {Object} 要绑定的指令集
 * @param clickCallback {Function} 点击时触发的回调函数（可选）
 */
var bindCommand = function ($element, command, clickCallback) {
	var id = $element.id;
	if (id && command[id]) {
		$element.onclick = function () {
			if (clickCallback) clickCallback($element);
			command[id]();
		};
	} else {
		$element.onclick = function () {
			if (clickCallback) clickCallback($element);
			alert('undefined Task');
		}
	}
};

/**
 * 给菜单绑定指令
 * @param $menuUl {HTMLUListElement} 要绑定的菜单列表
 * @param command {Object} 要绑定的指令集
 */
var bindMenuClick = function ($menuUl, command) {
	var foreachMenu = function ($ul, callback) {
		var $uls = $ul.children;
		foreach($uls, function (item) {
			if (item.children.length === 0) {
				callback(item);
			} else {
				foreachMenu(item.querySelector('ul'), callback);
			}
		});
	};
	foreachMenu($menuUl, function (item) {
		bindCommand(item, command, function ($element) {
			$element.blur();
		});
	});
};

/**
 * 给窗口操作按钮添加指令
 * @param $windowControlUl {HTMLUListElement} 要绑定的按钮列表
 * @param command {Object} 要添加的指令集
 */
var bindWindowControlClick = function ($windowControlUl, command) {
	var $uls = $windowControlUl.children;
	foreach($uls, function (item) {
		bindCommand(item, command);
	});
};

var canvas = (function () {
	var $canvas = $('canvas')[0];
	var context = $canvas.getContext('2d');
	return {
		load: function (src) {
			var image = new Image();
			image.src = src;
			var _this = this;
			image.onload = function () {
				limitImageSize(image, 500, 300);
				$canvas.width = image.width;
				$canvas.height = image.height;
				context.drawImage(image, 0, 0);
				_this.setCenter();
				window.addEventListener('resize', function () {
					_this.setCenter();
				});
			};
		},
		setCenter: function () {
			var left = ($('.canvas')[0].offsetWidth - $canvas.width) / 2;
			var top = ($('.canvas')[0].offsetHeight - $canvas.height) / 2;
			$canvas.style.left = left + 'px';
			$canvas.style.top = top + 'px';
		}
	};
})();

var windowUIList = windowRegister();

(function init() {
	document.body.style.height = window.innerHeight + 'px';
	window.addEventListener('resize', function () {
		document.body.style.height = window.innerHeight + 'px';
	});
	bindMenuClick($('.menu')[0], command);
	bindWindowControlClick($('.window-control')[0], windowCommand);
})();
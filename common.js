/**
 * Created by 10399 on 2017/5/29.
 */

/**
 * query选择器
 * @param selector {String} 选择器
 * @returns {*} {Node/NodeList} 若为id选择器，返回单个元素，否则返回NodeList
 */
var $ = function (selector) {
	return document.querySelector(selector);
};

function $$ (selector) {
	return document.querySelectorAll(selector);
}

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

/**
 * 让某个元素播放一次动画（通过切换类名实现），可多次触发
 * @param $element {Element} 要播放动画的元素
 * @param classBefore {String} 播放之前，没有animation属性的class
 * @param classAfter {String} 带有animation属性的class
 */
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

function bindWhellOver($element, callback) {
	var isOnOver = false;
	$element.onmouseover = function () {
		isOnOver = true;
	};
	$element.onmouseout = function () {
		isOnOver = false;
	};
	window.onwheel = function (event) {
		if (isOnOver && callback) {
			return callback.call($element, event);
		}
	};
}

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
	foreach($radios, function (item) {
		item.addEventListener('change', function () {
			if (this.checked) {
				return callback.call(this, arguments);
			}
		});
	});
}

/**
 * 从网址中获取文件名
 * @param url {String} 网址
 * @returns {string} 文件名
 */
function getUrlFileName(url) {
	var slashIndex = url.lastIndexOf('/');
	return url.substring(slashIndex + 1);
}

/**
 * 获取网页元素的相对位置（该元素左上角相对于浏览器窗口左上角的坐标）
 * @param element 要获取位置的元素
 * @returns {number} 网页元素相对浏览器左部的距离
 */
function getElementViewLeft (element) {
	var actualLeft = element.offsetLeft;
	var current = element.offsetParent;
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
}

/**
 * 获取网页元素的相对位置（该元素左上角相对于浏览器窗口左上角的坐标）
 * @param element 要获取位置的元素
 * @returns {number} 网页元素相对浏览器顶部的距离
 */
function getElementViewTop (element) {
	var actualTop = element.offsetTop;
	var current = element.offsetParent;
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
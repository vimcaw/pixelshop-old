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
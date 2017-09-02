import {$, $$} from './element';

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
	var $view = $('.view'),
		$canvas = $('.view canvas'),
		context = $canvas.getContext('2d'),
		$title = $('.title'),
		$size = $('.canvas-size'),
		$scale = $('.canvas-scale'),
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
			$('#menu-save').enable();
			$('#menu-saveAs').enable();
			$canvas.onmousemove = function (event) {
				var x = event.clientX - this.getViewOffsetLeft() + $view.scrollLeft,
					y = event.clientY - this.getViewOffsetTop() + $view.scrollTop;
				$('#pos-x').innerText = Math.round(x / scaleRate);
				$('#pos-y').innerText = Math.round(y / scaleRate);
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

export default view;
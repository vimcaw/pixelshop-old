/**
 * Created by vimcaw on 2017/5/27.
 */

Element.prototype.disabled = function () {
	this.addClass('disabled');
}

Element.prototype.enable = function () {
	this.removeClass('disabled');
}

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
			var windowError = windowUIList.canNotReadLocalFile;
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
					drawing.load(this.result, file.name);
				}
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
			drawing.load(windowForm.find('input').value);
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
		imageName = drawing.fileName;
		var result = drawing.fileName.match(/\..+/g);
		imageFormat = result && result[result.length - 1].substring(1);
		downloader.download = imageName;

		downloader.href = drawing.$canvas.toDataURL('image/' + format[imageFormat]);
		document.body.appendChild(downloader);
		downloader.click();
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
	foreach($uls, function (item) {
		var id = getIdSuffix(item.id);
		if (id && commandSet[id]) {
			item.onclick = function () {
				commandSet[id]();
			}
		}
		
	});
};

var drawing = (function () {
	var $drawing = $('.drawing')[0],
		$canvas = $('.drawing canvas')[0],
		context = $canvas.getContext('2d'),
		$title = $('.drawing-title')[0],
		$size = $('.canvas-size')[0],
		$scale = $('.canvas-scale')[0],
		fileName = '';
	
	var scaleRate = 1;
	
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
				$drawing.scrollLeft = scaleRate * ($drawing.scrollLeft + x) / oldScaleRate - x;
				$drawing.scrollTop = scaleRate * ($drawing.scrollTop + y) / oldScaleRate - y;
			}
		}
	}
	
	function setCenter () {
		var left = ($drawing.offsetWidth - $canvas.width) / 2;
		var top = ($drawing.offsetHeight - $canvas.height) / 2;
		if (left < 0) {
			left = 0;
		}
		if (top < 0) {
			top = 0;
		}
		$canvas.style.marginLeft = left + 'px';
		$canvas.style.marginTop = top + 'px';
	}
	
	bindWhellOver($drawing, function (event) {
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
			var x = event.clientX - getElementViewLeft($canvas),
				y = event.clientY = getElementViewTop($canvas);
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
		drawing.fileName = fileName ? fileName : getUrlFileName(src);
		$title.innerText = drawing.fileName;
		
		var _this = this;
		image.onload = function () {
			$canvas.width = image.width;
			$canvas.height = image.height;
			$size.innerText = image.width + '×' + image.height;
			$scale.innerText = '100%';
				var size = getlimitSize(image, 800, 500);
			scaleRate = size.width / $canvas.width;
			context.drawImage(image, 0, 0);
			
			_this.scale(0);
			// _this.setCenter();
			window.addEventListener('resize', function () {
				// _this.setCenter();
			});
			$('#menu-save').enable();
			$('#menu-saveAs').enable();
			$canvas.onmousemove = function (event) {
				var x = event.clientX - getElementViewLeft(this) + $drawing.scrollLeft,
					y = event.clientY - getElementViewTop(this) + $drawing.scrollTop;
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
		scale: scale
	};
})();

var option = (function () {
	var $option = $('.option')[0],
		currentTool = '',
		$currentOption = null;
		$currentToolDisplay = $('#current-tool');
	return {
		switchOption: function (toolId) {
			$currentToolDisplay.className = $('#tool-' + toolId).className;
			$currentOption && ($currentOption.className = '');
			$currentOption = $('#option-' + toolId);
			$currentOption && ($currentOption.className = 'actived');
		}
	}
})();

var tool = (function () {
	var currentTool = 'move',
		toolCommandSet = null;

	function switchTool(toolId) {
		if (! $('#tool-' + toolId)) return false;
		currentTool && $('#tool-' + currentTool).removeClass('checked');
		currentTool = toolId;
        $('#tool-' + currentTool).addClass('checked');
		option.switchOption(toolId);

		if (toolCommandSet && toolCommandSet[currentTool]) {
			var commands = toolCommandSet[currentTool],
				keys = Object.keys(commands.event);
			drawing.$canvas.style.cursor = commands.cursor ? commands.cursor : 'default';
			foreach(keys, function (item) {
				if (item === 'keydown' || item === 'keyup') {
					window.addEventListener(item, commands.event[item]);
				} else {
					drawing.$canvas.addEventListener(item, commands.event[item]);
				}
			});
		} else {
			drawing.$canvas.style.cursor = 'default';
		}
	}

	function bindKeyToSwitch(toolId, key) {
		window.addEventListener('keydown', function (e) {
			if (e.key === key) {
				switchTool(toolId);
				return false;		//屏蔽该键原本作用
			}
        });
	}
	
	function bindToolCommandSet(_toolCommandSet) {
		toolCommandSet = _toolCommandSet;
	}

	function init() {
		switchTool('move');
		foreach($('.tool>ul div'), function (item) {
			item.onclick = function () {
				switchTool(getIdSuffix(this.id));
            }
        });
    }

    init();

	return {
		currentTool: '',
		switchTool: switchTool,
		bindKeyToSwitch: bindKeyToSwitch,
		bindToolCommandSet: bindToolCommandSet
	};
})();

var magnifierTool = (function () {
	_isZoomIn = true,
	_scaleRate = 0.2,

	cursor = 'zoom-in';
	function click (event) {
		var rate = _isZoomIn ? _scaleRate : (-1 * _scaleRate);
		drawing.scale(rate, event.clientX, event.clientY);
	}
	function keydown (event) {
		if (event.altKey) {
			_isZoomIn = false;
			drawing.$canvas.style.cursor = 'zoom-out';
		}
	}
	function keyup () {
		if (!_isZoomIn) {
			_isZoomIn = true;
			drawing.$canvas.style.cursor = 'zoom-in';
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

var toolCommandSet = {
	magnifier: magnifierTool
};

(function init() {
	$('.bottom-container')[0].style.height = (window.innerHeight - 62) + 'px';

	window.addEventListener('resize', function () {
		document.body.style.height = window.innerHeight + 'px';
	});
	bindMenuClick($('.menu')[0], commandSet);
	bindWindowControlClick($('.window-control')[0], windowCommand);
	tool.bindKeyToSwitch('hand', 32);
	window.oncontextmenu = function () {
		return false;
	};
	tool.bindToolCommandSet(toolCommandSet);
})();
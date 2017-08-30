/**
 * Created by vimcaw on 2017/5/27.
 */

var windowUIList = getAllWindowUI();

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
					view.load(this.result, file.name);
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
			view.load(windowForm.find('input').value);
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

		downloader.href = view.$canvas.toDataURL('image/' + format[imageFormat]);
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
	forEach($uls, function (item) {
		var id = getIdSuffix(item.id);
		if (id && commandSet[id]) {
			item.onclick = function () {
				commandSet[id]();
			}
		}
		
	});
};

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
	
	bindWhellOver($view, function (event) {
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
		view.fileName = fileName ? fileName : getUrlFileName(src);
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
				var x = event.clientX - getElementViewLeft(this) + $view.scrollLeft,
					y = event.clientY - getElementViewTop(this) + $view.scrollTop;
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

var option = (function () {
	var $option = $('.option'),
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
		toolCommandSet = null,
		isEnable = true;

	function _forEachEvents (isAdd) {
		if (toolCommandSet && toolCommandSet[currentTool]) {
			let commands = toolCommandSet[currentTool],
				keys = Object.keys(commands.event),
				handle;
			
			view.$canvas.style.cursor = commands.cursor ? commands.cursor : 'default';

			handle = isAdd ? 'addEventListener' : 'removeEventListener';

			forEach(keys, function (item) {
				if (item === 'keydown' || item === 'keyup') {
					window[handle](item, commands.event[item]);
				} else {
					view.$canvas[handle](item, commands.event[item]);
				}
			});
		} else {
			view.$canvas.style.cursor = 'default';
		}
	}

	function switchTool(toolId) {
		if (! $('#tool-' + toolId)) return false;
		currentTool && $('#tool-' + currentTool).removeClass('checked');
		_forEachEvents(false);
		currentTool = toolId;
        $('#tool-' + currentTool).addClass('checked');
		option.switchOption(toolId);
		_forEachEvents(true);	
		
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
		forEach($$('.tool>ul div'), function (item) {
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
		bindToolCommandSet: bindToolCommandSet,
		isEnable: isEnable
	};
})();

var toolCommandSet = (function () {
	var eyedropper = {
		cursor: 'url("image/Eyedropper.png"), progress',
		event: {
			click: function (event) {
				var x = $('#pos-x').innerText,
					y = $('#pos-y').innerText,
					imageData = view.context.getImageData(x, y, 1, 1);

				color.setForeColor(color.RGB2HEX(imageData.data));
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
		_isZoomIn = true,
		_scaleRate = 0.2,

		cursor = 'zoom-in';
		function click (event) {
			var rate = _isZoomIn ? _scaleRate : (-1 * _scaleRate);
			view.scale(rate, event.clientX, event.clientY);
		}
		function keydown (event) {
			if (event.altKey) {
				_isZoomIn = false;
				view.$canvas.style.cursor = 'zoom-out';
			}
			event.preventDefault();
		}
		function keyup () {
			if (!_isZoomIn) {
				_isZoomIn = true;
				view.$canvas.style.cursor = 'zoom-in';
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

var defaultKeymap = {
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

function registerHotkey (key, targetId) {
	var testingKey = new RegExp(/^((Ctrl|ctrl|Alt|alt|Shift|shift)\+)*[A-Za-z0-9]$/),
		$target;

	if (!testingKey.test(key)) {
		return;
	}

	$target = $('#' + targetId);
	$target.title += '(' + key + ')';
	if (key.length === 1) {
		document.addEventListener('keydown', function (event) {
			if (event.key.toUpperCase() === key.toUpperCase()) {
				$target.click();
			}
		}, false);
	} else {
		document.addEventListener('keydown', function (event) {
			var stateKey = key.match(/(Ctrl|ctrl|Alt|alt|Shift|shift)/)[0].toLowerCase(),
				mainKey = key.substring(key.length - 1);
			if (event[stateKey + 'Key'] && (event.key.toUpperCase() === mainKey.toUpperCase())) {
				$target.click();
			}
		}, false);
	}
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

var color = (function () {
	var _foreColor = '000000',
		_backColor = 'ffffff',
		_$foreColorDisplay = $('#fore-color'),
		_$backColorDisplay = $('#back-color');

	var HSV2RGB = CP.HSV2RGB,
		HSV2HEX = CP.HSV2HEX,
		RGB2HSV = CP.RGB2HSV,
		RGB2HEX = CP.RGB2HEX,
		HEX2HSV = CP.HEX2HSV,
		HEX2RGB = CP.HEX2RGB;

	var colorPicker = (function () {
		var picker = new CP($('#colorPicker #picker-UI'), false),
			windowForm = windowUIList.colorPicker,
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

		forEach(windowForm.findAll('input'), function ($input) {
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
					forEach($input.value, function (char, index) {
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
		})

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
				let r = $('#input-r').value,
					g = $('#input-g').value,
					b = $('#input-b').value;
				picker.set('rgb(' + r + ', ' + g + ', ' + b + ')');
				_updateData(RGB2HEX([r, g, b]));
			} else if (id === 'h' || id === 's' || id === 'v') {
				let h = $('#input-h').value,
					s = $('#input-s').value,
					v = $('#input-v').value;
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
		$('#fore-color').addEventListener('click', function () {
			colorPicker.open('foreColor');
		});
		$('#back-color').addEventListener('click', function () {
			colorPicker.open('backColor');
		});
		$('#color-reset').addEventListener('click', function () {
			setForeColor('000000');
			setBackColor('ffffff');
		});
		$('#color-exchange').addEventListener('click', function () {
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

(function init() {
	bindMenuClick($('.menu'), commandSet);
	bindWindowControlClick($('.window-control'), windowCommand);
	tool.bindKeyToSwitch('hand', 32);
	window.oncontextmenu = function () {
		return false;
	};
	tool.bindToolCommandSet(toolCommandSet);
	// loadKeymap(defaultKeymap);
	loadKeymap(keymap);
})();
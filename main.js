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
	
	function scaleAdd(addition, x, y) {
		if (addition && typeof addition === 'number') {
			var oldScaleRate = scaleRate;
			scaleRate += addition;
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
				scaleAdd(-0.2, x, y);
			} else {
				scaleAdd(0.2, x, y);
			}
			return false;
		}
	});
	
	return {
		$canvas: $canvas,
		fileName: fileName,
		load: function (src, fileName) {
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
					// var size = getlimitSize(image, 800, 500);
				// scaleRate = size.width / $canvas.width;
				context.drawImage(image, 0, 0);
				
				_this.scaleAdd(0);
				// _this.setCenter();
				window.addEventListener('resize', function () {
					// _this.setCenter();
				});
			};
		},
		setCenter: setCenter,
		scaleAdd: scaleAdd
	};
})();

var option = (function () {
	var $option = $('.option')[0],
		$currentOption = null,
		$currentToolDisplay = $('#current-tool');
	return {
		switchOption: function (toolId) {
			var $toolLabel = $('label[for="tool-' + toolId + '"]')[0];
			$currentToolDisplay.className = $toolLabel.className;
			if ($currentOption) {
				$currentOption.style.display = 'none';
			}
			$currentOption = $('#option-' + toolId);
			if ($currentOption) {
				$currentOption.style.display = 'inline-block';
			}
		}
	}
})();

var tool = (function () {
	var $currentTool = getRadioCheckedElement('tool');

	function switchTool(toolId) {
		currentTool = toolId;
		option.switchOption(toolId);
	}

	switchTool(getIdSuffix($currentTool.id));

	listenRadioChange('tool', function () {
		$currentTool = this;
		switchTool(getIdSuffix(this.id));
	});

	return {
		currentTool: '',
		switchTool: switchTool
	};
})();

(function init() {
	$('.bottom-container')[0].style.height = (window.innerHeight - 62) + 'px';

	window.addEventListener('resize', function () {
		document.body.style.height = window.innerHeight + 'px';
	});
	bindMenuClick($('.menu')[0], commandSet);
	bindWindowControlClick($('.window-control')[0], windowCommand);
})();
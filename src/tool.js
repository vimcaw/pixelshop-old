import {$, $$} from './element';
import color from './color';
import view from './view';
import {getIdSuffix} from './WebDesktop';

export var option = (function () {
	var $option = $('.option'),
		currentTool = '',
		$currentOption = null,
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

			keys.forEach(function (item) {
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
	
	function bindToolCommandSet(_toolCommandSet) {
		toolCommandSet = _toolCommandSet;
	}

	function init() {
		switchTool('move');
		$$('.tool>ul div').forEach(function (item) {
			item.onclick = function () {
				switchTool(getIdSuffix(this.id));
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
		var _isZoomIn = true,
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

tool.bindToolCommandSet(toolCommandSet);

export default tool;
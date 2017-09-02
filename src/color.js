import {$, $$} from './element';
import './color-picker/color-picker.min';
import {windowUIList} from './WebDesktop';

String.prototype.forEach = NodeList.prototype.forEach;

export var color = (function () {
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

export default color;
import {$} from './element';
import Layer from './layer';

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
	$('#design-boards ul').appendChild(this.$li);

	image.src = src;
	let _this = this;
	image.onload = function () {
	    localStorage.setItem(this.fileName, src);
        _this.createLayer(image);
		$('.canvas-size').innerText = image.width + '×' + image.height;
		_adjustImage();
		setCenter();
		window.addEventListener('resize', function () {
			_this.setCenter();
		});
		$('#menu-save').enable();
		$('#menu-saveAs').enable();
		_this.$canvases.onmousemove = function (event) {
			let x = event.clientX - this.getViewOffsetLeft() + $board.scrollLeft,
				y = event.clientY - this.getViewOffsetTop() + $board.scrollTop;
			$('#pos-x').innerText = Math.round(x / _this.scaling);
			$('#pos-y').innerText = Math.round(y / _this.scaling);
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
    $scale: $('.canvas-scale'),
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
        this.layers.push(new Layer(this.$canvases, image));
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

export default designBoardDirector;
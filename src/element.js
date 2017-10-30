/**
 * query选择器
 * @param selector {String} 选择器
 * @returns {*} {Node/NodeList} 若为id选择器，返回单个元素，否则返回NodeList
 */
export function $ (selector) {
	return document.querySelector(selector);
};

export function $$ (selector) {
	return document.querySelectorAll(selector);
}

NodeList.prototype.forEach = function (callback) {
	for (var i = 0,item; item = this[i++];) {
		callback(item, i - 1);
	}
};

HTMLCollection.prototype.forEach = NodeList.prototype.forEach;

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

Element.prototype.disabled = function () {
	this.addClass('disabled');
}

Element.prototype.enable = function () {
	this.removeClass('disabled');
}

/**
 * 获取网页元素相对浏览器左部的距离
 * @returns {number} 网页元素相对浏览器左部的距离
 */
Element.prototype.getViewOffsetLeft = function () {
	var actualLeft = this.offsetLeft;
	var current = this.offsetParent;
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
};

/**
 * 获取网页元素相对浏览器顶部的距离
 * @returns {number} 网页元素相对浏览器顶部的距离
 */
Element.prototype.getViewOffsetTop = function () {
	var actualTop = this.offsetTop;
	var current = this.offsetParent;
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
};

/**
 * 让某个元素播放一次动画（通过切换类名实现），可多次触发
 * @param $element {Element} 要播放动画的元素
 * @param classBefore {String} 播放之前，没有animation属性的class
 * @param classAfter {String} 带有animation属性的class
 */
Element.prototype.playAnimation = function ( classBefore, classAfter) {
	this.className = classBefore;
	window.requestAnimationFrame(function(time) {
		window.requestAnimationFrame(function(time) {
			this.className = classAfter;
		});
	});
};

String.prototype.trimLength = function (length) {
    if (this.length > length) {
        return this.substr(0, length) + '...';
    } else {
        return this;
    }
};
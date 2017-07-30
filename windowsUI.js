/**
 * Created by 10399 on 2017/5/29.
 */

/**
 * windowUI组件构造函数，生成windowUI组件对象
 * @param $window {Element} 窗口容器元素
 * @constructor
 */
function WindowUI ($window) {
	this.$this = $window;
	this.$elements = this.$this.children;
	this.$titleBar = document.createElement('div');
	this.$title = document.createElement('p');
	
	var $close = document.createElement('div');
	this.$titleBar.className = 'title-bar';
	this.$title.innerText = this.$this.id;
	$close.className = 'close';
	
	var _this = this;
	$close.onclick = function () {
		_this.close();
	};
	
	this.$titleBar.appendChild(this.$title);
	this.$titleBar.appendChild($close);
	this.$this.insertBefore(this.$titleBar, this.$this.firstChild);
	
	setDragMoving(this.$titleBar, this.$this);
};

WindowUI.prototype = {
	constructor: WindowUI,
	$block: (function () {
		var $block = document.createElement('div');
		$block.className = 'block-all';
		$block.style.height = window.innerHeight + 'px';
		$block.style.display = 'none';
		document.body.appendChild($block);
		return $block;
	})(),
	open: function () {
		this.$this.style.display = 'block';
		this.$block.style.display = 'block';
		var _this = this;
		this.$block.onclick = function () {
			_this.twinkle();
		};
		this.setCenter();
		var _this = this;
		window.addEventListener('resize', function () {
			_this.setCenter();
		});
	},
	close: function () {
		this.$this.style.display = 'none';
		this.$block.style.display = 'none';
		//修复类名，防止下次窗口刚出现就闪烁
		this.$this.className = 'window';
		this.$titleBar.className = 'title-bar';
	},
	find: function (selector) {
		return this.$this.querySelector(selector);
	},
	setCenter: function () {
		var left = (window.innerWidth - this.$this.offsetWidth) / 2;
		var top = (window.innerHeight - this.$this.offsetHeight) / 2;
		this.$this.style.left = left + 'px';
		this.$this.style.top = top + 'px';
	},
	twinkle: function () {
		playAnimation(this.$this, 'window', 'window twinkle-border');
		playAnimation(this.$titleBar, 'title-bar', 'title-bar twinkle-title');
	}
};

function registerWindow () {
	var windowUIList = {};
	var $windows = $('.window');
	foreach($windows, function (item) {
		windowUIList[item.id] = new WindowUI(item);
	});
	return windowUIList;
};

function panel($panel) {
	this.$this = $panel;
}

/**
 * 遍历所有子菜单并执行操作
 * @param $ul {HTMLUIListElement} 菜单ul容器元素
 * @param callback {Function} 对每个子菜单执行操作回调函数，传递该子菜单元素作为回调参数
 */
function foreachMenu ($ul, callback) {
	var $uls = $ul.children;
	foreach($uls, function (item) {
		if (item.children.length === 0) {
			callback(item);
		} else {
			foreachMenu(item.querySelector('ul'), callback);
		}
	});
}

/**
 * 给菜单绑定指令
 * @param $menuUl {HTMLUListElement} 要绑定的菜单列表
 * @param commandSet {Object} 要绑定的指令集
 */
function bindMenuClick ($menuUl, commandSet) {
	//遍历菜单，给每项子菜单绑定指令集中的指令
	foreachMenu($menuUl, function (item) {
		var id = getIdSuffix(item.id);      //id值去前缀
		if (id && commandSet[id]) {
			item.onclick = function () {
				commandSet[id]();
			};
		} else {
			item.onclick = function () {
				alert('undefined Task');
			}
		}
	});
	//给二级菜单框绑定点击事件，在子菜单点击后的冒泡阶段隐藏此二级菜单
	var $ul_2 = $menuUl.getElementsByTagName('ul');
	foreach($ul_2, function (item) {
		item.onclick = function () {
			item.className = 'hide';
		}
	});
}

var windowUIList = registerWindow();

//常用函数封装

/**
 * query选择器
 * @param selector {String} 选择器
 * @returns {*} {Node/NodeList} 若为id选择器，返回单个元素，否则返回NodeList
 */
var $$ = function (selector) {
	return document.querySelectorAll(selector);
};

/**
 * 遍历数组或类数组并对每项进行操作
 * @param array {Array} 要遍历的数组
 * @param callback {Function} 对每项进行处理的函数
 */
var forEach = function (array, callback) {
	for (var i = 0,item; item = array[i++];) {
		callback(item, i - 1);
	}
};

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

/**
 * 让某个元素播放一次动画（通过切换类名实现），可多次触发
 * @param $element {Element} 要播放动画的元素
 * @param classBefore {String} 播放之前，没有animation属性的class
 * @param classAfter {String} 带有animation属性的class
 */
function playAnimation($element, classBefore, classAfter) {
	$element.className = classBefore;
	window.requestAnimationFrame(function() {
		window.requestAnimationFrame(function() {
			$element.className = classAfter;
		});
	});
}

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
	forEach($radios, function (item) {
		item.addEventListener('change', function () {
			if (this.checked) {
				return callback.call(this, arguments);
			}
		});
	});
}

/**
 * 获取元素id后缀（第一个横杠“-”以后的内容）
 * @param id {string} 要获取后缀的id
 * @returns {string} id后缀
 */
function getIdSuffix(id) {
	var index = id.indexOf('-');
	if (index === -1) {
		return id;
	} else {
		return id.substring(index + 1);
	}
}

/*---------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------*/
/*---------------------------------- Menu -----------------------------------*/
/*---------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------*/

/**
 * 遍历所有子菜单并执行操作
 * @param $ul {HTMLUIListElement} 菜单ul容器元素
 * @param callback {Function} 对每个子菜单执行操作的回调函数，传递该子菜单元素作为回调参数
 */
function forEachMenu ($ul, callback) {
	var $uls = $ul.children;
	forEach($uls, function (item) {
		if (item.children.length === 0) {
			callback(item);
		} else {
			forEachMenu(item.querySelector('ul'), callback);
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
	forEachMenu($menuUl, function (item) {
		var id = item.id.search('-') ? getIdSuffix(item.id) : item.id;      //id值去前缀
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
	forEach($ul_2, function (item) { 
		item.onclick = function () {
			// item.addClass('hide');
		}
	});
}

/*---------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------*/
/*--------------------------------- Window ----------------------------------*/
/*---------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------*/

/**
 * windowUI组件构造函数，生成windowUI组件对象
 * @param $window {Element} 窗口容器元素
 * @constructor
 */
function WindowUI ($window) {
	this.$window = $window;   //窗口本身元素
	this.$elements = this.$window.children;   //窗口子元素集合
	this.$titleBar = document.createElement('div');     //标题栏
	this.$title = document.createElement('p');      //标题文本

	//Hook
	this.hook = {
		open: [],
		close: []
	}

	this.$titleBar.className = 'title-bar';

	var title = this.$window.id;
	title = title.replace(/([A-Z])/g, ' $1');
	title = title[0].toUpperCase() + title.substring(1);
	this.$title.innerText = title;

	//关闭按钮
	var $close = document.createElement('div');
	$close.className = 'close';
	var _this = this;
	$close.onclick = function () {
		_this.close();
	};

	//构建DOM
	this.$titleBar.appendChild(this.$title);
	this.$titleBar.appendChild($close);
	this.$window.insertBefore(this.$titleBar, this.$window.firstChild);

	//给窗口标题栏添加拖拽移动功能
	setDragMoving(this.$titleBar, this.$window);
}

WindowUI.prototype = {
	constructor: WindowUI,
	//窗口打开时，非窗口区域的覆盖块，用来屏蔽非窗口区域的交互
	$block: null,
	/**
	 * 打开这个窗口
	 * @param isCenter {Boolean} 打开时窗口是否居中（默认true)
	 */
	open: function (isCenter) {
		this.$window.style.display = 'block';

		if (WindowUI.prototype.$block) {
			this.$block.style.display = 'block';
		} else {
			var $block = document.createElement('div');
			$block.className = 'block-all';
			document.body.appendChild($block);
			WindowUI.prototype.$block = $block;
		}
		
		var _this = this;
		
		if (isCenter === undefined || isCenter === true) {
			//让窗口居中
			this.setCenter();
		}
		
		//点击非窗口区域时，闪烁窗口
		this.$block.onclick = function () {
			_this.twinkle();
		};
		
		this.hook.open && this.hook.open.forEach(function (callback) {
			callback();
		})
	},
	/**
	 * 关闭这个窗口
	 */
	close: function () {
		this.$window.style.display = 'none';
		this.$block.style.display = 'none';
		//修复类名，防止下次窗口刚出现就闪烁
		this.$window.className = 'window';
		this.$titleBar.className = 'title-bar';

		this.hook.close && this.hook.close.forEach(function (callback) {
			callback();
		})
	},
	/**
	 * 查找窗口中的符合选择器的第一个元素
	 * @param selector {String} 要查找元素的css选择器
	 * @returns {Element} 找到的元素
	 */
	find: function (selector) {
		return this.$window.querySelector(selector);
	},

	/**
	 * 查找窗口中的符合选择器的所有元素
	 * @param selector {String} 要查找元素的css选择器
	 * @returns {HTMLCollection} 找到的元素集合
	 */
	findAll: function (selector) {
		return this.$window.querySelectorAll(selector);
	},

	/**
	 * 让这个窗口居中
	 */
	setCenter: function () {
		var left = (window.innerWidth - this.$window.offsetWidth) / 2;
		var top = (window.innerHeight - this.$window.offsetHeight) / 2;
		this.$window.style.left = left + 'px';
		this.$window.style.top = top + 'px';
	},
	/**
	 * 闪烁窗口的标题栏和边框
	 */
	twinkle: function () {
		playAnimation(this.$window, 'window', 'window twinkle-border');
		playAnimation(this.$titleBar, 'title-bar', 'title-bar twinkle-title');
	},

	on: function (hook, callback) {
		this.hook[hook].push(callback);
	}
};

/**
 * 获取所有窗口组件
 * @returns {{}} WindowUI对象列表
 */
function getAllWindowUI () {
	var windowUIList = {};
	var $windows = $$('.window');
	forEach($windows, function (item) {
		windowUIList[item.id] = new WindowUI(item);
	});
	return windowUIList;
};


/*---------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------*/
/*--------------------------------- Tab ----------------------------------*/
/*---------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------*/

function Tab (tabId) {
	var $tab = document.getElementById(tabId);
	this.$tabList = $tab.querySelectorAll('ul>li');
	this.$tabContentList = $tab.querySelectorAll('.tab-content>div');
	this.currentId = 0;
	
	if (this.$tabList.length !== 0) {
		this.switchTab(this.currentId);
		var _this = this;
		forEach(this.$tabList, function (item, index) {
			item.onclick = function () {
				_this.switchTab(index);
			}
		});
	}
}

Tab.prototype = {
	constructor: Tab,
	switchTab: function (id) {
		this.$tabList[this.currentId].removeClass('checked');
		this.$tabContentList[this.currentId].removeClass('checked');
		this.currentId = id;
		this.$tabList[this.currentId].addClass('checked');
		this.$tabContentList[this.currentId].addClass('checked');
	}
}

function getAllTab() {
	var $tabUIList = $$('.tab');
	var tabUIList = [];
	
	$tabUIList && forEach($tabUIList, function (item) {
		tabUIList.push(new Tab(item));
	});
	
	return tabUIList;
}

/*---------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------*/
/*--------------------------------- Tree ------------------------------------*/
/*---------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------*/

// data 格式：
// data = [
// 	'demo.txt',     //item
// 	'a',        //item
//  //folder:
// 	{
// 		label: 'folder',
// 		children: [
// 			'a.mp4',
// 			'b',
// 			{
// 				//folder
// 				label: 'c',
// 				[
// 					'c0001',
// 					'c0002',
// 					'c0003'
// 				]
// 			}
// 		]
// 	},
//  'd0001',
//  'd0002'
// ];

function Tree(data) {
	this.$tree = this.createTree(data);
	this.$tree.className = 'tree';
	this.$value = null;
}

Tree.prototype = {
	constructor: Tree,
	createItem: function (item) {
		var $li = document.createElement('li'),
			$span = document.createElement('span'),
			_this = this;
		
		$span.innerText = item;
		$span.onclick = function() {
			_this.check(this);
		};
		$li.appendChild($span);
		return $li;
	},
	createTree: function (data) {
		var $ul = document.createElement('ul'),
			_this = this;
		forEach(data, function (item) {
			if (item.label) {
				var $li = document.createElement('li'),
					$span = document.createElement('span');
				$span.className = 'folder';
				$span.innerText = item.label;
				$span.onclick = function() {
					this.removeClass('expanded') || this.addClass('expanded');
				};
				$li.appendChild($span);
				$li.appendChild(_this.createTree(item.children));
				$ul.appendChild($li);
			} else {
				$ul.appendChild(_this.createItem(item));
			}
		});
		return $ul;
	},
    /**
	 * 选中元素更改事件
     */
	onchange: function () {

    },
	/**
	 * 选中某项
	 * @param $item {Element} 要选中的元素
	 */
	check: function ($item) {
		this.$value && this.$value.removeClass('checked');
		this.$value = $item;
		this.$value.addClass('checked');
		this.onchange();
	},
	/**
	 * 渲染树形组件到某个元素下面
	 * @param $target {Element} 要存放树形组件的父节点，若没有指定则存放到body元素下
	 */
	render: function ($target) {
		$target = $target || document.body;
		$target.appendChild(this.$tree);
	}
};

/*---------------------------------------------------------------------------*/
var windowUIList = getAllWindowUI();

export {
	windowUIList,
	bindMenuClick,
	getIdSuffix
}
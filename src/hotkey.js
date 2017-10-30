import {$,} from './element';

/**
* 快捷键对象，负责管理快捷键
*/
var hotkey = (function () {
   var _registeredHotkeys = [];

   function addHotkeyHint (key, targetId) {
       var $target = $('#' + targetId);
       if (targetId.match(/menu-/) || $('.menu #' + targetId)) {
           //给菜单项添加快捷键提示
           let $hotkeyHint = document.createElement('span');
           $hotkeyHint.className = 'hotkey-hint';
           $hotkeyHint.innerText = key.replace(/(^[a-z]|\b[a-z])/g, (match) => {return match.toUpperCase();});
           $target.appendChild($hotkeyHint);
           $target.addClass('hasHotkey');
       } else {
           //给按钮添加快捷键提示
           $target.title += '(' + key + ')';
       }
   }

   function registerHotkey (key, targetId) {
       var testingKey = new RegExp(/^((Ctrl|ctrl|Alt|alt|Shift|shift)\+)*[A-Za-z0-9]$/),
           $target = $('#' + targetId),
           stateKeys = key.match(/(Ctrl|ctrl|Alt|alt|Shift|shift)/),
           mainKey = key.substring(key.length - 1);
   
       //如果此键已被注册过/格式不正确/指向得目标不存在，结束并返回false
       if (_registeredHotkeys.includes(key) || !testingKey.test(key) || !$target) {
           return false;
       }
   
       document.addEventListener('keypress', function (event) {
           var isStateKeysDown = true;
           stateKeys && stateKeys.forEach(function (stateKey) {
               isStateKeysDown = isStateKeysDown && event[stateKey.toLowerCase() + 'Key'];
           })
           if (isStateKeysDown && (event.key.toUpperCase() === mainKey.toUpperCase())) {
               event.preventDefault();
               $target.click();
               return false;
           }
       }, false);

       addHotkeyHint(key, targetId);
       _registeredHotkeys.push(key);
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

   return {
       registerHotkey: registerHotkey,
       loadKeymap: loadKeymap,
       addHotkeyHint: addHotkeyHint
   }
})();

let defaultKeymap = {
    menu: {
        new: '',
        openFromLocal: 'Ctrl+O'
    },
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


export default hotkey;
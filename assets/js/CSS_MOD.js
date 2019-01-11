var css = new CSS_MOD;
css.init({
	blockClassPrefix:"css_mod__",
	url: '/CSS_MOD.php'
});

function CSS_MOD(){
	var _CSS_MOD = this;
	_CSS_MOD.options = {};

	this.init = function(opts){

		var defaults = {
			blockClassPrefix:"css_mod__",
			url: '/CSS_MOD.php'
		}

		_CSS_MOD.options = _CSS_MOD.merge_obj(defaults, opts);

		document.addEventListener('DOMContentLoaded', function(){
			_CSS_MOD.cacheCheck();
		});
	}

	this.makeRequest = function (cb){
		var blocks = document.querySelectorAll("[class*='"+_CSS_MOD.options.blockClassPrefix+"']");
		var blocksArrayClass = [];

		Array.prototype.forEach.call(blocks, function (value) {
			blocksArrayClass.push(value.className);
		});

		var xhr = new XMLHttpRequest();
		xhr.open('POST', _CSS_MOD.options.url, true);

		var json = JSON.stringify({
			blocks: blocksArrayClass
		});

		xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');

		xhr.onload = function(data) {
			if (xhr.status != 200) {
				console.warn(xhr);
			} else {
				if (xhr.responseText!='') {
					var data = JSON.parse(xhr.responseText);
					cb(data);
				}
			}
		}
		xhr.send(json);
	}

	this.cacheCheck = function(){

		if (localStorageTest()) {

			var currentPath = location.pathname;

			if (localStorage[currentPath + "common_css_sum"] == '' || localStorage[currentPath + "common_css_sum"] == undefined
				|| localStorage[currentPath + "blocks_css_sum"] == '' || localStorage[currentPath + "blocks_css_sum"] == undefined) {
				_CSS_MOD.makeRequest(function(data){
					updateLocalStorage(data);
					_CSS_MOD.setCss(data.common_css + data.blocks_css);
				});
			}else{
				_CSS_MOD.setCss(localStorage[currentPath + "common_css"] + localStorage[currentPath + "blocks_css"]);

				_CSS_MOD.makeRequest(function(data){
					if (localStorage[currentPath + "common_css_sum"] !== data.common_css_sum
						|| localStorage[currentPath + "blocks_css_sum"] !== data.blocks_css_sum) {

						updateLocalStorage(data);
						console.log('updated to last css ver');
						_CSS_MOD.setCss(data.common_css + data.blocks_css);
					}
				});
			}


		}else{
			_CSS_MOD.makeRequest(function(data){
				_CSS_MOD.setCss(data.common_css + data.blocks_css);
			});
		}

		function updateLocalStorage(data){
			localStorage[currentPath + "common_css_sum"] = data.common_css_sum;
			localStorage[currentPath + "blocks_css_sum"] = data.blocks_css_sum;

			localStorage[currentPath + "common_css"] = data.common_css;
			localStorage[currentPath + "blocks_css"] = data.blocks_css;
		}

		function localStorageTest(){
			var mod = 'modernizr';
			try {
					localStorage.setItem(mod, mod);
					localStorage.removeItem(mod);
					return true;
				} catch(e) {
					return false;
				}
		}
	}

	this.setCss = function(css){
				var head = document.head || document.getElementsByTagName('head')[0]
				var style = '';
				if (_CSS_MOD.setCss.styleTag == "") {
					style = document.createElement('style');
					_CSS_MOD.setCss.styleTag = style;
				}else{
					style = _CSS_MOD.setCss.styleTag;
					_CSS_MOD.setCss.firstInit = false;
				}
				style.type = 'text/css';
				if (style.styleSheet){
					style.styleSheet.cssText = css;
				} else {
					style.innerHTML = "";
					style.appendChild(document.createTextNode(css));
				}
				if (_CSS_MOD.setCss.firstInit) {
					head.appendChild(style);
				};
	}
	this.setCss.firstInit = true;
	this.setCss.styleTag = "";

	this.merge_obj = function (obj1,obj2){
		var obj3 = {};
		for (var attrname in obj1) { obj3[attrname] = obj1[attrname]; }
		for (var attrname in obj2) { obj3[attrname] = obj2[attrname]; }
		return obj3;
	}
}
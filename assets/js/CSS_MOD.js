var css = new CSS_MOD;
css.init({
	blockClassPrefix:"css_mod__",
	url: '/CSS_MOD.php',
	onCssSet: function(){
		console.log('oncssset method');
	},
	onInit: function(){
		console.log('oninit');
	}
});

function CSS_MOD(){


	//Publick methods
	var _CSS_MOD = this;
	
	_CSS_MOD.options = {};

	_CSS_MOD.init = function(opts){

		var defaults = {
			blockClassPrefix:"css_mod__",
			url: '/CSS_MOD.php',
			// Callbacks
			onInit : function(){},
			onCssSet : function(){}
		}

		_CSS_MOD.options = merge_obj(defaults, opts);
		document.addEventListener('DOMContentLoaded', function(){
			cacheCheck();
		});
		_CSS_MOD.options.onInit(_CSS_MOD);
	}

	_CSS_MOD.update = function(){
		cacheCheck();
	}


	//Private methods
	makeRequest = function (cb){
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

	cacheCheck = function(){

		if (localStorageTest()) {

			var currentPath = location.pathname;

			if (localStorage[currentPath + "common_css_sum"] == '' || localStorage[currentPath + "common_css_sum"] == undefined
				|| localStorage[currentPath + "blocks_css_sum"] == '' || localStorage[currentPath + "blocks_css_sum"] == undefined) {
					makeRequest(function(data){
					updateLocalStorage(data);
					setCss(data.common_css + data.blocks_css);
				});
			}else{
				setCss(localStorage[currentPath + "common_css"] + localStorage[currentPath + "blocks_css"]);

				makeRequest(function(data){
					if (localStorage[currentPath + "common_css_sum"] !== data.common_css_sum
						|| localStorage[currentPath + "blocks_css_sum"] !== data.blocks_css_sum) {

						updateLocalStorage(data);
						console.log('updated to last css ver');
						setCss(data.common_css + data.blocks_css);
					}
				});
			}


		}else{
			makeRequest(function(data){
				setCss(data.common_css + data.blocks_css);
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

	setCss = function(css){
				var head = document.head || document.getElementsByTagName('head')[0]
				var style = '';
				if (setCss.styleTag == "") {
					style = document.createElement('style');
					setCss.styleTag = style;
				}else{
					style = setCss.styleTag;
					setCss.firstInit = false;
				}
				style.type = 'text/css';
				if (style.styleSheet){
					style.styleSheet.cssText = css;
				} else {
					style.innerHTML = "";
					style.appendChild(document.createTextNode(css));
				}
				if (setCss.firstInit) {
					head.appendChild(style);
				};

				_CSS_MOD.options.onCssSet(CSS_MOD);
	}
	setCss.firstInit = true;
	setCss.styleTag = "";

	merge_obj = function (obj1,obj2){
		var obj3 = {};
		for (var attrname in obj1) { obj3[attrname] = obj1[attrname]; }
		for (var attrname in obj2) { obj3[attrname] = obj2[attrname]; }
		return obj3;
	}
}
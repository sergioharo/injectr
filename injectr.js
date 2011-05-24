(function(){
	var kCSSURL = '';
	var kJQueryURL = 'http://ajax.googleapis.com/ajax/libs/jquery/1.6.1/jquery.min.js';
	var kJSTester = /(\.js)$/i;
	var kCSSTester = /(\.css)$/i;
	
	var gInit = false;
	var gCount = 0;
	
	//--------------------------------------------------
	// Setup
	//--------------------------------------------------
	
	function injectr() {
		if(!init()) {
			return;
		}
		
		showDialog();
	}
	
	function init() {
		if(gInit) {
			return true;
		}
		
		if (typeof jQuery == 'undefined') {
		    appendScript(kJQueryURL, injectr);
		} else {
			appendCSS(kCSSURL);
		    gInit = true;
		}
		
		return gInit;	
	}
	
	//--------------------------------------------------
	// Business Logic
	//--------------------------------------------------
	
	function showDialog() {
		var id = ++gCount;
		
		$(document.body).append('\
			<div id="injectr-' + id + '" class="injectr-back">\
				<div class="injectr-dlg">\
					<input type="text" value="" id="injectr-txt" />\
					<button class="injectr-cancel">Cancel</button>\
					<button class="injectr-do">Inject!</button>\
				</div>\
			</div>\
		');
		
		$("#injectr-" + id + " button.injectr-do").click(doInject);
		$("#injectr-" + id + " button.injectr-cancel").click(hideDialog);
	}
	
	function hideDialog() {
		$(".injectr-back").remove();
	}
	
	function doInject() {
		var val = $("#injectr-txt").val();
		
		if(kJSTester.test(val)) {
			appendScript(val);
		} else if (kCSSTester.test(val)) {
			appendCSS(val);
		}
	}
	
	//--------------------------------------------------
	// Utilities
	//--------------------------------------------------
	
	function appendScript(script, onloadCallback) {
		var s = document.createElement('script');
	    s.type = 'text/javascript';
		if(onloadCallback)
	    	s.onload=onloadCallback;
	    s.src = kJQueryURL;
	    document.body.appendChild(s);
	}
	
	function appendCSS(stylesheet) {
		var l = document.createElement('link');
	    l.rel = 'stylesheet';
	    l.type = 'text/css';
	    l.href = stylesheet;
	    document.getElementsByTagName("head")[0].appendChild(l)
	}
})();
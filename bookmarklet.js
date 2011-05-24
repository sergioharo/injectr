(function(){
	if(injectr) {
		injectr();
	} else {
		var s = document.createElement('script');
	    s.type = 'text/javascript';
	    s.src = 'https://github.com/sergioharo/injectr/raw/master/injectr.js';
	    document.body.appendChild(s);
	}
})();
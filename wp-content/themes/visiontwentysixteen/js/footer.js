var PCM = PCM || {};

PCM.footerActions = function() {
	var _backToTop = function(elem){
		el = $(elem);
		if(el.length > 0){
		    var offset=200, 
		    scrollDuration=300; 
	        $(window).scroll(function() {
			    if ($(this).scrollTop() > offset) {
		            el.fadeIn(500); 
	            } else {
					el.fadeOut(500); 
				}
				el.click(function(event) {
					event.preventDefault();
					$('html, body').stop().animate({ scrollTop: 0}, scrollDuration);
		        });
			});
		}
	};

	return {
		backToTop: _backToTop
	};
}
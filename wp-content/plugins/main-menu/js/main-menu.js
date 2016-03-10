var PCM = PCM || {};

PCM.mainNav = (function($j) {
	var init = function(settings) {
		var mainContainer = $j('.menu-nav');
		var menuCons = $j('.static-links-con');
		var navMenu = $j('.nav-menu');
		var shadow = $j('.shdw-blr');
		var canNavClick = true;
		var isClosing = true;
		var toOpen; 
		
		var ANIMATE_SPEED = 150;
		var ANIMATE_SECOND_SPEED = 200;
		var ANIMATE_THIRD_SPEED = 300;
		var ANIMATE_EASING = 'easeInOutBack';
		
		var initEvents = function(){
			navMenu.find('a').click(function() {
				openCloseContainer(false, $j(this), true);
			});
			$j(document).mouseup(function(e) {
				checkClickArea(e);
			});
		};
		var checkClickArea = function(e){
			if (!mainContainer.is(e.target)
					&& mainContainer.has(e.target).length === 0) {
				if(!navMenu.find('a').is(e.target)){
					openCloseContainer(true, null);
				}	
			}
		};
		var setBorderHeight = function(ref, elem){
			if (navigator.userAgent.match(/msie/i) || navigator.userAgent.match(/Trident.*rv[ :]*11\./) ){
				elem.height((ref.height()) +'px' );
			}
		};
		var openCloseContainer = function(close, base, noanimate) {
			if (close) {
				isClosing = false;
			//close menu
				menuCons.filter(':visible').stop().fadeOut(ANIMATE_SPEED);
				mainContainer.height(mainContainer.height() + 'px');
				mainContainer.stop().delay(ANIMATE_THIRD_SPEED).slideUp(ANIMATE_SECOND_SPEED,
						ANIMATE_EASING, function(){
					mainContainer.height('auto');
					navMenu.find('li').removeClass('actv');
				});
			} else {
				elmtoOpen = $j('#'+ base.attr('data-ctgy'));
				mainContainer.css({'display': 'block'});
				if (!base.parents('li.nav').hasClass('actv') && canNavClick === true) {
					canNavClick = false;
					navMenu.find('li').removeClass('actv');
                                        
//					if(base.attr('data-ctgy') === 'solutionsMenu' || 
//                                                base.attr('data-ctgy') === 'servicesMenu'){
					if(base.attr('data-ctgy') === 'solutionsMenu'){
                                            var htmlBody = $j('body, html');
                                            var goToPage = null;
                                            
                                            if(base.attr('data-ctgy') === 'solutionsMenu'){
                                                goToPage = $j('.our-solution');
                                            }
//                                            }else if(base.attr('data-ctgy') === 'servicesMenu'){
//                                                goToPage = $j('.our-services');
//                                            }
                                            
                                            htmlBody.animate({scrollTop: goToPage.offset().top}, 1000);
                                            canNavClick = true;
                                        }else{
                                            base.parents('li.nav').addClass('actv');
                                        }
                                        
                                        menuCons.not(elmtoOpen).fadeOut(ANIMATE_SPEED);
                                        mainContainer.stop().velocity({'height':elmtoOpen.height()+ 'px' }, 300, ANIMATE_EASING, function(){
                                                elmtoOpen.fadeIn(300);
                                                setBorderHeight(elmtoOpen.find('.tbl'), elmtoOpen.find('.brdr-lyr-lft'));
                                                setBorderHeight(elmtoOpen.find('.tbl') , elmtoOpen.find('.brdr-lyr-rht'));
                                                mainContainer.height('auto');
                                                canNavClick = true;
                                        });
                                        shadow.show();
				} else {
					menuCons.filter(':visible').stop().fadeOut(ANIMATE_SPEED);
					mainContainer.height(mainContainer.height() + 'px');
					mainContainer.stop().delay(ANIMATE_THIRD_SPEED).slideUp(ANIMATE_SECOND_SPEED,
							ANIMATE_EASING, function(){
						mainContainer.height('auto');
						navMenu.find('li').removeClass('actv');
					});
	
				}
			}

		};

		initEvents();
	};
	return {
		init : init
	};
})(jQuery);
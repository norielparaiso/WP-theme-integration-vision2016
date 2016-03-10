var PCM = PCM || {};

PCM.mainNav = (function($j) {
    var init = function(settings) {
        var mainContainer = $j('.menu-nav');
        var menuCons = $j('.static-links-con');
        var navMenu = $j('.nav-menu');
        var shadow = $j('.shdw-blr');
        var toOpen;

        var ANIMATE_SPEED = 150;
        var ANIMATE_SECOND_SPEED = 200;
        var ANIMATE_EASING = 'easeInOutBack';

        var initEvents = function() {
            navMenu.find('a').click(function() {
                openCloseContainer(false, $j(this), true);
            });
        };
        var openCloseContainer = function(close, base, noanimate) {
            if (close) {
                //close menu

            } else {
                toOpen = '#' + base.attr('data-ctgy');

                if (!base.parents('li.nav').hasClass('actv') && canNavClick === true) {

                    canNavClick = false;
                    navMenu.find('li').removeClass('actv');
                    base.parents('li.nav').addClass('actv');

                    menuCons.not(toOpen).fadeOut(ANIMATE_SPEED);
                    mainContainer.stop().velocity({'height': dynaMenu.height() + 'px'}, 300, ANIMATE_EASING, function() {
                        menuCons.find(toOpen).fadeIn(ANIMATE_SECOND_SPEED);
                        mainContainer.height('auto');
                        canNavClick = true;
                    });
                    shadow.show();
                } else {
                    menuCons.slideUp(ANIMATE_SPEED,
                            ANIMATE_EASING);
                    base.parents('li.nav').delay(ANIMATE_SPEED).queue(function() {
                        $j(this).removeClass('actv').dequeue();
                    });

                }
            }

        };

        initEvents();
    };
    return {
        init: init
    };
})(jQuery);
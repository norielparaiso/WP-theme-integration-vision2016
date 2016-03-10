var PCM = PCM || {};
PCM.sideMenuSlider = (function($jQ) {
    var init = function() {
        initMenu();
        sideMenu();
    };
    var initMenu = function() {
        var bdyWrper = $jQ('.body-wrapper');
        var pgeWrper = $jQ('.page-wrapper');
        var pcmLinks = $jQ('.pcm-links');
        var menuNav = $jQ('.menu-nav');
        var navMenu = $jQ('.nav-menu');
        var navHder = $jQ('.headr .lht-rw-tbl');
        var slideSpeed = 400;
        $jQ(window).on('resize load', function() {
            var _this = $jQ(window).width();
            if (_this < 1024) {
                navHder.css('width', (_this - 40));
            }
            else {
                navHder.css('width', (980));
            }
            if (_this <= 765) {
                pcmLinks.removeAttr('style');
                menuNav.removeAttr('style');
                menuNav.find('.shdw-blr,.static-links-con').removeAttr('style');
                navMenu.find('.nav').removeClass('actv');
            }
            pgeWrper.removeAttr('style');
            bdyWrper.removeAttr('style');
            bdyWrper.css('width', _this);
            pgeWrper.css('width', _this);
        });
        $jQ('.pcm-links-menu .smnu').on('click', function() {
            if (pgeWrper.hasClass('sideOpen') === false) {
                pgeWrper.stop();
                pgeWrper.animate({left: 255}, slideSpeed, function() {
                    $jQ(this).addClass('sideOpen');
                });
            }
            else {
                pgeWrper.stop();
                pgeWrper.animate({left: 0}, slideSpeed, function() {
                    $jQ(this).removeClass('sideOpen');
                });
            }
            return false;
        });
        $jQ('.site-main-wrap, .wp-main-menu, .lht-rw').on('mouseup', function(e) {
            e.preventDefault();
            if (pgeWrper.hasClass('sideOpen') === true) {
                pgeWrper.stop();
                pgeWrper.animate({left: 0}, slideSpeed, function() {
                    $jQ(this).removeClass('sideOpen');
                });
            }
        });
    };
    var sideMenu = function() {
        var main = $jQ('.sidemenu li');
        var slideSpeed = 300;
        main.each(function() {
            var elm = $jQ(this);
            if (elm.find('ul').length !== 0) {
                elm.append('<i class="fa fa-chevron-down"></i>');
            }
        });
        main.find('a').click(function(e) {
            var clicked = jQuery(e.target);
            var elm = $jQ(this);
            var obj = elm.parent();
            if (obj.find('ul').length !== 0) {
                if (obj.find('ul').first().is(':visible') === false) {
                    if (clicked.parents('li').length < 2) {
                        main.find('ul').slideUp(slideSpeed);
                        main.removeClass('nav-active');
                        obj.addClass('nav-active');
                    } else {
                        main.find('ul li').removeClass('nav-active');
                        obj.addClass('nav-active');
                        main.find('ul li ul').slideUp(slideSpeed);
                    }
                    obj.find('ul').first().slideDown(slideSpeed);
                } else {
                    obj.find('ul').first().slideUp(slideSpeed);
                    obj.removeClass('nav-active');
                }
                return false;
            }
        });
    };
    return {
        init: init
    };
})(jQuery);


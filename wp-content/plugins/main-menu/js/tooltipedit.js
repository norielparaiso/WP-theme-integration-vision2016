var PCM = PCM || {};

PCM.tooltipDown = (function(j) {
    var init = function(_elem, isSlideDown) {
        var intrvalLoad;
        var ANIMATION = 'easeOutSine';
        var ANIMATION_SPEED = 100;
        var isSlideAnimation;


        var initEvent = function() {
            jQuery(document).on('click', _elem, function() {

                var href = jQuery(this).attr('href');
                if (!jQuery(href).hasClass('tp-vsible')) {
                    callTooltip(jQuery(this));
                    setMouseEvent(jQuery(this));
                } else {
                    hideTooltip(jQuery(this));
                }

                return false;
            });

        };

        var callTooltip = function(base) {
            var trnsfrm = 2;
            if (j('.tp-vsible').size() > 0) {
                hideOtherTooltip(base);
            }
            if (jQuery(window).width() < 768) {
                trnsfrm = 0;
            } else {
                trnsfrm = 2;
            }

            var content = jQuery(base.attr('href'));
            var loc = base.position();
            var arw = content.find('.arw');
            var top = loc.top + base.height() + arw.height() - trnsfrm; //margin deducted
            var left = loc.left + (base.outerWidth() - 5)
                    - (content.outerWidth() / 2);
            content.css('top', top - 10);
            content.css('left', left);
            content.show();
            content.velocity({
                top: top,
                left: left,
                opacity: 1
            }, ANIMATION_SPEED, ANIMATION, function() {
                content.addClass('tp-vsible');
            });



        };
        var hideOtherTooltip = function(base) {
            var hcontent = base.attr('href');
            j('.tp-vsible').not(hcontent).each(function(i) {
                var content = j('.tp-vsible').not(hcontent).eq(i);
                var loc = base.offset();
                var arw = content.find('.arw');
                var top = loc.top + base.height() + arw.height() + 4;
                content.velocity({
                    top: top - 5,
                    opacity: 0
                }, ANIMATION_SPEED, ANIMATION, function() {
                    content.hide();
                    content.removeClass('tp-vsible');
                });
            });


        };
        var hideTooltip = function(base) {
            var content = jQuery(base.attr('href'));
            var loc = base.offset();
            var arw = content.find('.arw');
            var top = loc.top + base.height() + arw.height() + 4;
            content.velocity({
                top: top - 5,
                opacity: 0
            }, ANIMATION_SPEED, ANIMATION, function() {
                content.hide();
                content.removeClass('tp-vsible');
            });


        };
        var hideTooltipInt = function(base) {
            clearInterval(intrvalLoad);
            intrvalLoad = setInterval(function() {
                base.removeAttr('style');
                base.blur();
                hideTooltip(base);
                clearInterval(intrvalLoad);
            }, 500);
        };

        var setMouseEvent = function(base) {
            var content = jQuery(base.attr('href'));
            base.unbind('mouseleave').mouseleave(function() {
                hideTooltipInt(base);
            });
            base.unbind('mouseenter').mouseenter(function() {
                hideOtherTooltip(base);
                base.focus();
                base.css('outline', 'none');
                clearInterval(intrvalLoad);

            });
            content.unbind('mouseleave').mouseleave(function() {

                hideTooltipInt(base);
            });
            content.unbind('mouseenter').mouseenter(function() {
                base.focus();
                base.css('outline', 'none');
                clearInterval(intrvalLoad);
            });
        };

        initEvent();
    };

    return {
        init: init
    };

})(jQuery);
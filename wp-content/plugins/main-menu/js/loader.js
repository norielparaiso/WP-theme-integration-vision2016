(function($jQ) {
    $jQ('.chat').click(function() {
        var left = ($jQ(window).width() / 2)-200;
        var top = ($jQ(window).height() / 2)-200;
        window.open('http://pcm.websitealive.com/2027/rRouter.asp?groupid=2027&websiteid=1&departmentid=0&dl=' + escape(document.location.href), '', 'width=400,height=400,top='+top+', left='+left);
        return false;
    });
    $jQ(function() {
        PCM.changeHomepage.init();
        PCM.mainNav.init();
        PCM.tooltipDown.init('.follow-us-social');
        PCM.sideMenuSlider.init();
    });
})(jQuery);
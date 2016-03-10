var PCM = PCM || {};

PCM.changeHomepage = (function(j) {
    var init = function() {
        var changebutton = '.pcm-links-menu .mnu';
        var links = j('.pcm-links');
        var ANIMATE_SPEED = 300;
        var ANIMATE_EASING = 'easeInOutQuint';
        var brdrRht = j('.brdr-lyr-rht-blk');
        var brdrLft = j('.brdr-lyr-lft-blk');
        var menuDiv = j('.pcm-links-menu');

        var initEvents = function() {

            //creating session , session value is based on the main landing homepage		
            //**********************************
            //Start of Cookies Management Plugin
            //**********************************
            PCM.cookies = function() {

                //***********************************************
                //Start of Function that Creates cookies
                //Params: name = name of the cookie
                //value = value of the cookie
                //days = number of days when this cookie is valid
                //***********************************************
                var createCookie = function(name, value, days) {
                    var date = new Date();
                    var expires = '';
                    if (days) {
                        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
                        expires = '; expires=' + date.toGMTString();
                    } else {
                        expires = '';
                    }
                    document.cookie = name + date.getTime() + '=' + value + expires + '; path=/';
                };

                //************************************
                //End of Function that Creates cookies
                //************************************
                //*****************************************
                //Start of Function That Reads Cookies Name
                //Param: name = prefix of the cookies name
                //*****************************************
                var readCookiesName = function(name) {
                    var cookies = document.cookie.split(';');
                    var arr = [];

                    for (var i = 0; i < cookies.length; i++) {
                        var cookie = cookies[i];

                        while (cookie.charAt(0) === ' ') {
                            cookie = cookie.substring(1, cookie.length);
                        }

                        if (cookie.indexOf(name) === 0) {
                            arr.push(cookie.substring(0, cookie.indexOf('=')));
                        }
                    }

                    if (arr.length === 0) {
                        return null;
                    }

                    return arr;
                };

                //***************************************
                //End of Function That Reads Cookies Name
                //***************************************

                //******************************************
                //Start of Function That Reads Cookies Value
                //Param: name = prefix of the cookies name
                //******************************************
                var readCookiesValue = function(name) {
                    var cookies = document.cookie.split(';');
                    var arr = [];

                    for (var i = 0; i < cookies.length; i++) {
                        var cookie = cookies[i];

                        while (cookie.charAt(0) === ' ') {
                            cookie = cookie.substring(1, cookie.length);
                        }

                        if (cookie.indexOf(name) === 0) {
                            arr.push(cookie.substring(cookie.indexOf('=') + 1, cookie.length));
                        }
                    }

                    if (arr.length === 0) {
                        return null;
                    }

                    arr.reverse();

                    return arr;
                };
                //****************************************
                //End of Function That Reads Cookies Value
                //****************************************


                //*****************************************
                //Start of Function That Deletes All Cookies
                //Param: name = prefix of the cookie
                //*****************************************
                var deleteAllCookies = function(name) {
                    var cookies = PCM.cookies().readCookiesName(name);
                    if (isNotNull(cookies)) {
                        for (var i = 0; i < cookies.length; i++) {
                            document.cookie = cookies[i] + "=''; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
                        }
                    }
                };

                //****************************************
                //End of Function That Deletes All Cookies
                //****************************************

                return {
                    createCookie: createCookie,
                    readCookiesName: readCookiesName,
                    readCookiesValue: readCookiesValue,
                    deleteAllCookies: deleteAllCookies
                };
            };
            //********************************
            //End of Cookies Management Plugin
            //********************************	

            function getUrlVars()
            {
                var vars = [], hash;
                var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
                for (var i = 0; i < hashes.length; i++)
                {
                    hash = hashes[i].split('=');
                    vars.push(hash[0]);
                    vars[hash[0]] = hash[1];
                }
                return vars;
            }
            //temporary value of cookie
            var cookieName = 'homeLanding';
            var cookieExpirationDays = 1;
            var welcome = '';

            if (getUrlVars()["subpage"] === undefined) {
                if (getUrlVars()["homepage"] !== undefined) {
                    var homepage = getUrlVars()["homepage"].toUpperCase();
                } else {
                    homepage = "PCM";
                }
            } else {
                var homepage = getUrlVars()["subpage"].toUpperCase();
            }
            if (homepage.length > 6) {
                homepage = homepage.substr(0, homepage.length - 1);
            }
            if ((PCM.cookies().readCookiesName(cookieName) === null)) {
                PCM.cookies().createCookie(cookieName, 'PCM', cookieExpirationDays);
            }

            if (PCM.cookies().readCookiesValue(cookieName)[0] !== '') {

                if (j('.sldr').length !== 0) { // create a cookie in the homepage only
                    PCM.cookies().createCookie(cookieName, homepage, cookieExpirationDays);
                }
                if (j('#rotator').length !== 0) {// create a cookie in the opstrack only							
                    PCM.cookies().createCookie(cookieName, homepage, cookieExpirationDays);
                }
                if (j('#lg-video').length !== 0) {// create a cookie in the bd only								
                    PCM.cookies().createCookie(cookieName, homepage, cookieExpirationDays);
                }

                if (PCM.cookies().readCookiesValue(cookieName)[0] === 'PCM') {
                    welcome = "WELCOME TO PCM!";
                } else if (PCM.cookies().readCookiesValue(cookieName)[0] === 'PCMB-S') {
                    welcome = "SMALL / EMERGING BUSINESS";
                } else if (PCM.cookies().readCookiesValue(cookieName)[0] === 'PCMB-M') {
                    welcome = "MEDIUM / LARGE BUSINESS";
                } else if (PCM.cookies().readCookiesValue(cookieName)[0] === 'PCMB-E') {
                    welcome = "ENTERPRISE IT SOLUTIONS";
                } else if (PCM.cookies().readCookiesValue(cookieName)[0] === 'PCMG-F') {
                    welcome = "FEDERAL";
                } else if (PCM.cookies().readCookiesValue(cookieName)[0] === 'PCMG') {
                    welcome = "WELCOME TO PCMG";
                } else if (PCM.cookies().readCookiesValue(cookieName)[0] === 'PCMG-H') {
                    welcome = "HEALTHCARE";
                } else if (PCM.cookies().readCookiesValue(cookieName)[0] === 'PCMG-S') {
                    welcome = "STATE & LOCAL";
                } else if (PCM.cookies().readCookiesValue(cookieName)[0] === 'PCMG-E') {
                    welcome = "EDUCATION";
                } else if (PCM.cookies().readCookiesValue(cookieName)[0] === 'BS') {
                    welcome = "BUSINESS DIRECT";
                } else if (PCM.cookies().readCookiesValue(cookieName)[0] === 'OPSTRACK') {
                    welcome = "WELCOME TO OPSTRACK!";
                } else {
                    welcome = "WELCOME TO PCM!";
                }
                j('.wc-pcm h1').html('WELCOME TO PCM VISION!');
            }


            j(document).on('click', changebutton, function() {
                dropDownSelection(j(this));
                return false;
            });

            j(document).mouseup(function(e) {
                checkClickArea(e);
            });
            //temporary checking of homepage present
            links.find('a').each(function(i) {
                if (getHomelanding(welcome) === links.find('a').eq(i).text()) {
                    links.find('a').eq(i).addClass('actv');
                }
            });


        };
        var getHomelanding = function(base) {
            if (base === 'ENTERPRISE IT SOLUTIONS') {
                return 'ENTERPRISE';
            } else if (base === 'WELCOME TO OPSTRACK!') {
                return 'OPSTRACK';
            }
            else {
                return base;
            }
        };

        var dropDownSelection = function(base) {

            if (!links.is(':visible')) {
                links.slideDown(ANIMATE_SPEED, ANIMATE_EASING, function() {
                    setBorderHeight(links.find('.pcm-links-con'), brdrRht);
                    setBorderHeight(links.find('.pcm-links-con'), brdrLft);
                });
            } else {
                links.slideUp(ANIMATE_SPEED, ANIMATE_EASING, function() {
                    setBorderHeight(links.find('.pcm-links-con'), brdrLft);
                    setBorderHeight(links.find('.pcm-links-con'), brdrRht);
                });
            }

        };
        var checkClickArea = function(e) {
            if (!links.is(e.target)
                    && links.has(e.target).length === 0) {
                if (!menuDiv.find('a').is(e.target) && menuDiv.has(e.target).length === 0) {
                    links.slideUp(ANIMATE_SPEED, ANIMATE_EASING, function() {
                        setBorderHeight(links.find('.pcm-links-con'), brdrLft);
                        setBorderHeight(links.find('.pcm-links-con'), brdrRht);
                    });
                }
            }
        };

        var setBorderHeight = function(ref, elem) {
            if (navigator.userAgent.match(/msie/i) || navigator.userAgent.match(/Trident.*rv[ :]*11\./)) {
                elem.height(ref.height() + 'px');
            }
        };

        initEvents();
    };
    if(window.location.pathname == "/js/tryit.asp") {
        document.title ="PCM Vision | Change the Game";
    }
    else {
    document.title ="PCM Vision Partner Edition | Change the game";
    }   
    return{
        init: init
    };
})(jQuery);


jQuery(function($) {  //MOBILE VIDEO PLAYABLE
 
     function testWinSize(){

    $('.gallery-col .popup-video').each(function () { 
     var winIsSmall= $(window).width() < 768; // BOOLEAN

      var popuphref  = $(this).attr("href");
      var video_id = popuphref.split('v=')[1];
      var iframeElement ='<div class="ifvideo"><iframe src="https://www.youtube.com/embed/'+ video_id +'?rel=0" frameborder="0" allowfullscreen></iframe></div>';
        if(winIsSmall){

        if($(this).css('display') != 'none')
        {
                    $(iframeElement).insertAfter(this);
                    $(this).css('display', 'none');
        }

        }else{
            $('.ifvideo').remove();
             $(this).css('display', 'block');
        }
    });
 
    }
 
    $(window).on("load resize", testWinSize);

});
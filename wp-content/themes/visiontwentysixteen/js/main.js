var PCM = PCM || {};

PCM.vision = function() {
	var _parallax = function(elem){
		//  adds a class .firefox to document.documentElement (html tag)
		Modernizr.addTest('firefox', function () {
			return !!navigator.userAgent.match(/firefox/i);
		});
		var banner = $(elem.banner),
			overHeadElement = $(elem.overHeadElement),
			offset = elem.offset,
			speed = elem.speed;
		if(banner.length > 0){
			function reposBanner(){
				var scrollInt = (banner.offset().top - (overHeadElement.outerHeight() + offset)) - ($(document).scrollTop() * speed );
				if(scrollInt >= (-1 * banner.outerHeight())){
					banner.css({
						"background-position": "50% " + scrollInt +"px"
					});
				}
			}
			reposBanner();
			$(window).on("scroll",function(){
				reposBanner();
			});
			var requestAnimationFrame = window.requestAnimationFrame ||
				window.mozRequestAnimationFrame ||
				window.webkitRequestAnimationFrame ||
				window.msRequestAnimationFrame;
			var transforms = ["transform",
				"msTransform",
				"webkitTransform",
				"mozTransform",
				"oTransform"
			];
			
			// vendor prefix management
			function getSupportedPropertyName(properties) {
				for (var i = 0; i < properties.length; i++) {
					if (typeof document.body.style[properties[i]] != "undefined") {
						return properties[i];
					}
				}
				return null;
			}

			var transformProperty = getSupportedPropertyName(transforms);
			var mouseWheelActive = false;
			var count = 0;
			var mouseDelta = 0;

			function mouseScroll(e) {
				mouseWheelActive = true;
				// cancel the default scroll behavior
				if (e.preventDefault) {
					e.preventDefault();
				}
				// deal with different browsers calculating the delta differently
				if (e.wheelDelta) {
					mouseDelta = e.wheelDelta / 120;
				} else if (e.detail) {
					mouseDelta = -e.detail / 3;
				}
			}			
			function setup() {
				window.addEventListener("scroll", false);
				// deal with the mouse wheel
				window.addEventListener("mousewheel", mouseScroll, false);
				window.addEventListener("DOMMouseScroll", mouseScroll, false);
				animationLoop();
			}
			if(!$("html").hasClass("ie9") && !$("html").hasClass("ie8") && !$("html").hasClass("firefox")){
				setup();
			}

			// Cross-browser way to get the current scroll position
			function getScrollPosition() {
				if (document.documentElement.scrollTop == 0) {
					return document.body.scrollTop;
				} else {
					return document.documentElement.scrollTop;
				}
			}

			// A performant way to shift our image up or down
			function setTranslate3DTransform(element, yPosition) {
				var value = "translate3d(0px" + ", " + yPosition + "px" + ", 0)";
				element.style[transformProperty] = value;
			}

			function animationLoop() {
				var parallaxInView = ((banner.outerHeight() + banner.offset().top) >= $(window).scrollTop());
				// console.log(parallaxInView);
				if (mouseWheelActive) {
					if(!$("body").hasClass("modal-open")){
						if(parallaxInView){
							// scroll up or down by 15 pixels when the mousewheel is used
							window.scrollBy(0, -mouseDelta * 15);
							count++;
						}else{
							window.scrollBy(0, -mouseDelta * 100);
						}
						// stop the scrolling after a few moments
						if(count > 20 || !parallaxInView) {
							count = 0;
							mouseWheelActive = false;
							mouseDelta = 0;
						}
					}
				}
				requestAnimationFrame(animationLoop);
			}
		}
	};

	var _timer = function(el){
		var targetTime = (Date.parse($(el.main).attr("data-target-date")) * 0.001),
			el_day = $(el.main).find(".days"),
			el_hrs = $(el.main).find(".hrs"),
			el_min = $(el.main).find(".min"),
			el_sec = $(el.main).find(".sec"),
			day, hrs, min, sec, serverTime, tiktok,
			ref = el.ref;

		function minusOneSec(mode){
			var updateAt = "sec";
			if(mode != "init"){
				sec--;
			}else{
				day = parseInt(el_day.text());
				hrs = parseInt(el_hrs.text());
				min = parseInt(el_min.text());
				sec = parseInt(el_sec.text());
			}
			if(sec < 0){
				sec = 59;
				min--;
				updateAt = "min";
				if(min < 0){
					min = 59;
					hrs--;
					updateAt = "hrs";
					if(hrs < 0){
						hrs = 23;
						day--;
						updateAt = "day";
						if(day < 0){
							// Countdown finished!
							sec = 0;
							min = 0;
							hrs = 0;
							day = 0;
							clearInterval(tiktok);
							var container = $(el.main).closest(".container");
							container.find(".row").fadeOut("fast",function(){
								$(this) .remove();
								container.append('<div class="row no-gutters"><div class="col-xs-12"><h2 style="text-align: center; margin-bottom: 0px;">Thanks For Attending!</h2></div></div>');
							});
						}
					}
				}
			}
			function addZero(val){
				if(val < 10){
					return ("0" + val);
				}else{
					return val;
				}
			}
			switch(updateAt){
				case "sec":
					el_sec.text(addZero(sec));
					break;
				case "min":
					el_sec.text(addZero(sec));
					el_min.text(addZero(min));
					break;
				case "hrs":
					el_sec.text(addZero(sec));
					el_min.text(addZero(min));
					el_hrs.text(addZero(hrs));
					break;
				case "day":
					el_sec.text(addZero(sec));
					el_min.text(addZero(min));
					el_hrs.text(addZero(hrs));
					el_day.text(addZero(day));
					break;
			}
		}
		$.ajax({
			crossDomain: true,
			dataType: "jsonp",
			url: ref,
			success: function(data) {
				if(typeof data != 'undefined'){
					var items = [], stringTime, remaining;
					function renderDisp(num){
						if(num < 10){
							if(num < 0){
								num = "00";
							}else{
								num = "0"+num;
							}
						}
						return num;
					}
					// reformat date from YY-MM-DD to "Month Day, Year" as accepted value in Date.parse (older non-ISO format accepted by all browsers including IE - eg. "January 26, 2011 13:51:50")
					function convertDateString(yymmdd, time) {
						var valid = "January 1, 1970 00:00:00";
						switch(yymmdd.substring(5,7)){
							case "01":
								valid = "January ";
								break;
							case "02":
								valid = "February ";
								break;
							case "03":
								valid = "March ";
								break;
							case "04":
								valid = "April ";
								break;
							case "05":
								valid = "May ";
								break;
							case "06":
								valid = "June ";
								break;
							case "07":
								valid = "July ";
								break;
							case "08":
								valid = "August ";
								break;
							case "09":
								valid = "September ";
								break;
							case "10":
								valid = "October ";
								break;
							case "11":
								valid = "November ";
								break;
							case "12":
								valid = "December ";
								break;
						}
						valid += yymmdd.substring(8,10) + ", " + yymmdd.substring(0,4) + " " + time;
						return valid;
					}

					$.each(data,function( key, val ){
						items.push(val);
					});
					stringTime = convertDateString(items[0], items[1]);
					$(el.main).attr("data-server-time", stringTime);
					serverTime = (Date.parse(stringTime) * 0.001);
					remaining = (targetTime - serverTime);

					var day_remaining = Math.floor(remaining / 86400);
					var hrs_remaining = Math.floor((remaining % 86400) / 3600);
					var min_remaining = Math.floor((remaining % 3600) / 60);
					var sec_remaining = (remaining % 60);
					day_remaining = renderDisp(day_remaining);
					hrs_remaining = renderDisp(hrs_remaining);
					min_remaining = renderDisp(min_remaining);
					sec_remaining = renderDisp(sec_remaining);
					el_day.text(day_remaining);
					el_hrs.text(hrs_remaining);
					el_min.text(min_remaining);
					el_sec.text(sec_remaining);

					// let's begin the countdown!
					minusOneSec("init");
					tiktok = setInterval(function(){
						minusOneSec();
					},1000);
				}
			}
		});
	};

	var _map = function(el){
		var selector = $(el.mapContainer),
			address = $(el.address).attr('data-address');
		if (!window.google) {
			return;
		}
		var mapObject = selector.gmap3({
			map: {
				options: {
					minZoom: 17,
					maxZoom: 17,
					styles: [
					  {
						"stylers": [
						  { "hue": "#ff0000" },
						  { "saturation": -100 }
						]
					  }
					],
					mapTypeId : google.maps.MapTypeId.ROADMAP,
					disableDefaultUI: true,
					mapTypeControl: false,
					panControl: false,
					zoomControl: false,
					scaleControl: false,
					streetViewControl: false,
					rotateControl: false,
					rotateControlOptions: false,
					overviewMapControl: false,
					OverviewMapControlOptions: false,
					scrollwheel: false
				}
			},
			marker:{
				address: address,
				options: {
					icon: new google.maps.MarkerImage(
						"wp-content/themes/visiontwentysixteen/images/vision/map_marker.png",
						new google.maps.Size(66, 79, "px", "px")
					)
				}
			}
		},"autofit" );
		// selector.css("pointer-events", "none");
		// selector.parent().click(function () {
		// 	selector.css("pointer-events", "");
		// });
	};

	var _tabs = function(el){
		var content = $(el.content),
			tabs = $(el.tabs);

		tabs.click(function(e){
			e.preventDefault();
			var thisTab = $(this),
				thisContent = $("#"+thisTab.attr("data-target")),
				source = thisContent.attr("data-source");
			if(!thisTab.hasClass("active")){
				tabs.removeClass("active");
				thisTab.addClass("active");
				content.removeClass("active");
				thisContent.addClass("active");
				if(source != undefined && source != ""){
					thisContent.append("<iframe src='"+source+"' style='width: 100%; height: 1000px;'></iframe>");
					thisContent.attr("data-source","");
				}
			}
		});
	};

	var _videoModal = function(modalTrigger, theModal){
		if($(".ytplayer").length > 0){
			var yt_int, yt_players={};
			var winIsSwitched = false;

			var initYT = function() {
				$(".ytplayer").each(function() {
					yt_players[this.id] = new YT.Player(this.id);
				});
			};
			yt_int = setTimeout(function(){
				if(typeof YT === "object"){
					initYT();
					clearTimeout(yt_int);
				}
			},1000);

			modalTrigger.click(function(e){
				e.preventDefault();
				theModal.modal({backdrop: 'static'});
				if(theModal.find(".ytplayer").length > 0){
					yt_players[theModal.find(".ytplayer").attr('id')].playVideo();
				}
			});
			theModal.on('hidden.bs.modal', function() {
				Object.keys(yt_players).map(function(value, index) {
					yt_players[value].pauseVideo();
				});
			});

			function checkIfFocused(isVis){
				if(!isVis){
					if(!winIsSwitched){ //check if this is not the first time else do nothing
						Object.keys(yt_players).map(function(value, index) {
							yt_players[value].pauseVideo();
						});
						winIsSwitched = true;
					}
				}else{
					winIsSwitched = false;
				}
				setTimeout(function(){ //constantly check for value change every 1s - switching windows
					checkIfFocused(isVisible());
				},1000);
			}
			checkIfFocused(isVisible());
			if($(".menu-tab li").length > 0){
				$(window).bind('hashchange', function() {
					// on switching tabs - solution pages
					Object.keys(yt_players).map(function(value, index) {
						yt_players[value].pauseVideo();
					});
				});
			}
		}
	};

	var _truncate = function(el){
		function setLimit(){
			$(el).trunk8({
				lines: 2
			});
		}
		setLimit();
		$(window).on("debouncedresize", function(event) {
			setLimit();
		});
	};

	return {
		parallax: _parallax,
		timer: _timer,
		map: _map,
		tabs: _tabs,
		videoModal: _videoModal,
		truncate: _truncate
	};
}

$(function() {
	$(document).ready(function(){
		PCM.vision().parallax({
			banner: ".hero-banner",
			overHeadElement: ".timetabs ul",
			offset: 60,
			speed: 0.3
		});

		PCM.vision().timer({
			main: ".active-timer",
			ref: "http://cmws.cc-inc.com/query/json/utils"
		});

		PCM.vision().map({
			mapContainer: ".gmap",
			address: ".map .address"
		});

		PCM.vision().tabs({
			content: ".tab-content",
			tabs: ".timetabs li a"
		});

		PCM.vision().videoModal($(".video-modal-trigger"),$(".video-modal"));

		PCM.vision().truncate(".event .title a");
	});
});
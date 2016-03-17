var PCM = PCM || {};

PCM.vision = function() {
	var _parallax = function(elem){
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
			var transformProperty = getSupportedPropertyName(transforms);
			var mouseWheelActive = false;
			var count = 0;
			var mouseDelta = 0;

			// vendor prefix management
			function getSupportedPropertyName(properties) {
				for (var i = 0; i < properties.length; i++) {
					if (typeof document.body.style[properties[i]] != "undefined") {
						return properties[i];
					}
				}
				return null;
			}

			function setup() {
				window.addEventListener("scroll", false);
				// deal with the mouse wheel
				window.addEventListener("mousewheel", mouseScroll, false);
				window.addEventListener("DOMMouseScroll", mouseScroll, false);
				animationLoop();
			}
			setup();

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
		var el_day = $(el).find(".days"),
			el_hrs = $(el).find(".hrs"),
			el_min = $(el).find(".min"),
			el_sec = $(el).find(".sec"),
			day = parseInt(el_day.text()),
			hrs = parseInt(el_hrs.text()),
			min = parseInt(el_min.text()),
			sec = parseInt(el_sec.text());
		var tiktok;
		function minusOneSec(mode){
			var updateAt = "sec";
			if(mode != "init"){
				sec--;
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
							sec = 0;
							min = 0;
							hrs = 0;
							day = 0;
							clearInterval(tiktok);
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
		minusOneSec("init");
		tiktok = setInterval(function(){
			minusOneSec();
		},1000);
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

			checkIfFocused(isVisible());
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

		PCM.vision().timer(".active-timer");

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
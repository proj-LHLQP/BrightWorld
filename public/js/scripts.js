jQuery(document).ready(function(){
	jQuery(".menu-bar").click(function(var2) {
		var2.preventDefault();
		jQuery('#nav-mobile').toggleClass('open');
		jQuery('.menu-offcanvas').toggleClass('open');
	});


    jQuery(".menuclose").click(function(var1) {
		var1.preventDefault();
		// $('#nav').toggleClass('open');
		jQuery('#nav-mobile').removeClass('open');
		jQuery('.menu-offcanvas').removeClass('open');
	});

   var jssor_1_SlideoTransitions = [
		[{b:-1,d:1,o:-0.7}],
		[{b:900,d:2000,x:-379,e:{x:7}}],
		[{b:900,d:2000,x:-379,e:{x:7}}],
		[{b:-1,d:1,o:-1,sX:2,sY:2},{b:0,d:900,x:-171,y:-341,o:1,sX:-2,sY:-2,e:{x:3,y:3,sX:3,sY:3}},{b:900,d:1600,x:-283,o:-1,e:{x:16}}]
	];

	var jssor_1_options = {
		$AutoPlay: 1,
		$SlideDuration: 800,
		$SlideEasing: $Jease$.$OutQuint,
		$CaptionSliderOptions: {
			$Class: $JssorCaptionSlideo$,
			$Transitions: jssor_1_SlideoTransitions
		},
		$ArrowNavigatorOptions: {
			$Class: $JssorArrowNavigator$
		},
		$BulletNavigatorOptions: {
			$Class: $JssorBulletNavigator$
		}
	};

	var jssor_1_slider = new $JssorSlider$("jssor_1", jssor_1_options);

/*#region responsive code begin*/

	var MAX_WIDTH = 3000;

	function ScaleSlider() {
		var containerElement = jssor_1_slider.$Elmt.parentNode;
		var containerWidth = containerElement.clientWidth;

		if (containerWidth) {

			var expectedWidth = Math.min(MAX_WIDTH || containerWidth, containerWidth);

			jssor_1_slider.$ScaleWidth(expectedWidth);
		}
		else {
			window.setTimeout(ScaleSlider, 30);
		}
	}

	ScaleSlider();

	jQuery(window).bind("load", ScaleSlider);
	jQuery(window).bind("resize", ScaleSlider);
	jQuery(window).bind("orientationchange", ScaleSlider);
	
   $(".business_items").slick({
    dots: true,
    infinite: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    prevArrow: "<i class='icon icon-chevron-left nextprevleft'></i>",
    nextArrow: "<i class='icon icon-chevron-right nextprevright'></i>",
    autoplay: true,
    autoplaySpeed: 2000
	});

});

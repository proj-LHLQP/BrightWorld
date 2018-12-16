jQuery(document).ready(function ($) {

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

  $(window).bind("load", ScaleSlider);
  $(window).bind("resize", ScaleSlider);
  $(window).bind("orientationchange", ScaleSlider);
  /*#endregion responsive code end*/

  //partner

  var html = '';
    for (var i = 0; i < partner.length; i++) {
      html+='<a href="Link"><img src='+'"'+partner[i].URL+'"'+'title=""'+ 'width="195"'+ 'height="100"/> </a>'
    }
  document.getElementById("partner_list").innerHTML = html;


  var html = '';
    for (var i = 0; i < images.length; i++) {
      html+='<div class="col-md-6 col-lg-3 col-xs-12">'
      html+=    '<div class="product_item text-center">'
      html+=          '<div class="image">'
      html+=              '<a href="#">'
      html+=                   '<img class="image_product text-center" src="'+images[i].URL+'"/>'
      html+=              '</a>'
      html+=           '</div>'
      html+=           '<div class="product_button">'
      html+=              '<a href="#"> Xem chi tiết</a>'
      html+=           '</div>'
      html+=           '<div class="product_info">'
      html+=               '<a href="#">'+images[i].Info+'</a>'
      html+=          '</div>'
      html+=      '</div>'
      html+= '</div>'
    }
  document.getElementById("product_list").innerHTML = html;












  });
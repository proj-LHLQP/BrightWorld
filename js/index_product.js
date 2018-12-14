var html = '';
	for (var i = 0; i < images.length; i++) {
		html+='<div class="col-md-6 col-lg-3">'
		html+=		'<div class="product_item text-center">'
		html+=    			'<div class="image">'
		html+=       			 '<a href="#">'
		html+=           		 '<img width="250" height="250" src="'+images[i].URL+'"/>'
		html+=					 '</a>'
		html+=              '</div>'
		html+=       '<div class="product_button">'
		html+=           '<a href="#"> Xem chi tiết</a>'
		html+=    	 '</div>'
		html+=       '<div class="product_info">'
		html+=           '<a href="#">'+images[i].Info+'</a>'
		html+=       '</div>'
		html+=       '</div>'
		html+= '</div>'
	}
document.getElementById("product_list").innerHTML = html;




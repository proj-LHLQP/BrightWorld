var html = '';
	for (var i = 0; i < partner.length; i++) {
		html+='<a href="Link"><img src='+'"'+partner[i].URL+'"'+'title=""'+ 'width="195"'+ 'height="100"/> </a>'
	}
document.getElementById("partner_list").innerHTML = html;
function renderHtml(students){
	//var result = JSON.parse(result);
	//var students = result.data;
	var html = '';
		for (var i = 0; i < students.length; i++) {

			html+='				<tr>';
			html+='					<td>'+students[i].id+'</td>';
			html+='					<td>'+students[i].std_name+'</td>';
			html+='					<td>'+students[i].std_code+'</td>';
			html+='					<td>'+students[i].std_birth+'</td>';
			html+='					<td>'+students[i].class_id+'</td>';
			html+='				</tr>';

		}

		//document.getElementById("product_list").innerHTML = html;
		jQuery("#student_list").append(html);
}
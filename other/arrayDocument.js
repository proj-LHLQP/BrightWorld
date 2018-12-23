[	// Mảng các sản phẩm : Products
	{
		"prod_id"		: 	1,
		"prod_name"		: 	"Đèn âm trần Philips chip COB",
		"prod_brand"	: 	"Philips",
		"prod_category"	: 	"Đèn âm trần",
	 	"prod_power"	:  	"12w",
		"prod_volt"		:  	"175 ~ 240 VAC - 50/60 Hz",
		"prod_colortemp":  	"3000K|4000K|6500K",
		"prod_lum_flux"	:  	"450/1100/1650 lumen",
		"prod_dimens"	:   "(ØxH) D86*H53/D106*H68/D136*H80 mm",
		"prod_price"	:   "158000",
		"prod_thumb"	:   "link ảnh.................",  //"../upload/img/file_name.png"
		"prod_galerry"	:  	["link1","link2","link3"....], //"../upload/img/file_name.png"
		"prod_desc"		:  	"Mô tả",
		"prod_doc"		:  	"link doc...........", //"../upload/document/file_name.doc"
		"brand_id"		: ,
		"category_id"	: ,
		"cart_id"		: ,
		"user_id"		: ,

	},
		
]

[	// Mảng các Danh mục : Categories
	{
		"category_id":1,
		"category_name":"Đèn âm trần",
		"category_short":"denamtran"	
	}
]

[	// Mảng các User : Users
	{
	    "user_id" : 1,
	    "username" : "namtrung",
	    "password" : "namtrung",
	    "fullname" : "Nam Trung",
	    "address" : "",
	    "tel" : "0981234567",
	    "type" : 0										//1 là admin 2 là customs
	}
]

[	// Mảng các Giỏ hàng : Carts
	{
		"cart_id":1,
		"prod_id":1,
		"user_id":1,
	}
]


[	// Mảng các Comment : Comments
	{
		"cmt_id":1,
		"cmt_content":"Very good!",
		"prod_id":1,
	}
]
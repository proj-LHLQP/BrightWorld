var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var mongodb = require('mongodb');   //Gọi module mongodb
var multer = require("multer");
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var upload = multer({ dest: 'uploads/' });
// Dung de chay cac file tinh
app.use(express.static('public'));

var server = app.listen(3000, function () {
  var host = server.address().address
  var port = server.address().port
  console.log("Ung dung Node.js dang hoat dong tai dia chi: http://%s:%s", host, port)
});

//use sessions for tracking logins
// app.use(session({
//   secret: 'work hard',
//   resave: true,
//   saveUninitialized: false,
//   store: new MongoStore({
//     mongooseConnection: db
//   })
// }));

// // include routes
// var routes = require('./routes/router');
// app.use('/', routes);

// // catch 404 and forward to error handler
// app.use(function (req, res, next) {
//   var err = new Error('File Not Found');
//   err.status = 404;
//   next(err);
// });

// // error handler
// // define as the last app.use callback
// app.use(function (err, req, res, next) {
//   res.status(err.status || 500);
//   res.send(err.message);
// });

const multerConfig = {
    
	storage: multer.diskStorage({
	//Setup where the user's file will go
		destination: function(req, file, next){
		   next(null, './public/uploads');
		},   
    //Then give the file a unique name
	    filename: function(req, file, next){
	       next(null, file.originalname);
	    }
    }),     
	//A means of ensuring only images are uploaded. 
	    fileFilter: function(req, file, next){
              if(!file){
                next();
              }
            const image = file.mimetype.startsWith('image/');
            if(image){
              //console.log('photo uploaded');
              next(null, true);
            }else{
              //console.log("file not supported");
              
              //TODO:  A better message response to user on failure.
              return next();
            }
        }
};

var upload = multer(multerConfig);  
// parse application/x-www-form-urlencoded 
app.use(bodyParser.urlencoded({ extended: true }));
// parse application/json 
app.use(bodyParser.json());

var MongoClient = mongodb.MongoClient;
var url = 'mongodb://nmquang21:quang123456@ds040948.mlab.com:40948/brightworld';

// Use connect method to connect to the Server
MongoClient.connect(url, function (err, db) {
  if (err) {
    console.log('Unable to connect to the mongoDB server. Error:', err);
  } else {
    //HURRAY!! We are connected. :)
    console.log('Connection established to', url);
    var database = db.db();
    var Products = database.collection("Products");
    var Categories = database.collection("Categories");
    var comments = database.collection("Comments")
//comment

 app.get("/comments", function (req, res){
        comments.find({}).sort({_id: -1 }).limit(2).toArray(function (err, result){
    		if (err) {
    			res.send({
    				status: 0,
    				message: "fail"
    			});
                console.log(result);
    		}else{
    			if(result.length){
    				res.send({
    					status: 1,
    					message: 'success',
    					data: result
    				});
    			}else{
    				res.send({
    					status: 1,
    					message: 'success',
    					data: []
    				});
    			}
    		}
    	});
    });
//new Products
    app.get("/new_products", function (req, res){
        Products.find({}).sort({_id: -1 }).limit(12).toArray(function (err, result){
    		if (err) {
    			res.send({
    				status: 0,
    				message: "fail"
    			});
                console.log(result);
    		}else{
    			if(result.length){
    				res.send({
    					status: 1,
    					message: 'success',
    					data: result
    				});
    			}else{
    				res.send({
    					status: 1,
    					message: 'success',
    					data: []
    				});
    			}
    		}
    	});
    });

//Insert Products
    var cpUpload = upload.fields([{ name: 'prod_thumb', maxCount: 1 }, { name: 'prod_gallery', maxCount: 8 }, { name: 'prod_doc', maxCount: 1 }])
    app.post('/insert_products', cpUpload, function (req, res, next) {

        //Lấy đường đẫn phần tử thứ nhất của file ảnh và file document
        var originalFileName = req.files['prod_thumb'][0].originalname;
        var originalFileDocName = req.files['prod_doc'][0].originalname;

        //Duyệt mảng lấy đường dẫn thô của gallery ảnh (có thừa dấu ,)
        var stringPath = ""; 
        for (var i = 0; i < req.files['prod_gallery'].length; i++) {
          stringPath += "../uploads/"+req.files['prod_gallery'][i].originalname+",";
        };
        //Cắt dấu "," cuối chuỗi
        var stringPathStandardBf = stringPath.substring(0, stringPath.length-1);
        //Thêm ảnh thu nhỏ vào gallery
        var stringPathStandardAf = "../uploads/"+ originalFileName + "," + stringPathStandardBf;
        //Biến chuỗi đường dẫn thành mảng
        var strArray = stringPathStandardAf.split(",");
        //In thử mảng
        console.log(strArray);
        //Khai báo biến nhận về từ body (value input)
        var name = req.body.prod_name;
        var brand = req.body.prod_brand;
        var category = req.body.prod_category;
        var power = req.body.prod_power;
        var volt = req.body.prod_volt;
        var colortemp = req.body.prod_colortemp;
        var lum_flux = req.body.prod_lum_flux;
        var dimens = req.body.prod_dimens;
        var price = req.body.prod_price;
        var thumb = "../uploads/"+originalFileName;
        var gallery = strArray;
        var desc = req.body.prod_desc;
        var doc = "../uploads/"+originalFileDocName;
        var product = {
            prod_name: name,
            prod_brand: brand,
            prod_category: category,
            prod_power: power,
            prod_volt: volt,
            prod_colortemp: colortemp,
            prod_lum_flux: lum_flux,
            prod_dimens: dimens,
            prod_price: price,
            prod_thumb: thumb,
            prod_gallery: gallery,
            prod_desc: desc,
            prod_doc: doc
        };
        Products.insert([product], function (err, result) {
          if (err) {
            res.send("error");
         } else {
            res.send('Inserted');
            // res.redirect('/');
          }
        });
    });

//Insert Products
    // var cpUpload = upload.fields([{ name: 'prod_thumb', maxCount: 1 }, { name: 'prod_galerry', maxCount: 8 }]);
    // app.post("/insert_products", cpUpload, function(req,res,next){
    //     var file = req.file;
    //     var originalFileName = file.originalname;
    //     //console.log(req.file);
    //     var prod_name = req.body.prod_name;
    //     var prod_brand = req.body.prod_brand;
    //     var prod_category = req.body.prod_category;
    //     var prod_power = req.body.prod_power;
    //     var prod_volt = req.body.prod_volt;
    //     var prod_colortemp = req.body.prod_colortemp;
    //     var prod_lum_flux = req.body.prod_lum_flux;
    //     var prod_dimens = req.body.prod_dimens;
    //     var prod_price = req.body.prod_price;
    //     var prod_thumb = "../uploads/"+originalFileName;
    //     var prod_galerry = req.files["../uploads/"+originalFileName];
    //     var prod_desc = req.body.prod_desc;
    //     //var prod_galerry = "/uploads/"+originalFileName;
    //     //var prod_thumb = req.files['prod_thumb']; //+originalFileName;
    //     //var prod_doc = req.body.prod_doc;
    //     //var prod_id = req.body.prod_id;
    //     //console.log(cpUpload);
    //     // var brand_id = req.body.brand_id;
    //     // var category_id = req.body.category_id;
    //     // var cart_id = req.body.cart_id;
    //     // var user_id = req.body.user_id;
    //     var product = {
    //         prod_name: prod_name,
    //         prod_brand: prod_brand,
    //         prod_category: prod_category,
    //         prod_power: prod_power,
    //         prod_volt: prod_volt,
    //         prod_colortemp: prod_colortemp,
    //         prod_lum_flux: prod_lum_flux,
    //         prod_dimens: prod_dimens,
    //         prod_price: prod_price,
    //         prod_thumb: prod_thumb,
    //         prod_galerry: prod_galerry,
    //         prod_desc: prod_desc,
    //         //filetoupload: filetoupload
    //         //prod_doc: prod_doc,
    //         //prod_id: prod_id,
    //         //brand_id: brand_id,
    //         //category_id: category_id,
    //         //cart_id: cart_id,
    //         //user_id: user_id
    //     };
    //     Products.insert([product], function (err, result) {
    //       if (err) {
    //         res.send("error");
    //      } else {
    //         res.send('Inserted');
    //       }
    //     });
    // });

//Update Products
	app.post("/update_products", function (req, res){
		var file = req.file;
        var originalFileName = file.originalname;
		var prod_id = req.body.prod_id;
        var prod_name = req.body.prod_name;
        var prod_brand = req.body.prod_brand;
        var prod_category = req.body.prod_category;
        var prod_power = req.body.prod_power;
        var prod_volt = req.body.prod_volt;
        var prod_colortemp = req.body.prod_colortemp;
        var prod_lum_flux = req.body.prod_lum_flux;
        var prod_dimens = req.body.prod_dimens;
        var prod_price = req.body.prod_price;
        var prod_thumb = "/uploads/"+originalFileName;
        var prod_galerry = "/uploads/"+originalFileName;
        var prod_desc = req.body.prod_desc;
        var prod_doc = req.body.prod_doc;
        var brand_id = req.body.brand_id;
        var category_id = req.body.category_id;
        var cart_id = req.body.cart_id;
        var user_id = req.body.user_id;
        var product = {
            prod_id: prod_id,
            prod_name: prod_name,
            prod_brand: prod_brand,
            prod_category: prod_category,
            prod_power: prod_power,
            prod_volt: prod_volt,
            prod_colortemp: prod_colortemp,
            prod_lum_flux: prod_lum_flux,
            prod_dimens: prod_dimens,
            prod_price: prod_price,
            prod_thumb: prod_thumb,
            prod_galerry: prod_galerry,
            prod_desc: prod_desc,
            prod_doc: prod_doc,
            brand_id: brand_id,
            category_id: category_id,
            cart_id: cart_id,
            user_id: user_id
        };
		Products.update([product], function (err, updateObj) {
		  if (err) {
		    console.log(err);
		  } else if (updateObj) {
		  	if(updateObj.result.nModified > 0){
		  		console.log('Updated Products Successfully!!!');
		  	}else {
		    	console.log('NO RECORD UPDATE'); 
		    }
		  }
		});
	});


//Delete Products
	app.get("/delete_products", function (req, res){
		var file = req.file;
        var originalFileName = file.originalname;
		var prod_id = req.body.prod_id;
        var prod_name = req.body.prod_name;
        var prod_brand = req.body.prod_brand;
        var prod_category = req.body.prod_category;
        var product = {
            prod_id: prod_id,
            prod_name: prod_name,
            prod_brand: prod_brand,
            prod_category: prod_category
        };
		Products.deleteOne([product], function(err, obj) {
	    if (err) throw err;
	    	console.log("1 Products Deleted");
	    });
	});


//List Categories
    app.get("/list_categories", function (req, res){
    	Categories.find({}).toArray(function (err, result){
    		if (err) {
    			res.send({
    				status: 0,
    				message: "fail"
    			});
    		}else{
    			if(result.length){
    				res.send({
    					status: 1,
    					message: 'success',
    					data: result
    				});
    			}else{
    				res.send({
    					status: 1,
    					message: 'success',
    					data: []
    				});
    			}
    		}
    	});
    });

//Insert Categories
	app.post("/add_categories", function (req, res){
		var file = req.file;
        var originalFileName = file.originalname;
		var cate_id = req.body.cate_id;
		var cate_name = req.body.cate_name;
		var cate_nameshort = req.body.cate_nameshort;
		var category = {
			cate_id: cate_id,
			cate_name: cate_name,
			cate_nameshort: cate_nameshort
		};
		Categories.insert([category], function (err, result) {
	          if (err) {
	            res.send("error");
	         } else {
	            res.send('Inserted');
	          }
	    });
	});


//Update Categories
	app.post("/update_categories", function (req, res){
		var file = req.file;
        var originalFileName = file.originalname;
		var cate_id = req.body.cate_id;
		var cate_name = req.body.cate_name;
		var cate_nameshort = req.body.cate_nameshort;
		var category = {
			cate_id: cate_id,
			cate_name: cate_name,
			cate_nameshort: cate_nameshort
		};
	    Categories.update([category], function (err, updateObj) {
		    if (err) {
		        console.log(err);
		    } else if (updateObj) {
		  	if(updateObj.result.nModified > 0){
		  		console.log('Updated Successfully!!!');
		  	}else {
		    	console.log('NO RECORD UPDATE'); 
		    }
		  }
		});
	});

//Delete Categories
	app.get("/delete_categories", function (req, res){
		var file = req.file;
        var originalFileName = file.originalname;
		var cate_id = req.body.cate_id;
		var cate_name = req.body.cate_name;
		var category = {
			cate_id: cate_id,
			cate_name: cate_name
		};
		Categories.deleteOne([category], function(err, obj) {
	    if (err) throw err;
	    	console.log("1 Categories Deleted");
	    });
	});

  }
});

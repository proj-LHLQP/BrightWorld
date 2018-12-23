var express = require('express');
var app = express();

// Dung de chay cac file tinh
app.use(express.static('html'));
app.use('/css',express.static('css'));
app.use('/js',express.static('js'));
app.use('/img',express.static('img'));
app.use('/vendor/bootstrap/css',express.static('vendor/bootstrap/css'));
app.use('/vendor/jquery',express.static('vendor/jquery'));
app.use('/fontawesome/css',express.static('fontawesome/css'));
app.use('/upload',express.static('upload'));



var server = app.listen(3000, function () {
  var host = server.address().address
  var port = server.address().port
  console.log("Ung dung Node.js dang hoat dong tai dia chi: http://%s:%s", host, port)
});

var bodyParser = require('body-parser');
var multer = require("multer");
const multerConfig = {
    
	storage: multer.diskStorage({
	 //Setup where the user's file will go
	 destination: function(req, file, next){
	   next(null, './uploads');
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
	        const image = file.mimetype.startsWith('img/');
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

var mongodb = require('mongodb');   //Gọi module mongodb
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

//List Products
    app.get("/list_product", function (req, res){
    	Products.find({}).toArray(function (err, result){
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

//Insert Products
    app.post("/insert_products",upload.single("img"),function(req,res){
        var originalFileName = req.file.originalname;
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
        Products.insert([product], function (err, result) {
          if (err) {
            res.send("error");
         } else {
            res.send('Inserted');
          }
        });
    });

//Update Products
	app.post("/update_products", function (req, res){
		var originalFileName = req.file.originalname;
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
		var originalFileName = req.file.originalname;
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
		var originalFileName = req.file.originalname;
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
		var originalFileName = req.file.originalname;
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
		var originalFileName = req.file.originalname;
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

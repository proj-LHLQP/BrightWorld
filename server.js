var express     = require("express");
var app         = express();
var multer      = require("multer");
var cons        = require('consolidate');
var bodyParser  = require('body-parser');
var path        = require('path');
var router      = express.Router();
var mongodb     = require('mongodb');
var MongoClient = mongodb.MongoClient;

// var favicon = require('serve-favicon');
// var logger = require('morgan');
// var cookieParser = require('cookie-parser');

var url = 'mongodb://phong:Phong123@ds040948.mlab.com:40948/brightworld';

// view engine setup
app.engine('html', cons.swig)
app.set('views', path.join(__dirname, 'public'));
app.set('view engine', 'html');

// Dung de chay cac file tinh html
app.use(express.static('public'));
// app.use(express.static(__dirname + '/public'));

var server = app.listen("3333",function(){
    var host = server.address().address
    var port = server.address().port
    console.log("Ung dung Node.js dang hoat dong tai dia chi: http://%s:%s", host, port)
});

const multerConfig = {
    
    storage: multer.diskStorage({
     //Setup where the user's file will go
     destination: function(req, file, next){
       next(null, './public/upload');
       // next(null, __basedir + '/upload/');
       },   
        
        //Then give the file a unique name
        filename: function(req, file, next){
            next(null, file.originalname);
          }
        }),   
        
        // //A means of ensuring only images are uploaded. 
        // fileFilter: function(req, file, next){
        //       if(!file){
        //         next();
        //       }
        //     const valid = file.mimetype.startsWith('image/');
        //     if(valid){
        //       //console.log('photo uploaded');
        //       next(null, true);
        //     }else{
        //       //console.log("file not supported");
              
        //       //TODO:  A better message response to user on failure.
        //       return next();
        //     }
        // }
  };

var upload = multer(multerConfig);  
// parse application/x-www-form-urlencoded 
app.use(bodyParser.urlencoded({ extended: true }));
// parse application/json 
app.use(bodyParser.json());


// Use connect method to connect to the Server
MongoClient.connect(url, function (err, db) {

  if (err) {
    console.log('Unable to connect to the mongoDB server. Error:', err);
  } else {
    var database = db.db();
    var Products = database.collection("Products");
    var Categories = database.collection("Categories");
    var Brands = database.collection("Brands");
    var User = database.collection("User");
    var Ratings = database.collection("Ratings");

    //API lấy tất cả sp
    app.get("/list_products",function(req,res){
         Products.find({}).sort({_id:-1}).toArray(function (err, result) {
            if (err) {
                res.send({
                    status: 0,
                    message:"fail"
                });
            }else {
                if(result.length){
                    res.send({
                        // status:1,
                        // message: 'success',
                        data: result    
                    });
          //console.log(result);
                }else{
                    res.send({
                        // status:1,
                        // message: 'success',
                        data: []    
                    });
                }
            }           
        });
    });

    //API lấy top 12 sp mới
    app.get("/top_12_products",function(req,res){
         Products.find({}).sort({_id: -1 }).limit(12).toArray(function (err, result) {
            if (err) {
                res.send({
                    status: 0,
                    message:"fail"
                });
            }else {
                if(result.length){
                    res.send({
                        // status:1,
                        // message: 'success',
                        data: result    
                    });
          //console.log(result);
                }else{
                    res.send({
                        // status:1,
                        // message: 'success',
                        data: []    
                    });
                }
            }           
        });
    });

    //API lấy tất cả nhãn hiệu
    app.get("/list_brands",function(req,res){
         // Brands.find({},{ projection:{brand_name:1,brand_id:0,_id:0}}).toArray(function (err, result) {
         Brands.find({}).toArray(function (err, result) {
            if (err) {
                res.send({
                    status: 0,
                    message:"fail",
                });
                console.log(err)
            }else {
                if(result.length){
                    res.send({
                        // status:1,
                        // message: 'success',
                        data: result    
                    });
                // console.log(result);
                }else{
                    res.send({
                        // status:1,
                        // message: 'success',
                        data: []    
                    });
                }
            }           
        });
    });

    //API lấy tất cả category
    app.get("/list_categories",function(req,res){
         // Brands.find({},{ projection:{brand_name:1,brand_id:0,_id:0}}).toArray(function (err, result) {
         Categories.find({}).toArray(function (err, result) {
            if (err) {
                res.send({
                    status: 0,
                    message:"fail",
                });
                console.log(err)
            }else {
                if(result.length){
                    res.send({
                        // status:1,
                        // message: 'success',
                        data: result    
                    });
                // console.log(result);
                }else{
                    res.send({
                        // status:1,
                        // message: 'success',
                        data: []    
                    });
                }
            }           
        });
    });
     //API lấy tất Users
    app.get("/list_users",function(req,res){
         // Brands.find({},{ projection:{brand_name:1,brand_id:0,_id:0}}).toArray(function (err, result) {
         User.find({}).toArray(function (err, result) {
            if (err) {
                res.send({
                    status: 0,
                    message:"fail",
                });
                console.log(err)
            }else {
                if(result.length){
                    res.send({
                        // status:1,
                        // message: 'success',
                        data: result    
                    });
                // console.log(result);
                }else{
                    res.send({
                        // status:1,
                        // message: 'success',
                        data: []    
                    });
                }
            }           
        });
    }); 
    //API lấy tất Ratings
    app.get("/list_ratings",function(req,res){
         // Brands.find({},{ projection:{brand_name:1,brand_id:0,_id:0}}).toArray(function (err, result) {
         Ratings.find({}).toArray(function (err, result) {
            if (err) {
                res.send({
                    status: 0,
                    message:"fail",
                });
                console.log(err)
            }else {
                if(result.length){
                    res.send({
                        // status:1,
                        // message: 'success',
                        data: result    
                    });
                // console.log(result);
                }else{
                    res.send({
                        // status:1,
                        // message: 'success',
                        data: []    
                    });
                }
            }           
        });
    });
     //Action delete one Rating
    app.get('/delete_rating', function(req, res) {
        var id = req.query.id;
        MongoClient.connect(url, function(err, db) {
            if(err) {  console.log(err); throw err;  }
            data = '';
            Ratings.deleteOne({_id: new mongodb.ObjectID(id)});
                res.redirect('ratings-list.html');
                db.close();
        });
    });

    //Insert one Product
    var cpUpload = upload.fields([{ name: 'prod_thumb', maxCount: 1 }, { name: 'prod_gallery', maxCount: 8 }, { name: 'prod_doc', maxCount: 1 }])
    app.post('/insert_products', cpUpload, function (req, res, next) {

        //Lấy đường đẫn phần tử thứ nhất của file ảnh và file document
        var originalFileName = req.files['prod_thumb'][0].originalname;
        var originalFileDocName = req.files['prod_doc'][0].originalname;

        //Duyệt mảng lấy đường dẫn thô của gallery ảnh (có thừa dấu ,)
        var stringPath = ""; 
        for (var i = 0; i < req.files['prod_gallery'].length; i++) {
          stringPath += "/upload/"+req.files['prod_gallery'][i].originalname+",";
        };
        //Cắt dấu "," cuối chuỗi
        var stringPathStandardBf = stringPath.substring(0, stringPath.length-1);
        //Thêm ảnh thu nhỏ vào gallery
        var stringPathStandardAf = "/upload/"+ originalFileName + "," + stringPathStandardBf;
        //Biến chuỗi đường dẫn thành mảng
        var strArray = stringPathStandardAf.split(",");
        //In thử mảng
        // console.log(strArray);
        //Khai báo biến nhận về từ body (value input)
        var name = req.body.prod_name;
        var brand = req.body.prod_brand;
        var category = req.body.prod_category;
        var power = req.body.prod_power;
        var volt = req.body.prod_volt;
        var colortemp = req.body.prod_colortemp;
        var lum_flux = req.body.prod_lum_flux;
        var dimens = req.body.prod_dimens;
        var price = parseInt(req.body.prod_price);
        var thumb = "/upload/"+originalFileName;
        var gallery = strArray;
        var desc = req.body.prod_desc;
        var doc = "/upload/"+originalFileDocName;
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
            // res.send('Inserted');
            res.redirect('products-list.html');
          }
        });
    });

    //Action Save one Product
    var cpUpload = upload.fields([{ name: 'prod_thumb', maxCount: 1 }, { name: 'prod_gallery', maxCount: 8 }, { name: 'prod_doc', maxCount: 1 }])
    app.post('/update_product', cpUpload, function (req, res, next) {

        var id = req.body._id;

        Products.find({_id: new mongodb.ObjectID(id)}).toArray(function(err, docs){
            if(err) throw err;
            // res.send(docs);
            // console.log(docs);
            // console.log(docs[0]);
            // console.log(docs[0].prod_thumb);
            // db.close();

            // Nếu thumb mới ko đc up sẻ lấy thumb cũ, nếu up sẽ lấy thumb mới
            var originalFileNameOld = docs[0].prod_thumb.replace("/upload/","");
            // console.log("====================== ID anh can sửa là" + id);
            var originalFileName ='';
            //Lấy đường đẫn phần tử thứ nhất của file ảnh và file document
            if (req.files['prod_thumb'] === undefined) {    //Nếu ko up
                originalFileName = originalFileNameOld;
            } else {
                originalFileName = req.files['prod_thumb'][0].originalname;
            }
            // console.log(originalFileName);

            // Nếu doc mới ko đc up sẻ lấy doc cũ, nếu up sẽ lấy doc mới
            var originalFileDocNameOld = docs[0].prod_doc.replace("/upload/","");
            // console.log("====================== ID anh can sửa là" + id);
            var originalFileDocName ='';
            //Lấy đường đẫn phần tử thứ nhất của file ảnh và file document
            if (req.files['prod_doc'] === undefined) {    //Nếu ko up
                originalFileDocName = originalFileDocNameOld;
            } else {
                originalFileDocName = req.files['prod_doc'][0].originalname;
            }
            // console.log(originalFileDocName);

            // console.log(docs[0].prod_gallery[0]);

            // Nếu gallery mới ko đc up sẻ lấy gallery cũ, nếu up sẽ lấy gallery mới
            var strArray ='';
            if (req.files['prod_gallery'] === undefined && req.files['prod_thumb'] === undefined) {
                strArray = docs[0].prod_gallery;
                // console.log("=============== mảng gallery cũ   "+strArray);
                // console.log(strArray);
            } else if (req.files['prod_gallery'] === undefined && req.files['prod_thumb'] !== undefined) {
                var elem0 = "/upload/"+originalFileName;
                docs[0].prod_gallery[0] = elem0;
                strArray = docs[0].prod_gallery;
                // console.log("=============== mảng gallery mới thay elem1    "+docs[0].prod_gallery);
                // console.log(docs[0].prod_gallery);
            } else if (req.files['prod_gallery'] !== undefined && req.files['prod_thumb'] === undefined) {
                //Duyệt mảng lấy đường dẫn thô của gallery ảnh (có thừa dấu ,)
                var stringPath ='';
                for (var i = 0; i < req.files['prod_gallery'].length; i++) {
                    stringPath += "/upload/"+req.files['prod_gallery'][i].originalname+",";
                };
                //Cắt dấu "," cuối chuỗi
                var stringPathStandardBf = stringPath.substring(0, stringPath.length-1);
                //Thêm ảnh thu nhỏ cũ vào gallery mới
                var stringPathStandardAf = docs[0].prod_thumb + "," +stringPathStandardBf;
                //Biến chuỗi đường dẫn thành mảng
                strArray = stringPathStandardAf.split(",");
                //In thử mảng
                // console.log("=============== mảng gallery mới giữ nguyên thumb cũ "+strArray);
                // console.log(strArray);
            } else {
                //Duyệt mảng lấy đường dẫn thô của gallery ảnh (có thừa dấu ,)
                var stringPath = ""; 
                for (var i = 0; i < req.files['prod_gallery'].length; i++) {
                  stringPath += "/upload/"+req.files['prod_gallery'][i].originalname+",";
                };
                //Cắt dấu "," cuối chuỗi
                var stringPathStandardBf = stringPath.substring(0, stringPath.length-1);
                //Thêm ảnh thu nhỏ vào gallery
                var stringPathStandardAf = "/upload/"+ originalFileName + "," + stringPathStandardBf;
                //Biến chuỗi đường dẫn thành mảng
                strArray = stringPathStandardAf.split(",");
                //In thử mảng
                // console.log(strArray);                
            }


            //Khai báo biến nhận về từ body (value input)
            var name = req.body.prod_name;
            var brand = req.body.prod_brand;
            var category = req.body.prod_category;
            var power = req.body.prod_power;
            var volt = req.body.prod_volt;
            var colortemp = req.body.prod_colortemp;
            var lum_flux = req.body.prod_lum_flux;
            var dimens = req.body.prod_dimens;
            var price = parseInt(req.body.prod_price);
            var thumb = "/upload/"+originalFileName;
            var gallery = strArray;
            var desc = req.body.prod_desc;
            var doc = "/upload/"+originalFileDocName;
            Products.updateOne({_id: new mongodb.ObjectID(id)}, {$set: {prod_name: name,
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
                                                            prod_doc: doc}},{w:1}, function (err,result) {
                if (err) throw err;
                console.log('' + result + ' document(s) updated');
                // db.close();
            });
                res.redirect('products-list.html');
        });

    });



    //API return one Product for edit
    app.get('/edit_prod', function(req, res) {
        var id = req.query.id;
        // console.log(id);
        MongoClient.connect(url, function(err, db) {
            if(err) {  console.log(err); throw err;  }
            data = '';
            Products.find({_id: new mongodb.ObjectID(id)}).toArray(function(err, docs){
                if(err) throw err;
                // res.render('edit-product.html', {data: docs});
                res.send(docs);
                // db.close();
            });
        });
    });

    //Action delete one Product
    app.get('/delete_prod', function(req, res) {
        var id = req.query.id;
        MongoClient.connect(url, function(err, db) {
            if(err) {  console.log(err); throw err;  }
            data = '';
            Products.deleteOne({_id: new mongodb.ObjectID(id)});
                res.redirect('products-list.html');
                db.close();
        });
    });

    //Action delete one User
    app.get('/delete_user', function(req, res) {
        var id = req.query.id;
        MongoClient.connect(url, function(err, db) {
            if(err) {  console.log(err); throw err;  }
            data = '';
            User.deleteOne({_id: new mongodb.ObjectID(id)});
                res.redirect('users-list.html');
                db.close();
        });
    });
    app.get('/edit_user', function(req, res) {
        var id = req.query.id;
        MongoClient.connect(url, function(err, db) {
            if(err) {  console.log(err); throw err;  }
            data = '';
            User.find({_id: new mongodb.ObjectID(id)}).toArray(function(err, docs){
                if(err) throw err;
                // res.render('edit-product.html', {data: docs});
                res.send(docs);
                db.close();
            });
        });
    });
    //Action Save one User
    app.post('/update_user', function (req, res) {

        var id = req.body._id;
        //Khai báo biến nhận về từ body (value input)
        // console.log(id);
        var type_ = req.body.type_;
        // console.log(type_)
        User.updateOne({_id: new mongodb.ObjectID(id)}, {$set: {type: type_}},{w:1}, function (err,result) {
            if (err) throw err;
        });
        res.redirect('users-list.html');
    });


    //Insert one Brand
     app.post('/insert_brand',  function (req, res) {

       
        var name = req.body.brand_name;
        // console.log(name);
        var brand = {
            brand_name: name
        };
        Brands.insert([brand], function (err, result) {
          if (err) {
            res.send("error");
         } else {
            // res.send('Inserted');
            res.redirect('brand-list.html');
          }
        });
    }); 
     //Action delete one Brand
    app.get('/delete_brand', function(req, res) {
        var id = req.query.id;
        MongoClient.connect(url, function(err, db) {
            if(err) {  console.log(err); throw err;  }
            data = '';
            Brands.deleteOne({_id: new mongodb.ObjectID(id)});
                res.redirect('brand-list.html');
                db.close();
        });
    });
     //API return one Brand for edit
    app.get('/edit_brand', function(req, res) {
        var id = req.query.id;
        MongoClient.connect(url, function(err, db) {
            if(err) {  console.log(err); throw err;  }
            data = '';
            Brands.find({_id: new mongodb.ObjectID(id)}).toArray(function(err, docs){
                if(err) throw err;
                // res.render('edit-product.html', {data: docs});
                res.send(docs);
                db.close();
            });
        });
    });
    //Action Save one Brand
    app.post('/update_brand', function (req, res) {

        var id = req.body._id;
        //Khai báo biến nhận về từ body (value input)
        // console.log(id);
        var name = req.body.brand_name;
        // console.log(name);
        Brands.updateOne({_id: new mongodb.ObjectID(id)}, {$set: {brand_name: name}},{w:1}, function (err,result) {
            if (err) throw err;
        });
        res.redirect('brand-list.html');
    });
    //API return one Category for edit
    app.get('/edit_cate', function(req, res) {
        var id = req.query.id;
        MongoClient.connect(url, function(err, db) {
            if(err) {  console.log(err); throw err;  }
            data = '';
            Categories.find({_id: new mongodb.ObjectID(id)}).toArray(function(err, docs){
                if(err) throw err;
                // res.render('edit-product.html', {data: docs});
                res.send(docs);
                db.close();
            });
        });
    });

    //Insert one Categories
     app.post('/insert_cate',  function (req, res) {

       
        var name = req.body.cate_name;
        var name_short = req.body.cate_nameshort;
        // console.log(name);
        var category = {
            cate_name: name,
            cate_nameshort:name_short
        };
        Categories.insert([category], function (err, result) {
          if (err) {
            res.send("error");
         } else {
            // res.send('Inserted');
            res.redirect('categories-list.html');
          }
        });
    }); 
     //Action delete one Categories
    app.get('/delete_cate', function(req, res) {
        var id = req.query.id;
        // console.log(id);
        MongoClient.connect(url, function(err, db) {
            if(err) {  console.log(err); throw err;  }
            data = '';
            Categories.deleteOne({_id: new mongodb.ObjectID(id)});
                res.redirect('categories-list.html');
                db.close();
        });
    });

    //Action Save one Categories
    app.post('/update_cate',function (req, res) {

        var id = req.body._id;
        //Khai báo biến nhận về từ body (value input)
        var name = req.body.cate_name;
        var name_short = req.body.cate_nameshort;
        // console.log(id);
        // console.log(name);
        // console.log(name_short);
        
        Categories.updateOne({_id: new mongodb.ObjectID(id)}, {$set: {cate_name: name,
                                                                      cate_nameshort: name_short
                                                                  }},{w:1}, function (err,result) {
            if (err) throw err;
        });
        res.redirect('categories-list.html');
    });


    //Action register user
    app.post('/register',function (req, res) {

        var username = req.body.username;
        var password = req.body.password;
        var email = req.body.email;
        var type = 0;
        var user = {
            username : username,
            password : password,
            email : email,
            type : type
        };
        User.insert([user], function (err, result) {
          if (err) {
            res.send("error");
         } else {
            // res.send('Inserted');
            res.redirect('login.html');
          }
        });


        // User.find({username: username}).toArray(function(err, docs){
        //     if(err) throw err;
        //     // res.send(docs);
        //     console.log(docs);
        //     var exists = '';
        //     // console.log(docs[0]);
        //     // console.log(docs[0].prod_thumb);
        //     // db.close();
        //     res.status(200);
        //     res.redirect('/');
            
        // });

    });

    //Action login user
    app.post('/login',function (req, res) {

        var username = req.body.username;
        var password = req.body.password;
        
        User.find({username : username,password : password}).toArray(function(err, docs){
            if(err) throw err;
            // res.render('edit-product.html', {data: docs});
            // console.log(docs.length);
            // console.log(docs[0]._id);
            // res.send(docs);
            if (docs.length === 1 ) {
                res.redirect('index.html?id='+docs[0]._id);
            } else {
                res.redirect('login.html');
            }
        });


    });


    //API and Action lọc giá, brand, loại sp
    app.post("/action_filter_prod",function(req,res){
         var query = {};
         var ft_price = {};
         // var brand = req.body.brand;
         // var category = req.body.category;	
         var min_price = parseInt(req.body.min_price);
         var max_price = parseInt(req.body.max_price);
         var radio = req.body.radio;
         var radio1 = req.body.radio1;
         
         if (radio1 != undefined && radio1 != 'on') {
            query.prod_brand = radio1;
         }
         
         if (radio != undefined && radio != 'on') {
            query.prod_category=radio;
         }

         if (isNaN(min_price) == false) {
            ft_price.$gt = min_price;
            query.prod_price = ft_price;
         }

         if (isNaN(max_price) == false) {
            ft_price.$lt = max_price;
            query.prod_price = ft_price;
         }

        Products.find(query).toArray(function (err, result) {
            if (err) {
                res.send({
                    status: 0,
                    message:"fail",
                });
                console.log(err)
            }else {
                if(result.length){
                    res.send({
                        // status:1,
                        // message: 'success',
                        data: result    
                    });
                // console.log(result);
                }else{
                    res.send({
                        // status:1,
                        // message: 'success',
                        data: []    
                    });
                }
            }           
        });

    });



    //API and Action check tồn tại user
    app.post("/check_user_exists",function(req,res){
         var query = {};
         var username = req.body.username;
         // var password = req.body.password;
         // var fullname = req.body.fullname;
         
        query.username = username;
        // query.prod_category=category;
        // query.fullname=fullname;


        User.find(query).toArray(function (err, result) {
            if (err) {
                res.send({
                    status: 0,
                    message:"fail",
                });
                console.log(err)
            }else {
                if(result.length){
                    res.send(false);
                }else{
                    res.send(true);
                }
            }           
        });

    });


    //API and Action check tồn tại email
    app.post("/check_email_exists",function(req,res){
         var query = {};
         var email = req.body.email;
         
        query.email = email;

        User.find(query).toArray(function (err, result) {
            if (err) {
                res.send({
                    status: 0,
                    message:"fail",
                });
                console.log(err)
            }else {
                if(result.length){
                    res.send(false);
                }else{
                    res.send(true);
                }
            }           
        });

    });


    //API return one user
    app.get('/get_user', function(req, res) {
        var id = req.query.id;
        MongoClient.connect(url, function(err, db) {
            if(err) {  console.log(err); throw err;  }
            data = '';
            User.find({_id: new mongodb.ObjectID(id)}).toArray(function(err, docs){
                if(err) throw err;
                // res.render('edit-product.html', {data: docs});
                res.send(docs);
                // db.close();
            });
        });
    });

    //Insert one Ratings
     app.post('/save-rating',  function (req, res) {
       
        var prod_id = req.body.prod_id;
        var rate_name = req.body.rate_name;
        var rate_email = req.body.rate_email;
        var rate_content = req.body.rate_content;
        // console.log(name);
        var rate = {
            prod_id: prod_id,
            rate_name:rate_name,
            rate_email:rate_email,
            rate_content:rate_content

        };
        Ratings.insert([rate], function (err, result) {
          if (err) {
            res.send("error");
         } else {
            res.redirect('/product_detail.html?id=' + prod_id);
         }
        });
    }); 
     //Insert one feedbacks
     app.post('/save-feedback',  function (req, res) {
        var f_name = req.body.name;
        var f_email = req.body.email;
        var f_comment = req.body.comment;
        // console.log(name);
        var feed = {
            name:f_name,
            email:f_email,
            feedback:f_comment

        };
        Feedbacks.insert([feed], function (err, result) {
          if (err) {
            res.send("error");
         } else {
            res.redirect('about-us.html');
         }
        });
    }); 

    //API return one Category for edit
    app.get('/get_ratings', function(req, res) {
        var id = req.query.id;
        MongoClient.connect(url, function(err, db) {
            if(err) {  console.log(err); throw err;  }
            data = '';
            Ratings.find({prod_id: id}).toArray(function(err, docs){
                if(err) throw err;
                // res.render('edit-product.html', {data: docs});
                res.send(docs);
                // db.close();
            });
        });
    });

    //API buy some product
    app.get("/cart_product",function(req,res){
         Products.aggregate([{ $sample:{size:5}}]).toArray(function (err, result) {
            if (err) {
                res.send({
                    status: 0,
                    message:"fail"
                });
            }else {
                if(result.length){
                    res.send({
                        // status:1,
                        // message: 'success',
                        data: result    
                    });
          //console.log(result);
                }else{
                    res.send({
                        // status:1,
                        // message: 'success',
                        data: []    
                    });
                }
            }           
        });
    });

    //API buy 1 product
    app.get("/cart_1product",function(req,res){
         Products.aggregate([{ $sample:{size:5}}]).toArray(function (err, result) {
            if (err) {
                res.send({
                    status: 0,
                    message:"fail"
                });
            }else {
                if(result.length){
                    res.send({
                        // status:1,
                        // message: 'success',
                        data: result    
                    });
          //console.log(result);
                }else{
                    res.send({
                        // status:1,
                        // message: 'success',
                        data: []    
                    });
                }
            }           
        });
    });

  }
});

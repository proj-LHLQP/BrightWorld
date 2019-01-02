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
    var Users = database.collection("Users");

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
            console.log("====================== ID anh can sửa là" + id);
            var originalFileName ='';
            //Lấy đường đẫn phần tử thứ nhất của file ảnh và file document
            if (req.files['prod_thumb'] === undefined) {    //Nếu ko up
                originalFileName = originalFileNameOld;
            } else {
                // console.log("====================== vào 4");
                originalFileName = req.files['prod_thumb'][0].originalname;
            }
            // console.log("====================== vào 5");
            // console.log(originalFileName);

            // console.log("=======================================");

            // Nếu doc mới ko đc up sẻ lấy doc cũ, nếu up sẽ lấy doc mới
            var originalFileDocNameOld = docs[0].prod_doc.replace("/upload/","");
            // console.log("====================== ID anh can sửa là" + id);
            var originalFileDocName ='';
            //Lấy đường đẫn phần tử thứ nhất của file ảnh và file document
            if (req.files['prod_doc'] === undefined) {    //Nếu ko up
                originalFileDocName = originalFileDocNameOld;
            } else {
                // console.log("====================== vào 4");
                originalFileDocName = req.files['prod_doc'][0].originalname;
            }
            // console.log("====================== vào 5");
            // console.log(originalFileDocName);

            // console.log(docs[0].prod_gallery[0]);
            

            // Nếu gallery mới ko đc up sẻ lấy gallery cũ, nếu up sẽ lấy gallery mới
            var strArray ='';
            if (req.files['prod_gallery'] === undefined && req.files['prod_thumb'] === undefined) {
                strArray = docs[0].prod_gallery;
                console.log("=============== mảng gallery cũ   "+strArray);
                console.log(strArray);
            } else if (req.files['prod_gallery'] === undefined && req.files['prod_thumb'] !== undefined) {
                var elem0 = "/upload/"+originalFileName;
                docs[0].prod_gallery[0] = elem0;
                strArray = docs[0].prod_gallery;
                console.log("=============== mảng gallery mới thay elem1    "+docs[0].prod_gallery);
                console.log(docs[0].prod_gallery);
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
                console.log("=============== mảng gallery mới giữ nguyên thumb cũ "+strArray);
                console.log(strArray);
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
                console.log(strArray);                
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
            var price = req.body.prod_price;
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
        console.log(id);
        MongoClient.connect(url, function(err, db) {
            if(err) {  console.log(err); throw err;  }
            data = '';
            Products.find({_id: new mongodb.ObjectID(id)}).toArray(function(err, docs){
                if(err) throw err;
                // res.render('edit-product.html', {data: docs});
                res.send(docs);
                db.close();
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





  }
});

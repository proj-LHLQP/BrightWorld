var express = require("express"); 		//cú pháp Node JS gọi module express
var app = express();					// Tạo đối tượng server
var bodyParser = require("body-parser"); //Thêm sinh viên

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());



// Dung de chay cac file tinh html
app.use(express.static('html'));
app.use('/css',express.static('css'));
app.use('/js',express.static('js'));
app.use('/img',express.static('img'));
app.use('/vendor/bootstrap/css',express.static('vendor/bootstrap/css'));
app.use('/vendor/jquery',express.static('vendor/jquery'));
app.use('/fontawesome/css',express.static('fontawesome/css'));

app.listen("3333", function(){
	console.log("Server đang chạy...");
});
var mongodb = require("mongodb");		//cú pháp Node JS gọi module mongodb
var MongoClient = mongodb.MongoClient;

var url = 'mongodb://user_test:Phong123@ds040948.mlab.com:40948/brightworld';

// Use connect method to connect to the Server
MongoClient.connect(url, function (err, db1) {
    if (err) {
    console.log('Không thể kết nối đến mongoDB. Lỗi: - Unable to connect to the mongoDB server. Error:', err);
    } else {
        //HURRAY!! We are connected. :)
        console.log('Đã thiết lập kết nối - Connection established to', url);
        var database = db1.db();
        var collection1 = database.collection("Products");			//Tạo bảng students
        // do some work here with the database.

        // //Insert new Student
        // collection1.insert([student1], function(err,result){
        // 	if(err){
        // 		console.log(err);
        // 	} else {
        // 		console.log('Inserted');
        // 	}
        // 	//Close connection
        // 	db1.close();
        // });

        // //Update student id=1 và sinh nhật yyyy-mm-dd
        // collection1.update({id:1,std_birth:'1993-2-12'}, {$set: {std_name:"Văn Đức", std_birth : "1993-2-13"}}, function(err,updateObj){
        // 	if(err){
        // 		console.log(err);
        // 	} else if (updateObj){
        // 		if(updateObj.result.nModified > 0){					// Đọc kết quả trả về
        // 			console.log("update success!");
        // 		} else {
        // 			console.log("Không có trường nào được tìm thấy");    			
        // 		}			
        // 	} 
        	
        // 	//Close connection
        // 	db1.close();
        // });

        // // List Students tìm id =1
        // collection1.find({id:0}).toArray(function (err,result) {
        // 	if(err){
        // 		console.log(err);
        // 	} else if (result.length) {
        // 		console.log('Tìm thấy:', result);
        // 	} else {
        // 		console.log('No document(s) found with defined "find" criteria!')
        // 	}
    	// 	//Close connection
        // 	db1.close();
        // });




        //Close connection
        // db1.close();
    	app.get("/list_product", function (req, res){
    		collection1.find({}).toArray(function (err,result) {
    			if (err) {
    				res.send({
    					status : 0,
    					message: "Fail!"
    				});
    			} else {
    				console.log('res');
    				if(result.length) {
    					res.send({
    						status : 1,
    						message: "Success!",
    						data: result
    					});
    				} else {
    					res.send({
    						status : 1,
    						message: "Success! Empty",
    						data: []
    					});
    				}
    			}
    		});
    	});

    	// app.post("/add",function(req,res){
    	// 	var id = req.body.id;
    	// 	var code = req.body.code;
    	// 	var name = req.body.name;
    	// 	var birth = req.body.birth;
    	// 	var class_id = req.body.class_id;
    	// 	var gender = req.body.gender;

    	// 	var student1 = {
    	//     	id:id,
    	//     	std_name : name,
    	//     	std_code : code,
    	//     	std_birth : birth,
    	//     	class_id : class_id,
    	//     	std_gender : gender
    	//     }

    	// 	collection1.insert([student1], function(err,result){
     //    	if(err){
     //    		console.log(err);
     //    	} else {
     //    		console.log('Inserted');
     //    	}
     //    	//Close connection
     //    	db1.close();
     //        });
    	// });


    }
});

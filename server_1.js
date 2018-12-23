var express = require("express");
var app = express();
app.use(express.static('html'));
app.listen("3003",function(){
	console.log("Server is running!!!");
});

var mongodb = require("mongodb");
var MongoClient = mongodb.MongoClient;
var url = 'mongodb://nmquang21:quang123456@ds040948.mlab.com:40948/brightworld';

MongoClient.connect(url, function (err, db) {
  if (err) {
    console.log('Unable to connect to the mongoDB server. Error:', err);
  } else {
    //HURRAY!! We are connected. :)
    console.log('Connected to DB!!!!');
    var database = db.db();
    var collectionsss = database.collection("Products");


    // do some work here with the database.
    // var student1 = {
    // 	id:1,
    // 	student_name: "Nguyen Van A",
    // 	mssv :"A01",
    // 	birthday: "1991-01-02",
    // 	class_id:"2",
    // 	gender:1
    // };

    //INSERT
    //  collectionsss.insert([student1], function (err, result) {
    //   if (err) {
    //     console.log(err);
    //   } else {
    //     console.log('Inserted!');
    //   }
    //   //Close connection
    //   db.close();
    // });


    //UPDATE
 //    collectionsss.update({id:1}, {$set: {student_name:"Nguyen Minh Quang",mssv:"Q10"}}, function (err,UpdatedObj) {
	//   if (err) {
	//     console.log(err);
	//   } 
	//   else if (UpdatedObj) {
	//   	if(UpdatedObj.result.nModified > 0){
	//     	console.log('Updated Successfully');
	//   	}
	//   	else{
	//     console.log('No record Update!');
	// 	}
	//   }
	//   //Close connection
	//   db.close();
	// });

	//List Student

	// collectionsss.find().toArray(function (err, result) {
 //      if (err) {
 //        console.log(err);
 //      } else if (result.length) {
 //        console.log('Found:', result);
 //      } else {
 //        console.log('No document(s) found with defined "find" criteria!');
 //      }
 //      //Close connection
 //      db.close();
 //    });


	//DELETE

	//API

	app.get("/list_Products",function(req,res){
		collectionsss.find().toArray(function (err, result) {
	      	if (err) {
	        	res.send({
	        		status: 0,
	        		message: "fail"
	        	});
	      	} else {
	        	if(result.length){
	        		res.send({
	        			status: 1,
	        			message:"Success!",
	        			data: result
	        		})
	        	}
	        	else{
	        		res.send({
	        			status: 1,
	        			message:"Success!",
	        			data: []
	        		})
	        	}
	      	}
	    });
	});

  }
});
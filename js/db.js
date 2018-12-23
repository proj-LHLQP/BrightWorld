var mongoose = require('mongoose');

const dbName = 'user-api';

var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;
const mlabURI = 'mongodb://root:hoanghai94@ds027758.mlab.com:27758/hoanghai_data';

MongoClient.connect(mlabURI, function (err, db) {

  if (err) {
    console.log('Unable to connect to the mongoDB server. Error:', err);
  } else {

    var database = db.db();
    var collection = database.collection("students");
    var class_collection = database.collection("class");
    var student1 = {
    	id: 1,
    	student_name: "Lê văn A",
    	mssv: "ms01",
    	birthday: "2000-12-03",
    	class_id: 1,
    	gender: 1
    };

//List Students
 	 collection.find({}).toArray(function (err, result) {
      if (err) {
        console.log(err);
      } else if (result.length) {
        console.log('Found:', result);
      } else {
        console.log('No document(s) found with defined "find" criteria!');
      }
      //Close connection
      //db.close();
    });

    app.get("/list_students",function(req,res){
       collection.find({}).toArray(function (err, result) {
      if (err) {
        res.send({
          status: 0,
          message:"fail"
        });
      }else {
        if(result.length){
          res.send({
            status:1,
            message: 'success',
            data: result  
          });
        }else{
          res.send({
            status:1,
            message: 'success',
            data: []  
          });
        }
      }     
      });
    });

//Thêm sinh viên
    app.post('/user', urlencodedParser, function(req, res) {
        var userID = req.body.userID;
        var mssv = req.body.mssv;
        var name = req.body.name;
        var birthday = req.body.birthday;

        res.send("userID:"+userID + " mssv:"+mssv + " name:"+name + " birthday:"+birthday);
        // result = User.addUser(user);
        user.save().then((user) => {
          res.send(user);
        }, (e) => {
          res.status(400).send(e);
        });
    });
  }
});

const con = mongoose.connect(mlabURI, (error) => {
	if(error){
		console.log("Error " + error);
	}else{
		console.log("Connected successfully to server");
	}
});

module.exports = con;

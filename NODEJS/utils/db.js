var mongoose = require('mongoose');

const mlabURI = 'mongodb://root:hoanghai94@ds027758.mlab.com:27758/hoanghai_data';
const dbName = 'user-api';

const con = mongoose.connect(mlabURI, (error) => {
	if(error){
		console.log("Error " + error);
	}else{
		console.log("Connected successfully to server");
	}
});

module.exports = con;


var express = require('express');
var app = express();
//dùng để chạy các file tĩnh
app.use(express.static('html'));


app.use('/css',express.static('css'));
app.use('/js',express.static('js'));
app.use('/img',express.static('img'));
app.use('/vendor/bootstrap/css',express.static('vendor/bootstrap/css'));
app.use('/vendor/jquery',express.static('vendor/jquery'));
app.use('/fontawesome/css',express.static('fontawesome/css'));


app.get('/', function (req, res) {
   res.send('Hello World');
});

var server = app.listen(3000, function () {
  var host = server.address().address
  var port = server.address().port
  console.log("Ung dung Node.js dang hoat dong tai dia chi: http://%s:%s", host, port)
});
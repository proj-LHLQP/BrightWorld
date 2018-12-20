const express = require('express');
const bodyParser = require('body-parser')
const urlencodedParser = bodyParser.urlencoded({ extended: false });

const app = express();
const PORT = process.env.PORT || 5000;
// Dung de chay cac file tinh html
app.use(express.static('public'));
app.use(bodyParser.json())
app.listen(PORT, () => console.log(`Listening on ${ PORT }`));

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





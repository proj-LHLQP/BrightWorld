const express = require('express');
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extended: false });

const app = express();
const PORT = process.env.PORT || 5000;
// Dung de chay cac file tinh html
app.use(express.static('public'));

app.use(bodyParser.json());
app.listen(PORT, () => console.log(`Listening on ${ PORT }`));







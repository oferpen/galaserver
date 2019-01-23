var express = require('express');
var router = express.Router();
var cors = require('cors');
let app = express();
app.use(cors());
app.options('*', cors());
module.exports = router;

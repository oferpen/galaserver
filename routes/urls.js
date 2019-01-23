var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
var conn = MongoClient.connect(url);
const app = express();

server = app.listen(3001);
const io = require("socket.io")(server)

io.on('connection', (socket) => {
  console.log('user connected');
  socket.on('message', (message) => {
    console.log("Message Received: " + message);
    io.emit('message', {type:'new-message', text: message});
  });
});


router.post('/', function(req, res, next) {

  var newURL = req.body["url"];
  var r = conn.then(client=> client.db('gala').collection('urls').find({}).toArray(function(err, docs) {
    if(err) {
      console.error(err)
    }
    parseResults(req,res,newURL,docs);
  }))
});

function parseResults(req,res,newURL,docs){
  var found = false;
  for (var i = 0; i < docs.length; i++) {
    if(docs[i]["url"] == newURL)  found = true;
  }
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader('Access-Control-Allow-Methods', '*');
  res.setHeader("Access-Control-Allow-Headers", "*");
  if(found){
    var response = {
      status  : 200,
      url : newURL,
      success : "true"
    }
    res.end(JSON.stringify(response));
  }
  else{
    var response = {
      status  : 200,
      success : "false"
    }
    res.end(JSON.stringify(response));
  }

}
module.exports = router;

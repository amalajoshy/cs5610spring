var express = require('express');
var app = express();

app.use(express.static(__dirname + '/public'));
app.use(express.json());        // to support JSON-encoded bodies
app.use(express.urlencoded());  // to support URL-encoded bodies

var ipaddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port      = process.env.OPENSHIFT_NODEJS_PORT || 8080;

require(__dirname + "/public/Assignment-3/server/app.js")(app);


app.get('/hello', function(req, res){
  res.send('hello world');
});

app.listen(port, ipaddress);
var express = require('express');
var app = express();

app.use(express.static(__dirname + '/public'));
app.use(express.json());        // to support JSON-encoded bodies
app.use(express.urlencoded());  // to support URL-encoded bodies

var ipaddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port      = process.env.OPENSHIFT_NODEJS_PORT || 8080;

var db_host = process.env.OPENSHIFT_MONGODB_DB_HOST || '127.0.0.1';
var db_port = process.env.OPENSHIFT_MONGODB_DB_PORT || 27017;
var db_name = 'cs5610spring';

var mongoose = require("mongoose");
var db = mongoose.connect('mongodb://' + db_host + ':' + db_port + '/' + db_name);

require(__dirname + "/public/Assignment-4/server/app.js")(app, mongoose, db);

app.listen(port, ipaddress);
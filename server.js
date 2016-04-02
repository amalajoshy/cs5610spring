var express = require('express');
var app = express();

app.use(express.static(__dirname + '/public'));
app.use(express.json());        // to support JSON-encoded bodies
app.use(express.urlencoded());  // to support URL-encoded bodies

var ipaddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port      = process.env.OPENSHIFT_NODEJS_PORT || 8080;

var dbConnectionString = "localhost/cs5610";

if (process.env.OPENSHIFT_MONGODB_DB_HOST) {
  var db_host = process.env.OPENSHIFT_MONGODB_DB_HOST;
  var db_port = process.env.OPENSHIFT_MONGODB_DB_PORT;
  var db_user = process.env.OPENSHIFT_MONGODB_DB_USERNAME;
  var db_password = process.env.OPENSHIFT_MONGODB_DB_PASSWORD;
  var db_name = 'cs5610spring';

  dbConnectionString = db_user + ':' + db_password '@' + db_host + ':' + db_port + '/' + db_name;
}

var mongoose = require("mongoose");
var db = mongoose.connect('mongodb://' + dbConnectionString);

require(__dirname + "/public/Assignment-4/server/app.js")(app, mongoose, db);

app.listen(port, ipaddress);
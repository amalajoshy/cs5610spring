var express = require('express');
var app = express();
var bodyParser = require('body-parser');
//var multer = require('multer');
var passport      = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var cookieParser  = require('cookie-parser');
var session       = require('express-session');

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());     // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({extended: true}));   // to support URL-encoded bodies
//app.use(express.bodyParser({ uploadDir: './public/uploads', keepExtensions: true }));
//app.use(multer());  // for parsing multipart/form-data
app.use(session({
    secret: process.env.PASSPORT_SECRET,
    resave: true,
    saveUninitialized: true
}));
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());
//app.use(function (req, res, next) {
//    res.locals.isAuthenticated = req.isAuthenticated();
//    res.locals.user = req.user;
//    next();
//});

var ipaddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port      = process.env.OPENSHIFT_NODEJS_PORT || 8080;

var dbConnectionString = "localhost/cs5610";

if (process.env.OPENSHIFT_MONGODB_DB_HOST) {
  var db_host = process.env.OPENSHIFT_MONGODB_DB_HOST;
  var db_port = process.env.OPENSHIFT_MONGODB_DB_PORT;
  var db_user = process.env.OPENSHIFT_MONGODB_DB_USERNAME;
  var db_password = process.env.OPENSHIFT_MONGODB_DB_PASSWORD;
  var db_name = 'cs5610spring';

  dbConnectionString = db_user + ':' + db_password + '@' + db_host + ':' + db_port + '/' + db_name;
}

var mongoose = require("mongoose");
var db = mongoose.connect('mongodb://' + dbConnectionString);

require(__dirname + "/public/Assignment-5/server/app.js")(app, mongoose, db, passport, LocalStrategy);

app.listen(port, ipaddress);
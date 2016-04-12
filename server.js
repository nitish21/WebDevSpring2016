var express = require('express');
var app = express();

var bodyParser    = require('body-parser');
var multer        = require('multer');

var passport      = require('passport');
var cookieParser  = require('cookie-parser');
var session       = require('express-session');

var mongoose = require("mongoose");

var connectionString = 'mongodb://localhost/form-maker';


if(process.env.OPENSHIFT_MONGODB_DB_PASSWORD) {
    connectionString = process.env.OPENSHIFT_MONGODB_DB_USERNAME + ":" +
        process.env.OPENSHIFT_MONGODB_DB_PASSWORD + "@" +
        process.env.OPENSHIFT_MONGODB_DB_HOST + ':' +
        process.env.OPENSHIFT_MONGODB_DB_PORT + '/' +
        process.env.OPENSHIFT_APP_NAME;
}

var db = mongoose.connect(connectionString);

var ipaddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port = process.env.OPENSHIFT_NODEJS_PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(multer());


app.use(session({
    secret: 'this is the secret',
    resave: true,
    saveUninitialized: true
}));

app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(__dirname + '/public'));

require ("./public/assignment/server/app.js")(app, db);

//require("./public/assignment/server/services/user.service.server.js")(app);
//require("./public/assignment/server/services/forms.service.server.js")(app);
//require("./public/assignment/server/services/field.service.server.js")(app);
//require("./public/assignment/server/app.js")(app);
//
//
require("./public/project/server/services/user.service.server.js")(app);
require("./public/project/server/services/portfolio.service.server.js")(app);
require("./public/project/server/services/watchlist.service.server.js")(app);
require("./public/project/server/services/comment.service.server.js")(app);
require("./public/project/server/app.js")(app);

app.listen(port, ipaddress);
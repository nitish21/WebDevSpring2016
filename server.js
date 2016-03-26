var express = require('express');
var app = express();
var bodyParser    = require('body-parser');
var multer        = require('multer');

var ipaddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port = process.env.OPENSHIFT_NODEJS_PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(multer());
app.use(express.static(__dirname + '/public'));

require("./public/assignment/server/services/user.service.server.js")(app);
require("./public/assignment/server/services/forms.service.server.js")(app);
require("./public/assignment/server/services/field.service.server.js")(app);
require("./public/assignment/server/app.js")(app);


require("./public/project/server/services/user.service.server.js")(app);
require("./public/project/server/services/portfolio.service.server.js")(app);
require("./public/project/server/services/comment.service.server.js")(app);
require("./public/project/server/app.js")(app);

app.listen(port, ipaddress);
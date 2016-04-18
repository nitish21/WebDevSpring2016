module.exports = function(app,db) {

    var userModel = require ("./models/user.model.server.js")(db);
    var userService = require("./services/user.service.server.js")(app, userModel);

    var formModel = require("./models/form.model.server")(db);
    var formService = require("./services/forms.service.server.js")(app, formModel);


    var fieldService = require("./services/field.service.server.js")(app, formModel);

};


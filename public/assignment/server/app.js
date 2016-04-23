module.exports = function(app,db) {

    var assignmentUserModel = require ("./models/user.model.server.js")(db);
    var assignmentUserService = require("./services/user.service.server.js")(app, assignmentUserModel);

    var formModel = require("./models/form.model.server")(db);
    var formService = require("./services/forms.service.server.js")(app, formModel);

    var fieldService = require("./services/field.service.server.js")(app, formModel);

};


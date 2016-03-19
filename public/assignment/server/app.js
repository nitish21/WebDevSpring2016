module.exports = function(app) {

    var userService = require("./services/user.service.server.js")(app);
    var formService = require("./services/forms.service.server.js")(app);
    var fieldService = require("./services/field.service.server.js")(app);

}
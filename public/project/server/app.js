module.exports = function(app,db) {


    //var portfolioService = require("./services/portfolio.service.server.js")(app);
    //var watchlistService = require("./services/watchlist.service.server.js")(app);
    //var commentService = require("./services/comment.service.server.js")(app);

    var projectUserModel = require ("./models/user.model.server.js")(db);
    var projectUserService = require("./services/user.service.server.js")(app, projectUserModel);

    var portfolioModel = require ("./models/portfolio.model.server")(db);
    var portfolioService = require("./services/portfolio.service.server.js")(app, portfolioModel);

    var watchlistModel = require ("./models/watchlist.model.server")(db);
    var watchlistService = require("./services/watchlist.service.server.js")(app, watchlistModel);

    var commentModel = require ("./models/comment.model.server")(db);
    var commentService = require("./services/comment.service.server.js")(app, commentModel);

};

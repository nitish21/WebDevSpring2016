module.exports = function(app) {

    var userService = require("./services/user.service.server.js")(app);
    var portfolioService = require("./services/portfolio.service.server.js")(app);
    var watchlistService = require("./services/watchlist.service.server.js")(app);
    var commentService = require("./services/comment.service.server.js")(app);

}

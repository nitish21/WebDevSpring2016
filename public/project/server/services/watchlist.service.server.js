//var watchlistModel = require("./../models/watchlist.model.js")();

module.exports = function(app, watchlistModel){

    app.post("/api/project/watchlist/user/:userId/stock",createWatchlistStockForUser);//createStockForUser

    app.get("/api/project/watchlist/user/:userId/stock",findAllWatchlistStocksForUser);//getStockForUser

    app.get("/api/project/watchlist/username/:username/stock",findAllWatchlistStocksForUserWithUsername);//getStockForUser by username

    app.delete("/api/project/watchlist/stock/:stockId",deleteWatchlistStockById);//delete stock

    app.put("/api/project/watchlist/stock/:stockId", updateWatchlistStockById);//update stock

    app.get("/api/project/watchlist/:Symbol/user", findAllUsernamesWithThisStock);

    ////////////////////////////////////////////////////////////////////


    function findAllUsernamesWithThisStock (req, res) {

        console.log("inside findAllUsernamesWithThisStock of watchlist server service ");

        var Symbol = req.params.Symbol;

        console.log(Symbol);

        watchlistModel.findAllUsernamesWithThisStock(Symbol)
            .then(function(usernames){
                res.json(usernames);
            });


    }




    function findAllWatchlistStocksForUserWithUsername (req, res) {

        console.log("inside findAllWatchlistStocksForUserWithUsername of watchlist server service ");

        var username = req.params.username;

        console.log(username);

        watchlistModel.findAllWatchlistStocksForUserWithUsername(username)
            .then(function(stocks){
                res.json(stocks);
            });

        //console.log(stocks);
        //
        //res.json(stocks);

    }


    function findAllWatchlistStocksForUser (req, res) {

        console.log("inside findAllStocksForUser of watchlist server service ");

        var userId = req.params.userId;

        console.log(userId);

        watchlistModel.findAllWatchlistStocksForUser(userId)
            .then(function(stocks){
                res.json(stocks);
            });



    }

    function createWatchlistStockForUser(req, res){

        console.log("inside createStockForUser of stocks server service ");

        var newStock = req.body;

        var userId = req.params.userId;

        watchlistModel.createWatchlistStockForUser(userId,newStock)
            .then(function(stock){
                res.json(stock);
            });

        //res.json(stock);
    }


    function deleteWatchlistStockById (req, res) {

        console.log("inside deleteStockById of stocks server service ");

        var stockId = req.params.stockId;

        watchlistModel.deleteWatchlistStockById(req.params.stockId)
            .then(function(stocks){
                res.json(stocks);
            });


        //res.json(stocks);

    }


    function updateWatchlistStockById (req, res) {

        console.log("inside updateStockById of stocks server service ");

        var newStock = req.body;

        watchlistModel.updateWatchlistStockById(req.params.stockId, newStock)
            .then(function(stock){
                res.json(stock);
            });

        //console.log("updated stock : ");
        //console.log(stock);
        //
        //res.json(stock);

    }


};
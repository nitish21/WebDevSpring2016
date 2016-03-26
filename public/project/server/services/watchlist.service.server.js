var watchlistModel = require("./../models/watchlist.model.js")();

module.exports = function(app){

    app.post("/api/project/watchlist/user/:userId/stock",createWatchlistStockForUser);//createStockForUser

    app.get("/api/project/watchlist/user/:userId/stock",findAllWatchlistStocksForUser);//getStockForUser

    app.delete("/api/project/watchlist/stock/:stockId",deleteWatchlistStockById);//delete stock

    app.put("/api/project/watchlist/stock/:stockId", updateWatchlistStockById);//update stock


    ////////////////////////////////////////////////////////////////////

    function findAllWatchlistStocksForUser (req, res) {

        console.log("inside findAllStocksForUser of watchlist server service ");

        var userId = req.params.userId;

        console.log(userId);

        var stocks = watchlistModel.findAllWatchlistStocksForUser(userId);

        console.log(stocks);

        res.json(stocks);

    }

    function createWatchlistStockForUser(req, res){

        console.log("inside createStockForUser of stocks server service ");

        var newStock = req.body;

        var userId = req.params.userId;

        var stock = watchlistModel.createWatchlistStockForUser(userId,newStock);

        res.json(stock);
    }


    function deleteWatchlistStockById (req, res) {

        console.log("inside deleteStockById of stocks server service ");

        var stockId = req.params.stockId;

        var stocks = watchlistModel.deleteWatchlistStockById(req.params.stockId);


        console.log("qwertyuiuytrewertyu");
        for(var i=0;i<stocks.length;i++){
            console.log("qwertyuiuytrewertyu");
            console.log(stocks[i]._id);
        }

        res.json(stocks);

    }


    function updateWatchlistStockById (req, res) {

        console.log("inside updateStockById of stocks server service ");

        var newStock = req.body;

        var stock = watchlistModel.updateWatchlistStockById(req.params.stockId, newStock);

        console.log("updated stock : ");
        console.log(stock);

        res.json(stock);

    }


}
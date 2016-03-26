var portfolioModel = require("./../models/portfolio.model.js")();

module.exports = function(app){

    app.post("/api/project/user/:userId/stock",createStockForUser);//createStockForUser

    app.get("/api/project/user/:userId/stock",findAllStocksForUser);//getStockForUser

    app.delete("/api/project/stock/:stockId",deleteStockById);//delete stock

    app.put("/api/project/stock/:stockId", updateStockById);//update stock


    ////////////////////////////////////////////////////////////////////

    function findAllStocksForUser (req, res) {

        console.log("inside findAllStocksForUser of stocks server service ");

        var userId = req.params.userId;

        var stocks = portfolioModel.findAllStocksForUser(userId);

        res.json(stocks);

    }

    function createStockForUser(req, res){

        console.log("inside createStockForUser of stocks server service ");

        var newStock = req.body;

        var userId = req.params.userId;

        var stock = portfolioModel.createStockForUser(userId,newStock);

        res.json(stock);
    }


    function deleteStockById (req, res) {

        console.log("inside deleteStockById of stocks server service ");

        var stockId = req.params.stockId;

        var stocks = portfolioModel.deleteStockById(req.params.stockId);


        console.log("qwertyuiuytrewertyu");
        for(var i=0;i<stocks.length;i++){
            console.log("qwertyuiuytrewertyu");
            console.log(stocks[i]._id);
        }

        res.json(stocks);

    }


    function updateStockById (req, res) {

        console.log("inside updateStockById of stocks server service ");

        var newStock = req.body;

        var stock = portfolioModel.updateStockById(req.params.stockId, newStock);

        console.log("updated stock : ");
        console.log(stock);

        res.json(stock);

    }


}
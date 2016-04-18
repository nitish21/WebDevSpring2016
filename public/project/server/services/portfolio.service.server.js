//var portfolioModel = require("./../models/portfolio.model.js")();

module.exports = function(app, portfolioModel){

    app.post("/api/project/user/:userId/stock",createStockForUser);//createStockForUser

    app.get("/api/project/user/:userId/stock",findAllStocksForUser);//getStockForUser

    app.delete("/api/project/stock/:stockId",deleteStockById);//delete stock

    app.put("/api/project/stock/:stockId", updateStockById);//update stock


    ////////////////////////////////////////////////////////////////////

    function findAllStocksForUser (req, res) {

        console.log("inside findAllStocksForUser of stocks server service ");

        var userId = req.params.userId;

        portfolioModel.findAllStocksForUser(userId)
            .then(function(stocks){
                res.json(stocks);
            });

    }

    function createStockForUser(req, res){

        console.log("inside createStockForUser of stocks server service ");

        var newStock = req.body;

        var userId = req.params.userId;

        portfolioModel.createStockForUser(userId,newStock)
            .then(function (stock) {
                res.json(stock);
            });


    }


    function deleteStockById (req, res) {

        console.log("inside deleteStockById of stocks server service ");

        var stockId = req.params.stockId;

        var stocks = portfolioModel.deleteStockById(req.params.stockId)
            .then(function(stocks){
                res.json(stocks);
            });


        //res.json(stocks);

    }


    function updateStockById (req, res) {

        console.log("inside updateStockById of stocks server service ");

        var newStock = req.body;

        portfolioModel.updateStockById(req.params.stockId, newStock)
            .then(function(stock){
                console.log("updated stock : ");
                console.log(stock);
                res.json(stock);
            });

        //console.log("updated stock : ");
        //console.log(stock);
        //
        //res.json(stock);

    }


}
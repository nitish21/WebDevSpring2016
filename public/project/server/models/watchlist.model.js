var stocksArray = require("./watchlist.mock.json");

module.exports = function() {

    var api = {

        createWatchlistStockForUser : createWatchlistStockForUser,
        findAllWatchlistStocksForUser :findAllWatchlistStocksForUser,
        deleteWatchlistStockById : deleteWatchlistStockById,
        updateWatchlistStockById : updateWatchlistStockById

    };

    return api;


    /////////////////////////////////////////////////////
    // Non API service methods
    /////////////////////////////////////////////////////

    function createWatchlistStockForUser(userId, stock){
        //Accepts parameters user id, stock object, and callback function
        //Adds property called _id with unique id. You can use (new Date).getTime() to create a unique number
        //Adds property called userId equal to user id parameter
        //Adds new stock to local array of stocks
        //Calls back with new stock

        var newStock = {
            "_id":(new Date).getTime(),
            "Symbol":stock.Symbol,
            //"PricePurchased":stock.PricePurchased,
            //"Quantity": stock.Quantity,
            "userId":userId
        };

        stocksArray.push(newStock);

        return newStock;
    }

    function findAllWatchlistStocksForUser(userId){
        //Accepts parameter user id, and callback function
        //Iterates over the array of current stocks looking for stocks whose user id is parameter user id
        //Calls back with found stocks for user id parameter, empty array otherwise

        var stocksMatchingUserId = [];

        for (var i = 0; i < stocksArray.length; i++) {

            var stock = stocksArray[i];

            if(stock.userId == userId){

                stocksMatchingUserId.push(stock);

            }
        }

        return stocksMatchingUserId;

    }

    function deleteWatchlistStockById(stockId){
        //Accepts parameter stock id and callback function
        //Iterates over array of stocks looking for stock whose id is stock id parameter
        //If found, removes stock from current array of stocks
        //Calls back with remaining array of stocks

        for (var i = 0; i < stocksArray.length; i++) {

            var stock = stocksArray[i];

            if(stock._id == stockId){

                stocksArray.splice(i, 1);

            }
        }

        return stocksArray;

    }

    function  updateWatchlistStockById(stockId, newStock, callback){
        //Accepts parameter stock id, new stock object, and callback function
        //Iterates over array of stocks looking for stock whose id is stock id parameter
        //If found, updates stock object with new stock values
        //Calls back with update stock

        for (var i = 0; i < stocksArray.length; i++) {

            var updatedStock = stocksArray[i];

            if(updatedStock._id == stockId){

                stocksArray[i] = {
                    "_id":newStock._id,
                    "Symbol":newStock.Symbol,
                    //"PricePurchased":newStock.PricePurchased,
                    //"Quantity":newStock.Quantity,
                    "userId":newStock.userId

                };

                return stocksArray[i];

            }

        }

    }


};
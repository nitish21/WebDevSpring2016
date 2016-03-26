(function(){
    angular
        .module("StockPortfolioApp")
        .factory("APIStockService", apiStockService);

    function apiStockService($http) {

        var SEARCH_BASE_URL = 'http://dev.markitondemand.com/MODApis/Api/v2/Lookup/jsonp?input=';

        var QUOTE_BASE_QUERY = 'http://dev.markitondemand.com/MODApis/Api/v2/Quote/jsonp?symbol=';

        //var BASE_URL = "https://query.yahooapis.com/v1/public/yql?q=";
        //var QUOTE_QUERY = "select * from yahoo.finance.quote where symbol=";
        //var END_PART = "&format=json&diagnostics=true&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&callback=";


        var stocksArray = [
            {"_id": "000", "Symbol": "AAPL", "PricePurchased": 101.35, "Quantity": 10, "userId": 123},
            {"_id": "010", "Symbol": "GOOG", "PricePurchased": 658.63, "Quantity": 20, "userId": 123},
            {"_id": "020", "Symbol": "NTAP", "PricePurchased": 26.08, "Quantity": 30, "userId": 234}
        ];


        var api = {
            findStockBySymbol: findStockBySymbol,
            searchStockBySearchString: searchStockBySearchString,
            createStockForUser : createStockForUser,
            findAllStocksForUser :findAllStocksForUser,
            deleteStockById : deleteStockById,
            updateStockById : updateStockById

        };
        return api;

        function findStockBySymbol(symbol, callback) {

            var encodedSearchString = encodeURI(QUOTE_BASE_QUERY + symbol + "&callback=JSON_CALLBACK");

            console.log(encodedSearchString);

            $http.jsonp(encodedSearchString)
                .success(callback);
        }

        function searchStockBySearchString(searchString, callback) {


            var encodedSearchString = encodeURI(SEARCH_BASE_URL + searchString + "&callback=JSON_CALLBACK");

            $http.jsonp(encodedSearchString)
                .success(callback);

        }

        /////////////////////////////////////////////////////
        // Non API service methods
        /////////////////////////////////////////////////////

        function createStockForUser(userId, stock, callback){
            //Accepts parameters user id, stock object, and callback function
            //Adds property called _id with unique id. You can use (new Date).getTime() to create a unique number
            //Adds property called userId equal to user id parameter
            //Adds new stock to local array of stocks
            //Calls back with new stock

            var newStock = {
                "_id":(new Date).getTime(),
                "Symbol":stock.Symbol,
                "PricePurchased":stock.PricePurchased,
                "Quantity": stock.Quantity,
                "userId":userId
            };

            stocksArray.push(newStock);

            callback(newStock);
        }

        function findAllStocksForUser(userId, callback){
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

            callback(stocksMatchingUserId);

        }

        function deleteStockById(stockId, callback){
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

            callback(stocksArray);

        }

        function  updateStockById(stockId, newStock, callback){
            //Accepts parameter stock id, new stock object, and callback function
            //Iterates over array of stocks looking for stock whose id is stock id parameter
            //If found, updates stock object with new stock values
            //Calls back with update stock

            for (var i = 0; i < stocksArray.length; i++) {

                var updatedStock = stocksArray[i];

                if(updatedStock._id == stockId){

                    updatedStock = {
                        "_id":newStock._id,
                        "Symbol":newStock.Symbol,
                        "PricePurchased":newStock.PricePurchased,
                        "Quantity":newStock.Quantity,
                        "userId":newStock.userId

                    };

                    callback(updatedStock);

                }

            }


        }

    }
})();
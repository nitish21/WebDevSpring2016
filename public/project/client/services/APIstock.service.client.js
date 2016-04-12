(function(){
    angular
        .module("StockPortfolioApp")
        .factory("APIStockService", apiStockService);

    function apiStockService($http) {

        var SEARCH_BASE_URL = 'http://dev.markitondemand.com/MODApis/Api/v2/Lookup/jsonp?input=';

        var QUOTE_BASE_QUERY = 'http://dev.markitondemand.com/MODApis/Api/v2/Quote/jsonp?symbol=';

        var YAHOO_BASE_URL = "https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20yahoo.finance.quote%20where%20symbol%20in%20(";
        var middleSet = "";
        var END_PART = ")&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&callback=JSON_CALLBACK";

        //var YAHOO_QUOTE_QUERY = "select * from yahoo.finance.quote where symbol=";
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
            updateStockById : updateStockById,
            getChartInfo :getChartInfo,

            findLivePricesOfStocks : findLivePricesOfStocks

        };

        return api;


        function findLivePricesOfStocks(allStocks,callback){

            for(var i=0; i< allStocks.length;i++) {

                var stock = allStocks[i];

                var symbol = stock.Symbol;

                if(i==0){
                    middleSet=middleSet + "'" + symbol + "'";
                }
                else{
                    middleSet=middleSet+ "%2C" + "'" + symbol + "'"
                }
                //middleSet = "'YHOO'%2C'AAPL'%2C'GOOG'%2C'MSFT'";
            }


            console.log("misslde set is ");
            console.log(middleSet);

            var encodedUrl = YAHOO_BASE_URL + middleSet + END_PART;

            console.log("inside findLivePricesOfStocks()");
            console.log(encodedUrl);

            middleSet = "";

            $http.jsonp(encodedUrl)
                .success(callback);

        }

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

        function getChartInfo(NumberOfDays,DataPeriod,symbol, callback){

            console.log("inside getChartInfo()..");

            //var url = "http://dev.markitondemand.com/MODApis/Api/v2/InteractiveChart/json?parameters={'Normalized':false,'NumberOfDays':365,'DataPeriod':'Day','Elements':[{'Symbol':'AAPL','Type':'price','Params':['c']}]}";

            //var url = "http://dev.markitondemand.com/MODApis/Api/v2/InteractiveChart/jsonp?parameters=%7B%22Normalized%22%3Afalse%2C%22NumberOfDays%22%3A365%2C%22DataPeriod%22%3A%22Month%22%2C%22Elements%22%3A%5B%7B%22Symbol%22%3A%22AAPL%22%2C%22Type%22%3A%22price%22%2C%22Params%22%3A%5B%22c%22%5D%7D%5D%7D&callback=JSON_CALLBACK";

            var url_base = "http://dev.markitondemand.com/MODApis/Api/v2/InteractiveChart/jsonp?parameters=%7B%22Normalized%22%3Afalse%2C%22NumberOfDays%22%3A";

            var url_base = url_base + NumberOfDays + "%2C%22DataPeriod%22%3A%22" + DataPeriod + "%22%2C%22Elements%22%3A%5B%7B%22Symbol%22%3A%22" + symbol + "%22%2C%22Type%22%3A%22price%22%2C%22Params%22%3A%5B%22c%22%5D%7D%5D%7D&callback=JSON_CALLBACK";


            console.log("done wih url.. encode uri is next step...");

            //var encodedSearchString = encodeURI(url + "&callback=JSON_CALLBACK");

            console.log("encodedSearchString : ");
            console.log(url_base);

            $http.jsonp(url_base)
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
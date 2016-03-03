(function(){
    angular
        .module("StockPortfolioApp")
        .factory("APIStockService", apiStockService);

    function apiStockService($http) {

        var SEARCH_BASE_URL = 'http://dev.markitondemand.com/MODApis/Api/v2/Lookup/jsonp?input=';

        var QUOTE_BASE_QUERY = 'http://dev.markitondemand.com/MODApis/Api/v2/Quote/jsonp?symbol=';

        var BASE_URL = "https://query.yahooapis.com/v1/public/yql?q=";
        var QUOTE_QUERY = "select * from yahoo.finance.quote where symbol=";
        var END_PART = "&format=json&diagnostics=true&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&callback=";

        var api = {
            findStockBySymbol: findStockBySymbol,
            searchStockBySearchString: searchStockBySearchString

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

    }
})();
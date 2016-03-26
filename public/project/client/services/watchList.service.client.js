(function(){
    angular
        .module("StockPortfolioApp")
        .factory("WatchListService", watchListService);

    function watchListService($http) {



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

        function createWatchlistStockForUser(userId, stock, callback){

            return $http.post("/api/project/watchlist/user/"+userId+"/stock", stock);

        }

        function findAllWatchlistStocksForUser(userId, callback){

            return $http.get("/api/project/watchlist/user/"+userId+"/stock");

        }

        function deleteWatchlistStockById(stockId, callback){

            return $http.delete("/api/project/watchlist/stock/"+stockId);

        }

        function  updateWatchlistStockById(stockId, newStock, callback){

            return $http.put("/api/project/watchlist/stock/"+stockId, newStock);

        }

    }
})();
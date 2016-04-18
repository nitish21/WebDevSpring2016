(function(){
    angular
        .module("StockPortfolioApp")
        .factory("WatchListService", watchListService);

    function watchListService($http) {



        var api = {

            createWatchlistStockForUser : createWatchlistStockForUser,
            findAllWatchlistStocksForUser :findAllWatchlistStocksForUser,
            deleteWatchlistStockById : deleteWatchlistStockById,
            updateWatchlistStockById : updateWatchlistStockById,
            findAllWatchlistStocksForUserWithUsername : findAllWatchlistStocksForUserWithUsername,
            findAllUsernamesWithThisStock : findAllUsernamesWithThisStock

        };

        return api;


        /////////////////////////////////////////////////////
        // Non API service methods
        /////////////////////////////////////////////////////


        function findAllUsernamesWithThisStock(Symbol){

            return $http.get("/api/project/watchlist/"+Symbol+"/user");

        }

        function findAllWatchlistStocksForUserWithUsername(username){

            return $http.get("/api/project/watchlist/username/"+username+"/stock");

        }


        function createWatchlistStockForUser(userId, stock){

            return $http.post("/api/project/watchlist/user/"+userId+"/stock", stock);

        }

        function findAllWatchlistStocksForUser(userId){

            return $http.get("/api/project/watchlist/user/"+userId+"/stock");

        }

        function deleteWatchlistStockById(stockId){

            return $http.delete("/api/project/watchlist/stock/"+stockId);

        }

        function  updateWatchlistStockById(stockId, newStock){

            return $http.put("/api/project/watchlist/stock/"+stockId, newStock);

        }

    }
})();
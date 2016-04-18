(function(){
    angular
        .module("StockPortfolioApp")
        .factory("PortfolioService", PortfolioService);

    function PortfolioService($http) {


        var api = {

            createStockForUser : createStockForUser,
            findAllStocksForUser :findAllStocksForUser,
            deleteStockById : deleteStockById,
            updateStockById : updateStockById,
            findAllStocksForUserWithUsername : findAllStocksForUserWithUsername

        };

        return api;

        /////////////////////////////////////////////////////
        // Non API service methods
        /////////////////////////////////////////////////////


        function findAllStocksForUserWithUsername(userName){

            return $http.get("/api/project/user/"+userName+"/stock");

        }



        function createStockForUser(userId, stock ){

            return $http.post("/api/project/user/"+userId+"/stock", stock);
        }

        function findAllStocksForUser(userId){

            return $http.get("/api/project/user/"+userId+"/stock");

        }

        function deleteStockById(stockId){

            return $http.delete("/api/project/stock/"+stockId);

        }

        function  updateStockById(stockId, newStock){

            return $http.put("/api/project/stock/"+stockId, newStock);

        }


    }
})();
(function(){
    angular
        .module("StockPortfolioApp")
        .factory("PortfolioService", PortfolioService);

    function PortfolioService($http) {


        var api = {

            createStockForUser : createStockForUser,
            findAllStocksForUser :findAllStocksForUser,
            deleteStockById : deleteStockById,
            updateStockById : updateStockById

        };

        return api;

        /////////////////////////////////////////////////////
        // Non API service methods
        /////////////////////////////////////////////////////

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
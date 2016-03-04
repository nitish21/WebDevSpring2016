(function () {
    angular
        .module("StockPortfolioApp")
        .controller("PortfolioController", PortfolioController);

    function PortfolioController($scope, $rootScope, $location, APIStockService) {

        $scope.addStock = addStock;
        $scope.updateStock = updateStock;
        $scope.deleteStock = deleteStock;
        $scope.selectStock = selectStock;
        $scope.stocks=[];


        initialDisplayOfStocks();


        function initialDisplayOfStocks(){

            APIStockService.findAllStocksForUser(
                $rootScope.user._id,
                function (response) {
                    angular.copy(response, $scope.stocks);
                });

        }


        function addStock(newStock){

            console.log("hello from create stoc iin portfolio controller");

            var loggedInUser = $rootScope.user;

            console.log("logged in user : " + loggedInUser);



            APIStockService.createStockForUser(
                loggedInUser._id,
                newStock,
                function(response){
                    console.log(response);
                    $scope.stocks.push(response);

                    $scope.stock = {};
                    $scope.selectedIndex = null;

                });

        }

        function deleteStock(index){

            console.log("hello from delete stock in portfolio controller");

            var stockToBeDeleted = $scope.stocks[index];

            var loggedInUser = $rootScope.user;

            console.log("logged in user : " + loggedInUser);

            APIStockService.deleteStockById(
                stockToBeDeleted._id,
                function(responseAllStocks){
                    //$scope.stocks = response;

                    console.log(responseAllStocks);

                    var stocksOfUser = [];

                    getStocksForUser(responseAllStocks, loggedInUser._id, stocksOfUser);

                    console.log(stocksOfUser);

                    $scope.stocks = stocksOfUser;


                });

        }

        function selectStock(index){

            $scope.selectedIndex = index;
            console.log(index);

            $scope.stock = {
                "_id": $scope.stocks[index]._id,
                "Symbol": $scope.stocks[index].Symbol,
                "PricePurchased": $scope.stocks[index].PricePurchased,
                "Quantity": $scope.stocks[index].Quantity,
                "userId": $scope.stocks[index].userId

            };

        }

        function updateStock(stockToBeUpdated) {

            console.log("hello from update stock in portfolio controller");

            APIStockService.updateStockById(
                stockToBeUpdated._id,
                stockToBeUpdated,
                function(response){
                    console.log(response);
                    $scope.stocks[$scope.selectedIndex] = response;
                });
        }

        function getStocksForUser(allStocks, userId, stocksOfUser) {

            for (var i = 0; i < allStocks.length; i++) {

                var s = allStocks[i];

                if(s.userId == userId){

                    stocksOfUser.push(s);

                }
            }

        }




    }
})();
(function () {
    angular
        .module("StockPortfolioApp")
        .controller("HomeController", HomeController);

    function HomeController($scope, $rootScope, $location, APIStockService) {

        //$scope.addStock = addStock;
        //$scope.updateStock = updateStock;
        //$scope.deleteStock = deleteStock;
        //$scope.selectStock = selectStock;
        $scope.AAPLquote;
        $scope.GOOGquote;


        initialDisplayOfStocks();


        function initialDisplayOfStocks(){

            APIStockService.findStockBySymbol(
                "GOOG",
                function(response) {
                    $scope.GOOGquote = response;
                    console.log(response);
                }
            )

            APIStockService.findStockBySymbol(
                "AAPL",
                function(response) {
                    $scope.AAPLquote = response;
                    console.log(response);
                }
            )

        }




    }
})();
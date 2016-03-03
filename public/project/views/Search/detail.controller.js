(function(){
    angular
        .module("StockPortfolioApp")
        .controller("DetailController", detailController);

    function detailController($scope, $routeParams, APIStockService) {

        $scope.Symbol = $routeParams.Symbol;

        APIStockService.findStockBySymbol(
            $scope.Symbol,
            function(response) {
                $scope.stock = response;
                console.log(response);
            }
        )
    }
})();
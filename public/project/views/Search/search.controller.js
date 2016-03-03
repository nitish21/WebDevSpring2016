(function(){
    angular
        .module("StockPortfolioApp")
        .controller("SearchController", searchController);

    function searchController($scope, $location, $routeParams, APIStockService) {
        $scope.search = search;
        $scope.searchString = $routeParams.searchString;

        //if(!$scope.title) {
        //    $scope.title = "Star Wars";
        //}

        if($scope.searchString) {
            search($scope.searchString);
        }

        function search(searchString) {

            console.log(searchString);

            APIStockService.searchStockBySearchString(
                searchString,
                function(response){
                    console.log(response);

                    $scope.stocks = response;
                });
        }

    }
})();
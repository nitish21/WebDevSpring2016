(function(){
    angular
        .module('StockPortfolioApp')
        .controller('MainController',MainController);

    function MainController($scope,$location) {
        $scope.$location = $location;
    }

})();
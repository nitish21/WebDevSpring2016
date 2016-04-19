(function(){
    angular
        .module("StockPortfolioApp")
        .controller("HeaderController", HeaderController);

    function HeaderController($scope,$rootScope,$location, UserService) {

        $scope.logout=function(){
            //$rootScope.user=null;

            UserService
                .logout()
                .then(
                    function(response){
                        $rootScope.user = null;
                        $location.url("/login");
                    },
                    function(err) {
                        $scope.error = err;
                    }
                );


        }
    }
})();
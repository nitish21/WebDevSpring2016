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
                        console.log("setting rootscope user to null");
                        $rootScope.user = null;
                        $rootScope.user = null;
                        $rootScope.user = null;
                        $rootScope.user = null;
                        $rootScope.user = null;
                        $rootScope.user = null;
                        $rootScope.user = null;
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
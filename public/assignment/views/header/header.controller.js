(function(){
    angular
        .module("FormBuilderApp")
        .controller("HeaderController", HeaderController);

    function HeaderController($scope,$rootScope) {

        $scope.logout=function(user){
            $rootScope.user=null;

        }
    }
})();
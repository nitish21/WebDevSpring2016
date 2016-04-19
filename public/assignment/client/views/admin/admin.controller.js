"use strict";

(function()
{
    angular
        .module("StockPortfolioApp")
        .controller("AdminController", AdminController);

    function AdminController($scope, UserService)
    {
        $scope.remove = remove;
        $scope.update = update;
        $scope.add    = add;
        $scope.select = select;

        init();

        function init() {
            UserService
                .findAllUsers()
                .then(handleSuccess, handleError);
        }

        function remove(user)
        {
            UserService
                .deleteUser(user._id)
                .then(handleSuccess, handleError);
        }

        function update(user)
        {
            UserService
                .updateUser(user._id, user)
                .then(handleSuccess, handleError);
        }

        function add(user)
        {
            UserService
                .createUser(user)
                .then(handleSuccess, handleError);
        }

        function select(user)
        {
            $scope.currentUser = angular.copy(user);
        }

        function handleSuccess(response) {
            $scope.users = response.data;
        }

        function handleError(error) {
            $scope.error = error;
        }
    }
})();
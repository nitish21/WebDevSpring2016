"use strict";

(function()
{
    angular
        .module("StockPortfolioApp")
        .controller("AdminController", AdminController);

    function AdminController($scope, UserService, CommentsService)
    {

        $scope.currentUser ={};

        $scope.comments = [];

        $scope.remove = remove;
        $scope.removeComment = removeComment;
        $scope.update = update;
        $scope.add    = add;
        $scope.select = select;

        init();

        function init() {
            UserService
                .findAllUsers()
                .then(handleSuccess, handleError);


            CommentsService
                .findAllAbusiveComments()
                .then(handleSuccessComments, handleError);
        }

        function remove(user)
        {
            UserService
                .deleteUserById(user._id)
                .then(handleSuccess, handleError);
        }


        function removeComment(comment)
        {
            CommentsService
                .deleteCommentByIdForAdmin(comment._id)
                .then(handleSuccessComments, handleError);
        }


        function update(user)
        {

            var newUser = angular.copy(user);

            UserService
                .updateUser(user._id, newUser)
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
            console.log(user);
            $scope.currentUser = angular.copy(user);
            console.log($scope.currentUser);
        }

        function handleSuccess(response) {
            console.log(response.data);
            $scope.users = response.data;
            $scope.currentUser ={};
        }


        function handleSuccessComments(response) {
            console.log(response.data);
            $scope.comments = response.data;
            //$scope.currentUser ={};
        }


        function handleError(error) {
            $scope.error = error;
        }
    }
})();
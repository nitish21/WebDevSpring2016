"use strict";

(function()
{
    angular
        .module("FormBuilderApp")
        .controller("AdminController", AdminController);

    function AdminController($scope, UserService)
    {

        var vm = this;
        $scope.sortType = 'username';
        $scope.sortReverse = false;
        $scope.selectedUserIndex = null;

        //vm.addUser = addUser;
        //vm.removeUser = removeUser;
        //vm.selectUser = selectUser;
        //vm.updateUser = updateUser;


        $scope.currentUser ={};

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
                .deleteUserById(user._id)
                .then(handleSuccess, handleError);
        }



        function update(user)
        {

            var newUser = angular.copy(user);

            delete newUser['_id'];

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

        function handleError(error) {
            $scope.error = error;
        }
    }
})();
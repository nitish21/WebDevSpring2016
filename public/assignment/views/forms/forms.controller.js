(function () {
    angular
        .module("FormBuilderApp")
        .controller("FormController", FormController);

    function FormController($scope, $rootScope , FormService) {

        $scope.addForm = addForm;
        $scope.updateForm = updateForm;
        $scope.deleteForm = deleteForm;
        $scope.selectForm = selectForm;
        $scope.forms=FormService.formsArray;

        function addForm(newForm){

            console.log("hello from create form controller");

            var loggedInUser = $rootScope.user;

            console.log("logged in user : " + loggedInUser);

            FormService.createFormForUser(
                loggedInUser._id,
                newForm,
                function(response){
                    console.log(response);
                    //$scope.data = response;
                });

        }

        function deleteForm(formToBeDeleted){

            console.log("hello from delete form controller");

            var loggedInUser = $rootScope.user;

            console.log("logged in user : " + loggedInUser);

            FormService.createFormForUser(
                loggedInUser._id,
                newForm,
                function(response){
                    console.log(response);
                    //$scope.data = response;
                });

        }

        function selectForm(index){

            console.log("hello from select form controller");

            var loggedInUser = $rootScope.user;

            console.log("logged in user : " + loggedInUser);

            FormService.createFormForUser(
                loggedInUser._id,
                newForm,
                function(response){
                    console.log(response);
                });
        }

        function updateForm(formToBeUpdated) {

            console.log("hello from form controller");

            var loggedInUser = $rootScope.user;

            console.log("logged in user : " + loggedInUser);

            FormService.updateFormById(
                formToBeUpdated._id,
                formToBeUpdated,
                function(response){
                    console.log(response);
                });
        }

    }
})();
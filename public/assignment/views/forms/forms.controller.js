(function () {
    angular
        .module("FormBuilderApp")
        .controller("FormController", FormController);

    function FormController($scope, $rootScope, $location, FormService) {

        $scope.addForm = addForm;
        $scope.updateForm = updateForm;
        $scope.deleteForm = deleteForm;
        $scope.selectForm = selectForm;
        $scope.forms=[];


        initialDisplayOfForms();


        function initialDisplayOfForms(){

            FormService.findAllFormsForUser(
                    $rootScope.user._id,
                    function (response) {
                        angular.copy(response, $scope.forms);
                    });

        }


        function addForm(newForm){

            console.log("hello from create form controller");

            var loggedInUser = $rootScope.user;

            console.log("logged in user : " + loggedInUser);



            FormService.createFormForUser(
                loggedInUser._id,
                newForm,
                function(response){
                    console.log(response);
                    $scope.forms.push(response);

                    $scope.form = {};
                    $scope.selectedIndex = null;

                });

        }

        function deleteForm(index){

            console.log("hello from delete form controller");

            var formToBeDeleted = $scope.forms[index];

            var loggedInUser = $rootScope.user;

            console.log("logged in user : " + loggedInUser);

            FormService.deleteFormById(
                formToBeDeleted._id,
                function(response){
                    $scope.forms = response;

                });

        }

        function selectForm(index){

            $scope.selectedIndex = index;
            console.log(index);

            $scope.form = {
                "_id": $scope.forms[index]._id,
                "title": $scope.forms[index].title,
                "userId": $scope.forms[index].userId
            };

        }

        function updateForm(formToBeUpdated) {

            console.log("hello from update Form controller");

            FormService.updateFormById(
                formToBeUpdated._id,
                formToBeUpdated,
                function(response){
                    console.log(response);
                    $scope.forms[$scope.selectedIndex] = response;
                });
        }

    }
})();
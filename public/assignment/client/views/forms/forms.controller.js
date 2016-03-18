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

            FormService.findAllFormsForUser($rootScope.user._id)
                .then(function (response) {
                    angular.copy(response.data, $scope.forms);
                });

        }


        function addForm(newForm){

            console.log("hello from create form controller");

            var loggedInUser = $rootScope.user;

            console.log("logged in user : " + loggedInUser);



            FormService.createFormForUser(
                loggedInUser._id,
                newForm)
                .then(function(response){
                    console.log(response.data);
                    $scope.forms.push(response.data);

                    $scope.form = {};
                    $scope.selectedIndex = null;

                });


        }

        function deleteForm(index){

            console.log("hello from delete form controller");

            var formToBeDeleted = $scope.forms[index];

            var loggedInUser = $rootScope.user;

            console.log("logged in user : " + loggedInUser);

            console.log("form to be deleted ID : " + formToBeDeleted._id);
            FormService.deleteFormById(
                formToBeDeleted._id)
                .then(function(response){

                    var formsOfUser = [];

                    getFormsForUser(response.data, loggedInUser._id, formsOfUser);

                    console.log(formsOfUser);

                    $scope.forms = formsOfUser;


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
                formToBeUpdated)
                .then(function(response){
                    console.log(response.data);
                    $scope.forms[$scope.selectedIndex] = response.data;
                });

        }


        function getFormsForUser(allForms, userId, formsOfUser) {

            for (var i = 0; i < allForms.length; i++) {

                var form = allForms[i];

                if(form.userId == userId){

                    formsOfUser.push(form);

                }
            }

        }


    }
})();
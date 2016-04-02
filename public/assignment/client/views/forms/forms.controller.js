(function () {
    angular
        .module("FormBuilderApp")
        .controller("FormController", FormController);

    function FormController($scope, $rootScope, $location, FormService) {


        var vm = this;
        vm.addForm = addForm;
        vm.updateForm = updateForm;
        vm.deleteForm = deleteForm;
        vm.selectForm = selectForm;
        vm.forms=[]


        initialDisplayOfForms();


        function initialDisplayOfForms(){

            FormService.findAllFormsForUser($rootScope.user._id)
                .then(function (response) {
                    angular.copy(response.data, vm.forms);
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
                    vm.forms.push(response.data);

                    vm.form = {};
                    vm.selectedIndex = null;

                });


        }

        function deleteForm(index){

            console.log("hello from delete form controller");

            var formToBeDeleted = vm.forms[index];

            var loggedInUser = $rootScope.user;

            console.log("logged in user : " + loggedInUser);

            console.log("form to be deleted ID : " + formToBeDeleted._id);
            FormService.deleteFormById(
                formToBeDeleted._id)
                .then(function(response){

                    console.log("inside then() of deleteFormById:");
                    console.log(response);
                    console.log(response.data);

                    var formsOfUser = [];

                    getFormsForUser(response.data, loggedInUser._id, formsOfUser);

                    console.log(formsOfUser);

                    vm.forms = formsOfUser;


                });


        }

        function selectForm(index){

            vm.selectedIndex = index;
            console.log(index);

            vm.form = {
                "_id": vm.forms[index]._id,
                "title": vm.forms[index].title,
                "userId": vm.forms[index].userId
            };

        }

        function updateForm(formToBeUpdated) {

            console.log("hello from update Form controller");

            var newForm = {};
            newForm.userId = formToBeUpdated.userId;
            newForm.title = formToBeUpdated.title;
            newForm.fields = formToBeUpdated.fields;
            newForm.created = formToBeUpdated.created;
            newForm.updated = formToBeUpdated.updated;


            FormService.updateFormById(
                formToBeUpdated._id,
                newForm)
                .then(function(response){
                    console.log(response.data);
                    vm.forms[vm.selectedIndex] = response.data;
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
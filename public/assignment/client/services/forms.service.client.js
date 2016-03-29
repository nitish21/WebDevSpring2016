(function(){
    angular
        .module("FormBuilderApp")
        .factory("FormService", FormService);

    function FormService($http) {

        var api = {
            createFormForUser: createFormForUser,
            findAllFormsForUser: findAllFormsForUser,
            deleteFormById: deleteFormById,
            updateFormById: updateFormById

        };


        return api;


        function createFormForUser(userId, form, callback){

            return $http.post("/api/assignment/user/"+userId+"/form", form);

        }

        function findAllFormsForUser(userId, callback){
            //Accepts parameter user id, and callback function
            //Iterates over the array of current forms looking for forms whose user id is parameter user id
            //Calls back with found forms for user id parameter, empty array otherwise

            return $http.get("/api/assignment/user/"+userId+"/form");

        }

        function deleteFormById(formId, callback){
            //Accepts parameter form id and callback function
            //Iterates over array of forms looking for form whose id is form id parameter
            //If found, removes form from current array of forms
            //Calls back with remaining array of forms

            var allForms =  $http.delete("/api/assignment/form/"+formId);
            console.log(allForms);
            return allForms;
        }

        function  updateFormById(formId, newForm, callback){
            //Accepts parameter form id, new form object, and callback function
            //Iterates over array of forms looking for form whose id is form id parameter
            //If found, updates form object with new form values
            //Calls back with update form

            return $http.put("/api/assignment/form/"+formId, newForm);


        }


    }
})();
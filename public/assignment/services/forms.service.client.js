(function(){
    angular
        .module("FormBuilderApp")
        .factory("FormService", FormService);

    function FormService() {

        var api = {
            createFormForUser: createFormForUser,
            findAllFormsForUser: findAllFormsForUser,
            deleteFormById: deleteFormById,
            updateFormById: updateFormById

        };

        var formsArray = [
            {"_id": "000", "title": "Contacts", "userId": 123},
            {"_id": "010", "title": "ToDo",     "userId": 123},
            {"_id": "020", "title": "CDs",      "userId": 234},
        ];

        return api;


        function createFormForUser(userId, form, callback){
            //Accepts parameters user id, form object, and callback function
            //Adds property called _id with unique id. You can use (new Date).getTime() to create a unique number
            //Adds property called userId equal to user id parameter
            //Adds new form to local array of forms
            //Calls back with new form

            var newForm = {
                "_id":(new Date).getTime(),
                "title":user.title,
                "userId":user.lastName
            };

            formsArray.push(newForm);

            callback(newForm);
        }

        function findAllFormsForUser(userId, callback){
            //Accepts parameter user id, and callback function
            //Iterates over the array of current forms looking for forms whose user id is parameter user id
            //Calls back with found forms for user id parameter, empty array otherwise

            var formsMatchingUserId = [];

            for (var i = 0; i < formsArray.length; i++) {

                var form = formsArray[i];

                if(form.userId == userId){

                    formsMatchingUserId.push(form);

                }
            }

            callback(formsMatchingUserId);

        }

        function deleteFormById(formId, callback){
            //Accepts parameter form id and callback function
            //Iterates over array of forms looking for form whose id is form id parameter
            //If found, removes form from current array of forms
            //Calls back with remaining array of forms

            for (var i = 0; i < formsArray.length; i++) {

                var form = formsArray[i];

                if(form._id == formId){

                    formsArray.splice(i, 1);

                }
            }

            callback(formsArray);

        }

        function  updateFormById(formId, newForm, callback){
            //Accepts parameter form id, new form object, and callback function
            //Iterates over array of forms looking for form whose id is form id parameter
            //If found, updates form object with new form values
            //Calls back with update form

            for (var i = 0; i < formsArray.length; i++) {

                var updatedForm = formsArray[i];

                if(updatedForm._id == formId){

                    updatedForm = {
                        "_id":newForm._id,
                        "title":newForm.title,
                        "userId":newForm.userId
                    };

                    callback(updatedForm);

                }

            }

            callback(null);


        }


    }
})();
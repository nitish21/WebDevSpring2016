var forms = require("./form.mock.json");

module.exports = function(){
    var api = {
        createFormForUser: createFormForUser,
        findAllFormsForUser: findAllFormsForUser,
        findFormById : findFormById,
        deleteFormById: deleteFormById,
        updateFormById: updateFormById

    }

    return api;

    function createFormForUser(userId, form) {

        var newForm = {
            "_id":(new Date).getTime(),
            "title":form.title,
            "userId":userId
        };

        forms.push(newForm);

        return newForm;
    }

    function findAllFormsForUser(userId) {


        var formsMatchingUserId = [];

        for (var i = 0; i < forms.length; i++) {

            var form = forms[i];

            if(form.userId == userId){

                formsMatchingUserId.push(form);

            }
        }

        return formsMatchingUserId;


    }



    function findFormById(formId) {


        for (var i = 0; i < forms.length; i++) {

            var form = forms[i];

            if(form._id == formId){

                return form;

            }
        }

        return null;


    }



    function deleteFormById(formId) {

        for (var i = 0; i < forms.length; i++) {

            var form = forms[i];

            if(form._id == formId){

                forms.splice(i, 1);
                break;
            }
        }

        return forms;

    }

    function updateFormById(formId, newForm) {

        for (var i = 0; i < forms.length; i++) {

            var updatedForm = forms[i];

            if(updatedForm._id == formId){

                updatedForm = {
                    "_id":newForm._id,
                    "title":newForm.title,
                    "userId":newForm.userId
                };

                return updatedForm;

            }

        }
    }
}
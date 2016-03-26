var forms = require("./form.mock.json");

module.exports = function(){
    var api = {
        createFormForUser: createFormForUser,
        findAllFormsForUser: findAllFormsForUser,
        findFormById : findFormById,
        deleteFormById: deleteFormById,
        updateFormById: updateFormById,
        getFieldsOfForm : getFieldsOfForm,
        deleteFieldByIds:deleteFieldByIds,
        findFieldByIds : findFieldByIds,
        createFieldForForm : createFieldForForm,
        updateFieldByIds : updateFieldByIds

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

                forms[i] = {
                    "_id":newForm._id,
                    "title":newForm.title,
                    "userId":newForm.userId
                };

                return updatedForm;

            }

        }
    }

////////////////////////// FIELDS FROM HERE /////////////////////////////////////

    function getFieldsOfForm(formId) {

        var fields = [];

        for (var i = 0; i < forms.length; i++) {

            var form = forms[i];

            if(form._id == formId){

                fields = form.fields;

                return fields;

            }

        }
    }


    function createFieldForForm(formId, field) {

        var newField = {
            "_id":(new Date).getTime(),
            "label": field.label,
            "type": field.type,
            "placeholder": field.placeholder,
            "options" : field.options

        };

        console.log("creating new field....");
        console.log(newField);

        for(var i=0;i<forms.length;i++){

            var currentForm = forms[i];

            if(currentForm._id == formId) {
                currentForm.fields.push(newField);
                console.log("werytuiytrewrtyu");
                console.log(currentForm.fields);
            }
        }

        return newField;
    }


    function findFieldByIds(formId, fieldId) {

        for (var i = 0; i < forms.length; i++) {

            var form = forms[i];

            if(form._id == formId){

                var allFields = form.fields;

                for (var j = 0; j < allFields.length; j++) {

                    var field = allFields[j];

                    if(field._id == fieldId){
                        return field;
                    }

                }

            }
        }

        return null;



    }



    function updateFieldByIds(formId, fieldId, newField) {

        var field = null;
        for (var i = 0; i < forms.length; i++) {

            var updatedForm = forms[i];

            if(updatedForm._id == formId){

                var allFields = updatedForm.fields;

                for (var j = 0; j < allFields.length; j++) {

                    field = allFields[j];

                    if(field._id == fieldId){

                        allFields[j] = {
                            "_id":newField._id,
                            "label":newField.label,
                            "placeholder":newField.placeholder,
                            "options":newField.options,
                            "type":newField.type
                        };
                        console.log(updatedForm);

                        return field;
                    }

                }

            }

        }
    }



    function deleteFieldByIds(formId, fieldId) {

        for (var i = 0; i < forms.length; i++) {

            var updatedForm = forms[i];

            if(updatedForm._id == formId){

                var allFields = updatedForm.fields;

                for (var j = 0; j < allFields.length; j++) {

                    var field = allFields[j];

                    if(field._id == fieldId){

                        allFields.splice(i, 1);


                        return allFields;
                    }

                }


            }

        }



    }









}
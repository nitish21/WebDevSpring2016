module.exports = function(formModel) {

    var Form = formModel.getMongooseModel();

    var api = {

        getFieldsOfForm : getFieldsOfForm,
        deleteFieldByIds:deleteFieldByIds,
        findFieldByIds : findFieldByIds,
        createFieldForForm : createFieldForForm,
        updateFieldByIds : updateFieldByIds


    };

    return api;


    function getFieldsOfForm(formId) {
        // use select() to retrieve a particular field
        return Form.findById(formId).select("fields");
    }


    function findFieldByIds(formId, fieldId) {
        return Form
            .findById(formId)
            .then(
                function(form){
                    return form.fields.id(fieldId);
                }
            );
    }

    function deleteFieldByIds(formId, fieldId) {
        return Form
            .findById(formId)
            .then(
                function(form){
                    form.fields.id(fieldId).remove();
                    return form.save();
                }
            );
    }



    function createFieldForForm(formId, field) {
        return Form.findById(formId)
            .then(
                function(form) {
                    form.fields.push(field);
                    return form.save();
                }
            );
    }


    function updateFieldByIds(formId, fieldObj) {
        return Form
            .findById(formId)
            .then(
                function(form){
                    var field   = form.fields.id(fieldObj._id);
                    field.label  = fieldObj.label;
                    field.type = fieldObj.type;
                    field.placeholder = fieldObj.placeholder;
                    field.options = fieldObj.options;
                    return form.save();
                }
            );
    }


};
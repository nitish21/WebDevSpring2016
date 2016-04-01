module.exports = function(formModel) {

    var Form = formModel.getMongooseModel();

    var api = {

        getFieldsOfForm : getFieldsOfForm,
        deleteFieldByIds:deleteFieldByIds,
        findFieldByIds : findFieldByIds,
        createFieldForForm : createFieldForForm,
        updateFieldByIds : updateFieldByIds,
        ReorderFormFields : ReorderFormFields

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


    function updateFieldByIds(formId, fieldId, fieldObj) {
        return Form
            .findById(formId)
            .then(
                function(form){

                    console.log(form);
                    var field   = form.fields.id(fieldId);
                    console.log("////////////////////////////");
                    console.log(fieldObj._id);
                    console.log(field);
                    console.log("////////////////////////////");
                    field.label  = fieldObj.label;
                    field.type = fieldObj.type;
                    field.placeholder = fieldObj.placeholder;
                    field.options = fieldObj.options;

                    console.log("inside updateFieldByIds of field model : ");
                    console.log(field);
                    console.log("*********");
                    return form.save();
                }
            );
    }

    function ReorderFormFields(formId, fields){

        //res.json(fieldModel.ReorderFormFields(req.params["formId"],req.body));

        return  Form
                .findById(formId)
                .then(
                    function(form){

                        console.log(form);

                        form.fields = fields;

                        return form.save();
                    }
                );

    }


};
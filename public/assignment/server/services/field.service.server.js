//var formModel = require("./../models/form.model.js")();

module.exports = function(app, formModel){

    app.get("/api/assignment/form/:formId/field",getFieldsForForm);//returns an array of fields belonging to a form object based on formId
    app.get("/api/assignment/form/:formId/field/:fieldId", getFieldForForm);//return field object from formId and fieldId
    app.post("/api/assignment/form/:formId/field",createFieldForForm);// creating a new field for a form
    app.put("/api/assignment/form/:formId/field/:fieldId", updateField);//updating a field given fieldId, formId and details in request body
    app.delete("/api/assignment/form/:formId/field/:fieldId",deleteFieldFromForm);//deleting a field given fieldId, formId


    var fieldModel = require("./../models/field.model.server.js")(formModel);

    function getFieldsForForm (req, res) {

        console.log("inside getFieldsOfForm of fields server service");

        var formId = req.params.formId;

        //var fields = fieldModel.getFieldsOfForm(formId);

        fieldModel.getFieldsOfForm(formId)
            .then(function(form) {
                console.log("inside then() of getFieldsOfForm in server servic : e");
                    console.log(form);
                    console.log("*************");
                    res.json(form.fields);
                },
                function(err) {
                    res.status(400).send(err);
                });

        //res.json(fields);

    }


    function createFieldForForm(req, res){

        console.log("inside  createFieldForForm of fields server service ");

        var newField = req.body;

        var formId = req.params.formId;

        //var field = fieldModel.createFieldForForm(formId,newField);

        fieldModel.createFieldForForm(formId,newField)
            .then(function (field) {
                    console.log(field);
                    res.json (field);
                },
                function (err) {
                    res.status(400).send(err);
                });


        //res.json(field);

    }


    function getFieldForForm (req, res) {

        console.log("inside  getFormById of forms server service ");

        //var field = fieldModel.findFieldByIds(req.params.formId,req.params.fieldId);

        fieldModel.findFieldByIds(req.params.formId,req.params.fieldId)
            .then(function (field) {
                    res.json (field);
                },
                function (err) {
                    res.status(400).send(err);
                });

        //res.json(field);

    }

    function updateField (req, res) {

        console.log("inside updateForm of forms server service ");

        var newField = req.body;

        var field = fieldModel.updateFieldByIds(req.params.formId, req.params.fieldId, newField);

        fieldModel.updateFieldByIds(req.params.formId, req.params.fieldId, newField)
            .then(function (stats) {
                    //res.json (field);

                    deferred.resolve();
                },
                function (err) {
                    res.status(400).send(err);
                });


        console.log("updated field : ");
        console.log(field);

        res.json(field);

    }

    function deleteFieldFromForm (req, res) {

        console.log("inside deleteField of fields server service ");

        var fields = fieldModel.deleteFieldByIds(req.params.formId,req.params.fieldId);

        res.json(fields);

    }
}
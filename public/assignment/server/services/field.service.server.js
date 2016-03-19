var formModel = require("./../models/form.model.js")();

module.exports = function(app){

    app.get("/api/assignment/form/:formId/field",getFieldsForForm);//returns an array of fields belonging to a form object based on formId
    app.get("/api/assignment/form/:formId/field/:fieldId", getFieldForForm);//return field object from formId and fieldId
    app.post("/api/assignment/form/:formId/field",createFieldForForm);// creating a new field for a form
    app.put("/api/assignment/form/:formId/field/:fieldId", updateField);//updating a field given fieldId, formId and details in request body
    app.delete("/api/assignment/form/:formId/field/:fieldId",deleteFieldFromForm);//deleting a field given fieldId, formId


    function getFieldsForForm (req, res) {

        console.log("inside getFieldsOfForm of fields server service");

        var formId = req.params.formId;

        var fields = formModel.getFieldsOfForm(formId);

        res.json(fields);

    }


    function createFieldForForm(req, res){

        console.log("inside  createFieldForForm of fields server service ");

        var newField = req.body;

        var formId = req.params.formId;

        var field = formModel.createFieldForForm(formId,newField);

        res.json(field);

    }


    function getFieldForForm (req, res) {

        console.log("inside  getFormById of forms server service ");

        var field = formModel.findFieldByIds(req.params.formId,req.params.fieldId);

        res.json(field);

    }

    function updateField (req, res) {

        console.log("inside updateForm of forms server service ");

        var newField = req.body;

        var field = formModel.updateFieldByIds(req.params.formId, req.params.fieldId, newField);

        console.log("updated field : ");
        console.log(field);

        res.json(field);

    }

    function deleteFieldFromForm (req, res) {

        console.log("inside deleteField of fields server service ");

        var fields = formModel.deleteFieldByIds(req.params.formId,req.params.fieldId);

        res.json(fields);

    }
}
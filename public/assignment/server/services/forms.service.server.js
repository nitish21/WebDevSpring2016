module.exports = function(app, formModel){

    app.get("/api/assignment/user/:userId/form",getFormsForUser);
    app.get("/api/assignment/form/:formId", getFormById);
    app.post("/api/assignment/user/:userId/form",createFormForUser);
    app.put("/api/assignment/form/:formId", updateForm);
    app.delete("/api/assignment/form/:formId",deleteForm);
    //app.put("/api/assignment/form/:formId/field", ReorderFormFields);

    function getFormsForUser (req, res) {

        console.log("inside getFormsForUser of forms server service ");

        var userId = req.params.userId;

        formModel.findAllFormsForUser(userId)
            .then(function(forms) {
                    res.json(forms);
                },
                function(err) {
                    res.status(400).send(err);
                });

        //res.json(forms);
    }


    function createFormForUser(req, res){

        console.log("inside  createFormForUser of forms server service ");

        var newForm = req.body;

        var userId = req.params.userId;

        formModel.createFormForUser(userId,newForm)
            .then(function (form) {
                    res.json (form);
                },
                function (err) {
                    res.status(400).send(err);
                });

    }


    function getFormById (req, res) {

        console.log("inside  getFormById of forms server service ");

        formModel.findFormById(req.params.formId).
            then(function (form) {
                res.json (form);
            },
            function (err) {
                res.status(400).send(err);
            });

    }

    function updateForm (req, res) {

        console.log("inside updateForm of forms server service ");

        var newForm = req.body;

        formModel.updateFormById(req.params.formId, newForm)
            .then(function (forms) {
                    res.json (forms);
                },
                function (err) {
                    res.status(400).send(err);
                });

        //console.log("updated form : ");
        //console.log(form);
        //
        //res.json(form);

    }

    function deleteForm (req, res) {

        console.log("inside deleteForm of forms server service ");

        var formId = req.params.formId;

        console.log("form id is" +formId);

        formModel.deleteFormById(req.params.formId)
            .then(function (forms) {
                    console.log("formModel.deleteFormById returns ");
                    //console.log(response.result);
                    //res.send(200);
                    return res.json(forms);
                },
                function (err) {
                    res.status(400).send(err);
                });

        //res.json(forms);

    }

    //function ReorderFormFields(req,res){
    //
    //    res.json(fieldModel.ReorderFormFields(req.params["formId"],req.body));
    //}


}
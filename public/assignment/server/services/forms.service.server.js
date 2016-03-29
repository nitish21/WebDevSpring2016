module.exports = function(app, formModel){

    app.get("/api/assignment/user/:userId/form",getFormsForUser);
    app.get("/api/assignment/form/:formId", getFormById);
    app.post("/api/assignment/user/:userId/form",createFormForUser);
    app.put("/api/assignment/form/:formId", updateForm);
    app.delete("/api/assignment/form/:formId",deleteForm);


    function getFormsForUser (req, res) {

        console.log("inside getFormsForUser of forms server service ");

        var userId = req.params.userId;

        var forms = formModel.findAllFormsForUser(userId);

        res.json(forms);
    }


    function createFormForUser(req, res){

        console.log("inside  createFormForUser of forms server service ");

        var newForm = req.body;

        var userId = req.params.userId;

        var form = formModel.createFormForUser(userId,newForm);

        res.json(form);
    }


    function getFormById (req, res) {

        console.log("inside  getFormById of forms server service ");

        var form = formModel.findFormById(req.params.formId);

        res.json(form);

    }

    function updateForm (req, res) {

        console.log("inside updateForm of forms server service ");

        var newForm = req.body;

        var form = formModel.updateFormById(req.params.formId, newForm);

        console.log("updated form : ");
        console.log(form);

        res.json(form);

    }

    function deleteForm (req, res) {

        console.log("inside deleteForm of forms server service ");

        var formId = req.params.formId;

        var forms = formModel.deleteFormById(req.params.formId);


        console.log("qwertyuiuytrewertyu");
        for(var i=0;i<forms.length;i++){
            console.log("qwertyuiuytrewertyu");
            console.log(forms[i]._id);
        }

        res.json(forms);

    }
}
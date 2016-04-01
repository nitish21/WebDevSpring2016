(function() {
    angular
        .module("FormBuilderApp")
        .factory("FieldService", FieldService);

    function FieldService($http) {

        var api = {
            createFieldForForm: createFieldForForm,
            getFieldsForForm: getFieldsForForm,
            getFieldForForm: getFieldForForm,
            deleteFieldFromForm: deleteFieldFromForm,
            updateField: updateField,
            reorderFields: reorderFields
        };

        return api;

        function createFieldForForm(formId, field) {

            return $http.post("/api/assignment/form/"+formId+"/field", field);

        }

        function getFieldsForForm(formId) {

            return $http.get("/api/assignment/form/"+formId+"/field");
        }

        function getFieldForForm(formId, fieldId) {

            return $http.get("/api/assignment/form/"+formId+"/field/"+fieldId);

        }

        function deleteFieldFromForm(formId,fieldId) {

            return $http.delete("/api/assignment/form/"+formId+"/field/"+fieldId);
        }

        function updateField(formId, fieldId, newField) {

            return $http.put(" /api/assignment/form/"+formId+"/field/"+fieldId, newField);
        }


        function reorderFields(formId,fields){

            console.log("inside reorder fields...........");
            var url = "/api/assignment/form/" + formId + "/field";
            return $http.put(url,fields);


           // var url = "/api/assignment/form/" + formId + "/field";
           //$http.put(url, fields).success(function (response) {
           //         defer.resolve(response);
           //     });
           // return defer.promise;

       }

    }
})();
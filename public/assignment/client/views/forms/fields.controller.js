(function (){
    angular
        .module("FormBuilderApp")
        .controller("FieldController",FieldController);

    function FieldController($routeParams, $scope, $rootScope, FieldService){
        var vm = this;

        var formId = $routeParams.formId;

        vm.addField = addField;
        vm.updateField = updateField;
        vm.removeField = deleteField;
        vm.editField = editField;
        vm.fields=[];


        initialDisplayOfForms();


        function initialDisplayOfForms(){
            console.log(formId);
            getFieldsForForm(formId);

        }


        function getFieldsForForm(formId) {

            FieldService.getFieldsForForm(formId)
                .then(
                    function (response) {
                        vm.fields = response.data;
                        console.log("meow");
                        console.log(response.data);
                        console.log("moewwww");
                        //console.log($scope.fields);
                    }
                )
        }


        function addField(fieldType) {

            var field;

            console.log("fieldType:"+fieldType);

            if(!fieldType) {
                return;
            }

            if(fieldType == "singleLineText"){
                field = {

                    "label": "New Text Field",
                    "type": "TEXT",
                    "placeholder": "New Field"
                };

            }

            if(fieldType == "singleLineText"){
                field = {

                    "label": "New Text Field",
                    "type": "TEXTAREA",
                    "placeholder": "New Field"
                };
            }

            if(fieldType == "date"){

                field = {

                    "label": "New Date Field",
                    "type": "DATE"
                };


            }

            if(fieldType == "dropdown"){

                field = {
                    "label": "New Dropdown", "type": "OPTIONS", "options": [
                        {"label": "Option 1", "value": "OPTION_1"},
                        {"label": "Option 2", "value": "OPTION_2"},
                        {"label": "Option 3", "value": "OPTION_3"}
                    ]
                };

            }


            if(fieldType == "checkbox"){

                field = {
                    "label": "New Checkboxes", "type": "CHECKBOXES", "options": [
                        {"label": "Option A", "value": "OPTION_A"},
                        {"label": "Option B", "value": "OPTION_B"},
                        {"label": "Option C", "value": "OPTION_C"}
                    ]
                };

            }

            if(fieldType == "radioButtons"){

                field = {
                    "label": "New Radio Buttons", "type": "RADIOS", "options": [
                        {"label": "Option X", "value": "OPTION_X"},
                        {"label": "Option Y", "value": "OPTION_Y"},
                        {"label": "Option Z", "value": "OPTION_Z"}
                    ]
                };

            }


            //console.log("current field value" + field.label);

            FieldService.createFieldForForm(formId, field)
                .then(
                    function (response) {
                        console.log(response.data);
                        //$scope.fields = response.data;
                        getFieldsForForm(formId);
                    }
                )

        }



        function editField(fieldId) {

            console.log("formId : " + formId);
            console.log("fieldId : " + fieldId);

            FieldService.getFieldForForm(formId,fieldId)
                .then(
                    function (response) {
                        console.log("inside then() of editField");
                        console.log(response.data);
                        vm.myModalField = response.data;///////
                        console.log(vm.myModalField);
                        vm.myModalField.options = JSON.stringify(vm.myModalField.options);///////////
                    }
                );

        }

        function updateField(newField) {
            if(newField.options){
                newField.options = JSON.parse(newField.options);
            }

            var myField = {};
            myField.label = newField.label;
            myField.type = newField.type;
            myField.placeholder = newField.placeholder;
            myField.options = newField.options;

            FieldService.updateField(formId,newField._id,myField)
                .then(
                    function (response) {
                        console.log("inside updateField :");
                        console.log(response.data);
                        vm.myModalField = response.data;
                        getFieldsForForm(formId);
                    }
                );
        }

        function deleteField(fieldId) {
            FieldService.deleteFieldFromForm(formId,fieldId)
                .then(
                    function (response) {
                        vm.fields = response.data;
                    }
                );
        }

        $scope.$watch('model.fields', function (newValue, oldValue) {

            console.log("meowwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww");

            console.log(newValue);
            console.log(oldValue);

            if(newValue.length == oldValue.length) {

                FieldService.reorderFields(formId, newValue)
                    .then(function (response) {
                        vm.fields = response.data;
                    });
            }


        }, true);



    }
})();
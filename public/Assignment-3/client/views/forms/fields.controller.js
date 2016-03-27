/**
 * Created by amala on 28/02/16.
 */
(function () {
    'use strict';

    /*global angular*/
    angular
        .module("FormBuilderApp")
        .controller("FieldsController", fieldsController);

    function fieldsController($location, $scope, FieldService, $routeParams) {
        var formId = $routeParams.formId;
        FieldService.getFormById(formId)
            .then(function(response1){
                $scope.selectedForm = response1.data;
                FieldService.getFieldsForForm(formId)
                    .then(function (response2) {
                        $scope.model = {fieldType: null, fields: response2.data};
                        $scope.$location = $location;
                        $(function() {
                            console.log("sorting done");
                            $("#fields-sortable" ).sortable();
                            $("#fields-sortable" ).disableSelection();
                        });
                    });
            });

        $scope.addField = addField;
        $scope.deleteField = deleteField;
        $scope.modalOptionsText = modalOptionsText;
        $scope.submitFormField = submitFormField;

        $scope.singleLineText = "Single Line Text";
        $scope.dateText = "Date";
        $scope.dropdownText = "Dropdown";
        $scope.checkboxText = "Checkboxes";
        $scope.radioText = "Radio buttons";
        $scope.multiLineText = "Paragraph Text Field";

        $scope.singleLineTextField = {"_id": null, "label": "New Text Field", "type": "TEXT", "placeholder": "New Field"};
        $scope.emailField = {"_id": null, "label": "New Text Field", "type": "EMAIL", "placeholder": "New Field"};
        $scope.multiLineTextField = {"_id": null, "label": "New Text Field", "type": "TEXTAREA", "placeholder": "New Field"};
        $scope.dateField = {"_id": null, "label": "New Date Field", "type": "DATE"};
        $scope.dropdownField = {"_id": null, "label": "New Dropdown", "type": "OPTIONS",
            "options": [
                {"label": "Option 1", "value": "OPTION_1"},
                {"label": "Option 2", "value": "OPTION_2"},
                {"label": "Option 3", "value": "OPTION_3"}
            ]
        };
        $scope.checkboxField = {"_id": null, "label": "New Checkboxes", "type": "CHECKBOX",
            "options": [
                {"label": "Option A", "value": "OPTION_A"},
                {"label": "Option B", "value": "OPTION_B"},
                {"label": "Option C", "value": "OPTION_C"}
            ]
        };
        $scope.radioButtonField = {"_id": null, "label": "New Radio Buttons", "type": "RADIO",
            "options": [
                {"label": "Option X", "value": "OPTION_X"},
                {"label": "Option Y", "value": "OPTION_Y"},
                {"label": "Option Z", "value": "OPTION_Z"}
            ]
        };

        function addField(fieldType) {
            console.log(fieldType);
            if (fieldType === $scope.singleLineText) {
                $scope.model.fields.push($scope.singleLineTextField);
            } else if (fieldType === $scope.dateText) {
                $scope.model.fields.push($scope.dateField);
            } else if (fieldType === $scope.dropdownText) {
                $scope.model.fields.push($scope.dropdownField);
            } else if (fieldType === $scope.checkboxText) {
                $scope.model.fields.push($scope.checkboxField);
            } else if (fieldType === $scope.radioText) {
                $scope.model.fields.push($scope.radioButtonField);
            } else if (fieldType === $scope.multiLineText) {
                $scope.model.fields.push($scope.multiLineTextField);
            }
        }

        //    FieldService.createFieldForForm(user._id, form)
        //        .then(function (response) {
        //            $scope.forms.push(response.data);
        //        });
        //}

        function deleteField(field) {
            console.log("remove: " + index);
            $scope.forms.splice(index, 1);
        }

        function modalOptionsText(field) {
            console.log("reached here");
            var text = "";
            for (var i in field.options) {
                text += field.options[i].label + ":" + field.options[i].value + "\n";
            }
            return text;
        }

        function submitFormField(modalFormId, field) {

        }
    }
}());
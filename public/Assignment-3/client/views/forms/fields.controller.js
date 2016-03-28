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
                            $("#fields-sortable").sortable({
                                update: function (event, ui) {
                                    //var data = $(this).sortable('serialize');
                                    var data = $(this).sortable("toArray");
                                    console.log(data);
                                    //// POST to server using $.post or $.ajax
                                    //$.ajax({
                                    //    data: data,
                                    //    type: 'POST',
                                    //    url: '/your/url/here'
                                    //});
                                }
                            });
                            $("#fields-sortable" ).disableSelection();
                        });
                    });
            });

        $scope.addField = addField;
        $scope.deleteField = deleteField;
        $scope.updateField = updateField;
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

        function updateField(field) {
            FieldService.updateField(formId, field._id, field)
                .then(function (response) {
                    $scope.$location = $location;
                });
        }

        function deleteField(field) {
            FieldService.deleteFieldFromForm(formId, field._id)
                .then(function (response) {
                    $scope.model.fields = response.data;
                });
            //$scope.model.splice(index, 1);
        }

        function modalOptionsText(field) {
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
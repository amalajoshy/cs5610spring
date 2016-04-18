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
                                    FieldService.sortFieldsInForm(formId, data);
                                }
                            });
                            $("#fields-sortable" ).disableSelection();
                        });
                    });
            });

        $scope.addField = addField;
        $scope.deleteField = deleteField;
        $scope.updateField = updateField;
        $scope.setOptionsText = setOptionsText;

        $scope.singleLineText = "Single Line Text";
        $scope.dateText = "Date";
        $scope.dropdownText = "Dropdown";
        $scope.checkboxText = "Checkboxes";
        $scope.radioText = "Radio buttons";
        $scope.multiLineText = "Paragraph Text Field";

        $scope.singleLineTextField = {"label": "New Text Field", "type": "TEXT", "placeholder": "New Field"};
        $scope.emailField = {"label": "New Text Field", "type": "EMAIL", "placeholder": "New Field"};
        $scope.multiLineTextField = {"label": "New Text Field", "type": "TEXTAREA", "placeholder": "New Field"};
        $scope.dateField = {"label": "New Date Field", "type": "DATE"};
        $scope.dropdownField = {"label": "New Dropdown", "type": "OPTIONS",
            "options": [
                {"label": "Option 1", "value": "OPTION_1"},
                {"label": "Option 2", "value": "OPTION_2"},
                {"label": "Option 3", "value": "OPTION_3"}
            ]
        };
        $scope.checkboxField = {"label": "New Checkboxes", "type": "CHECKBOX",
            "options": [
                {"label": "Option A", "value": "OPTION_A"},
                {"label": "Option B", "value": "OPTION_B"},
                {"label": "Option C", "value": "OPTION_C"}
            ]
        };
        $scope.radioButtonField = {"label": "New Radio Buttons", "type": "RADIO",
            "options": [
                {"label": "Option X", "value": "OPTION_X"},
                {"label": "Option Y", "value": "OPTION_Y"},
                {"label": "Option Z", "value": "OPTION_Z"}
            ]
        };

        function addField(fieldType) {
            console.log(fieldType);
            if (fieldType === $scope.singleLineText) {
                FieldService.createFieldForForm(formId, $scope.singleLineTextField)
                    .then(function(response) {
                        $scope.model.fields = response.data;
                    });
            } else if (fieldType === $scope.dateText) {
                FieldService.createFieldForForm(formId, $scope.dateField)
                    .then(function(response) {
                        $scope.model.fields = response.data;
                    });
            } else if (fieldType === $scope.dropdownText) {
                FieldService.createFieldForForm(formId, $scope.dropdownField)
                    .then(function(response) {
                        $scope.model.fields = response.data;
                    });
            } else if (fieldType === $scope.checkboxText) {
                FieldService.createFieldForForm(formId, $scope.checkboxField)
                    .then(function(response) {
                        $scope.model.fields = response.data;
                    });
            } else if (fieldType === $scope.radioText) {
                FieldService.createFieldForForm(formId, $scope.radioButtonField)
                    .then(function(response) {
                        $scope.model.fields = response.data;
                    });
            } else if (fieldType === $scope.multiLineText) {
                FieldService.createFieldForForm(formId, $scope.multiLineTextField)
                    .then(function(response) {
                        $scope.model.fields = response.data;
                    });
            }
        }

        function updateField(field) {
            if ($scope.currentFieldOptionsText) {
                var options = [];
                var lines = $scope.currentFieldOptionsText.split('\n');
                for (var i in lines) {
                    var option = lines[i].split(':');
                    if (option.length == 2) {
                        options.push({"label": option[0], "value": option[1]});
                    }
                }
                field.options = options;
            }
            FieldService.updateField(formId, field._id, field)
                .then(function (response) {
                    field = response.data;
                });
        }

        function deleteField(field) {
            FieldService.deleteFieldFromForm(formId, field._id)
                .then(function (response) {
                    $scope.model.fields = response.data;
                });
            //$scope.model.splice(index, 1);
        }

        function setOptionsText(field) {
            if (field.options) {
                var text = "";
                for (var i in field.options) {
                    text += field.options[i].label + ':' + field.options[i].value + '\n';
                }
                $scope.currentFieldOptionsText = $.trim(text);
            } else {
                $scope.currentFieldOptionsText = null;
            }
        }
    }
}());
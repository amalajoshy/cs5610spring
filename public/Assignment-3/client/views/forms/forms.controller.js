/**
 * Created by amala on 17/02/16.
 */
(function () {
    'use strict';
    /*global angular*/
    angular
        .module("FormBuilderApp")
        .controller("FormsController", formsController);

    function formsController($scope, $location, FormService, $rootScope) {
        $scope.addForm = addForm;
        $scope.updateForm = updateForm;
        $scope.deleteForm = deleteForm;
        $scope.selectForm = selectForm;
        $scope.openForm = openForm;

        var user = $rootScope.currentUser;
        FormService.findAllFormsForUser(user._id)
            .then(function (response) {
                $scope.forms = response.data;
            });

        function addForm(form) {
            FormService.createFormForUser(user._id, form)
                .then(function (response) {
                    $scope.forms.push(response.data);
                });
        }

        function updateForm(formId, form) {
            FormService.updateFormById(formId, form)
                .then(function (response) {
                    $scope.forms = response.data;
                    // do we need the following??
                    //$scope.form.f_id = null;
                    //$scope.form.title = null;
                });
        }

        function deleteForm(index) {
            console.log("remove: " + index);
            $scope.forms.splice(index, 1);
        }

        function selectForm(form, index) {
            $scope.selectedFormIndex = index;
            $scope.form = $.extend(true, {}, form);
            $scope.form.f_id = $scope.forms[index].f_id;
            $scope.form.title = $scope.forms[index].title;
        }
        function openForm(index) {
            $scope.selectedFormIndex = index;
            console.log("remove: " + index);
            $scope.forms.splice(index, 1);
        }

    }
}());
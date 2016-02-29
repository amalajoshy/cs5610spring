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

        var user = $rootScope.currentUser;
        var userId = user._id;
        console.log("selected form index: " + $scope.selectedFormIndex);
        $scope.forms = FormService.findAllFormsForUser(userId, $.noop);

        function addForm(form) {
            var new_form = FormService.createFormForUser(userId, form, $.noop);
            console.log("form added!!");
            $scope.forms.push(new_form);
            console.log($scope.forms);
        }

        function updateForm(form) {
            var formId = FormService.getFormId(form);
            var updated_form = FormService.updateFormById(formId, form, $.noop);
            console.log(updated_form);
            console.log("form updated!!");
            $scope.form.f_id = null;
            $scope.form.title = null;
        }

        function deleteForm(index) {
            console.log("remove: " + index);
            $scope.forms.splice(index, 1);
        }

        function selectForm(form, index) {
            $scope.selectedFormIndex = index;
            $scope.form.f_id = $scope.forms[index].f_id;
            $scope.form.title = $scope.forms[index].title;
        }
    }
}());
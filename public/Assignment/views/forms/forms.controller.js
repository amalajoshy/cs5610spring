/**
 * Created by amala on 17/02/16.
 */
(function () {
    'use strict';
    /*global angular*/
    angular
        .module("FormBuilderApp")
        .controller("FormsController", formsController);

        function formsController($scope, $location, FormService, $rootScope){
            console.log("reached here");
            $scope.addForm = addForm;
            $scope.updateForm = updateForm;
            $scope.deleteForm = deleteForm;
            $scope.selectForm = selectForm;

            //var currentUser = $rootScope.currentUser;
            $scope.forms = [{title: "test"}, {title: "test-2"}];

            function addForm(form) {
                return;
            }
            function updateForm(form) {
                return;
            }
            function deleteForm(index) {
                return;
            }
            function selectForm(index) {
                return;
            }
        }

}());
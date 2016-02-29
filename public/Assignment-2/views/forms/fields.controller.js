/**
 * Created by amala on 28/02/16.
 */
(function () {
    'use strict';

    /*global angular*/
    angular
        .module("FormBuilderApp")
        .controller("FieldsController", fieldsController);

    function fieldsController($location, $scope) {
        $scope.$location = $location;
    }
}());
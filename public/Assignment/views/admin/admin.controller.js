/**
 * Created by amala on 28/02/16.
 */
(function () {
    'use strict';

    /*global angular*/
    angular
        .module("FormBuilderApp")
        .controller("AdminController", adminController);

    function adminController($location, $scope) {
        $scope.$location = $location;
    }
}());
/**
 * Created by amala on 18/02/16.
 */
(function () {
    'use strict';

    /*global angular*/
    angular
        .module("FormBuilderApp")
        .controller("MainController", function ($scope, $location) {
            $scope.$location = $location;
        });
}());
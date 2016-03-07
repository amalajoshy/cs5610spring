/**
 * Created by amala on 18/02/16.
 */
(function () {
    'use strict';

    /*global angular*/
    angular
        .module("TixterApp")
        .controller("MainController", function ($scope, $location) {
            console.log("I am at 5055")
            $scope.$location = $location;
        });
}());
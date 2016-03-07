/**
 * Created by amala on 28/02/16.
 */
(function () {
    'use strict';

    /*global angular*/
    angular
        .module("TixterApp")
        .controller("AdminController", adminController);

    function adminController($scope, $location, UserService, $rootScope) {
        $scope.users = UserService.findAllUsers();
    }
}());
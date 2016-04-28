/**
 * Created by amala on 23/02/16.
 */
(function () {
    'use strict';

    /*global angular*/
    angular
        .module("TixterApp")
        .controller("HeaderController", headerController);

    function headerController($location, $scope, UserService) {
        $scope.$location = $location;
        $scope.logout = logout;

        function logout() {
            UserService.logout();
            UserService.setCurrentUser(null);
            $location.url("/");
        }
    }
}());
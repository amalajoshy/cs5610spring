/**
 * Created by amala on 17/02/16.
 */
(function () {
    'use strict';
    /*global angular*/
    angular
        .module("TixterApp")
        .controller("SelectedEventController", selectedEventController);

    function selectedEventController($scope, $location, EventService, $rootScope) {
        $scope.event = EventService.getCurrentEvent();
        $scope.map = [];
        initDisplayMap($scope, 'map');
        displayMap($scope, 'map', $scope.event.place_id, 17);
    }
}());
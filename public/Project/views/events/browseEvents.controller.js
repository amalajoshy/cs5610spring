/**
 * Created by amala on 17/02/16.
 */
(function () {
    'use strict';
    /*global angular*/
    angular
        .module("TixterApp")
        .controller("BrowseEventsController", browseEventsController);

    function browseEventsController($scope, $location, EventService, $rootScope) {
        $scope.selectEvent = selectEvent;

        $scope.events = EventService.getAllEvents();

        function selectEvent(event) {
            EventService.setCurrentEvent(event);
        }
    }
}());
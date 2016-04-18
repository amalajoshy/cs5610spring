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

        EventService.findAllEvents()
            .then(function(response){
                $scope.events = response.data;
            });

        function selectEvent(event) {
            EventService.setCurrentEvent(event);
        }
    }
}());
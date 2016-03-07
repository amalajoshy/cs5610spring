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
        //$scope.displayMapForEvent = displayMapForEvent;
        $scope.event = EventService.getCurrentEvent();
        initDisplayMap($scope);

        geocodePlaceId($scope.geocoder, $scope.map, $scope.infowindow, $scope.event.place_id);

        //displayMapForEvent("map", $scope.event.place_id);

        //function displayMapForEvent(event) {
        //    var map = "map";
        //    displayMap(map, event.place_id);
        //}
    }
}());
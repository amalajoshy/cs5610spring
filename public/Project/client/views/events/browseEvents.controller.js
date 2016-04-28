/**
 * Created by amala on 17/02/16.
 */
(function () {
    'use strict';
    /*global angular*/
    angular
        .module("TixterApp")
        .controller("BrowseEventsController", browseEventsController);

    function browseEventsController($scope, EventService) {
        $scope.filterEvents = filterEvents;
        $scope.category = "All";
        $scope.categoryOptions = ["All", "Convention", "Culinary", "Fun", "Sports"];

        $(window).scrollTop(0);

        findAllEvents();

        function findAllEvents() {
            EventService.findAllEvents()
                .then(function (response) {
                    $scope.events = response.data;
                });
        }

        function filterEvents(category) {
            if (category === "All") {
                findAllEvents();
            } else {
                EventService.findEventsByCategory(category)
                    .then(function (response) {
                        $scope.events = response.data;
                    });
            }
        }
    }
}());

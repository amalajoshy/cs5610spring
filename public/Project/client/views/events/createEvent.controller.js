/**
 * Created by amala on 17/02/16.
 */
(function () {
    'use strict';
    /*global angular*/
    angular
        .module("TixterApp")
        .controller("EventsController", eventsController);

    function eventsController($scope, $location, EventService, UserService) {
        $scope.createEvent = createEvent;

        $scope.currentUser = UserService.getCurrentUser();
        if (!$scope.currentUser) {
            $("#modal-login").modal('show');
            $location.url("/");
            return;
        }

        $(".date").datetimepicker({
            useCurrent: true,
            format: 'YYYY-MM-DD HH:mm'
        });

        initMap($scope);

        function createEvent(event) {
            $scope.message = null;
            $scope.error = null;
            event.startTime = $('#start-time input').val();

            if (!event) {
                $scope.message = "Please fill in all the required fields";
                return;
            }
            if (!event.title) {
                $scope.message = "Please provide a title for the Event";
                return;
            }
            if (!event.location) {
                $scope.message = "Please enter a venue";
                return;
            }
            if (!event.totalCapacity) {
                $scope.message = "Please enter Seats availability";
                return;
            }
            if (!event.startTime) {
                $scope.message = "Please provide a Date and time of event";
                return;
            }
            if (!event.category) {
                $scope.message = "Please select a Category ";
                return;
            }
            event.endTime = $('#end-time input').val();
            event.placeId = $scope.placeId;
            event.location = $scope.location;

            console.log(event);
            EventService.createEvent(event)
                .then(function (response) {
                    if (response.data) {
                        $location.url("/event/" + response.data._id);
                    }
                });
        }
    }
}());

/**
 * Created by amala on 20/04/16.
 */
(function () {
    'use strict';
    /*global angular*/
    angular
        .module("TixterApp")
        .controller("MyEventsController", MyEventsController);

    function MyEventsController($scope, $location, EventService, UserService) {
        $scope.deleteEvent = deleteEvent;
        $scope.$location = $location;

        $scope.currentUser = UserService.getCurrentUser();
        if (!$scope.currentUser) {
            $("#modal-login").modal('show');
            $location.url("/");
            return;
        }

        $(window).scrollTop(0);

        EventService.findEventsByOrganiserId($scope.currentUser._id)
            .then(function(response){
                $scope.events = response.data;
            });

        function deleteEvent(event) {
            EventService.deleteEvent(event._id)
                .then(function (response) {
                    $scope.events = response.data;
                });
        }
    }
}());

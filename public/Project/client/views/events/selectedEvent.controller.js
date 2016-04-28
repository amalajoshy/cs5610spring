/**
 * Created by amala on 17/02/16.
 */
(function () {
    'use strict';
    /*global angular*/
    angular
        .module("TixterApp")
        .controller("SelectedEventController", selectedEventController);

    function selectedEventController($scope, $location, EventService, TicketService, UserService, $routeParams) {
        $scope.registerForEvent = registerForEvent;
        $scope.updateEvent = updateEvent;
        $scope.editMode = false;
        $scope.additionalCapacity = 0;

        $scope.currentUser = UserService.getCurrentUser();
        if (!$scope.currentUser) {
            $("#modal-login").modal('show');
            $location.url("/");
            return;
        }
        $(window).scrollTop(0);

        var eventId = $routeParams.eventId;

        EventService.findEventById(eventId)
            .then(function (response) {
                $scope.event = response.data;
                $scope.tickets = $scope.event.tickets;
                $scope.isOrganiser = $scope.event.organiserId == $scope.currentUser._id;
                if ($scope.isOrganiser) {
                    $scope.organiser = $scope.currentUser;
                    renderEventPage();
                } else {
                    UserService.findUserById($scope.event.organiserId)
                        .then(function (response) {
                            $scope.organiser = response.data;
                            renderEventPage();
                        });
                }
            });

        function renderEventPage() {
            $scope.map = [];
            initDisplayMap($scope, 'map');
            displayMap($scope, 'map', $scope.event.placeId, 17);

            if ($scope.event.image) {
                $("#event-logo").css({'background-image': 'url("/Project/server/uploads/events/' + $scope.event.image + '")'});
            }

            $('#event-img').fileupload({
                url: "/api/event/" + $scope.event._id + "/image",
                dataType: 'json',
                done: function (e, data) {
                    if (data.textStatus == "success") {
                        $scope.event = data.result;
                        if ($scope.event.image) {
                            $("#event-logo").css({'background-image': 'url("/Project/server/uploads/events/' + $scope.event.image + '")'});
                        }
                    }
                }
            });
        }

        function registerForEvent(event, quantity) {
            $scope.error = null;
            var ticket = {"eventId": event._id, "quantity": quantity, "price": event.ticketPrice};
            TicketService.createTicket(ticket)
                .then(function (response) {
                    console.log(response.data);
                    if (response.data !== null) {
                        $location.url("/ticket/" + response.data._id);
                    } else {
                        $scope.error = "Sorry!! Not enough seats left !!";
                    }
                });
        }

        function updateEvent(event) {
            event.totalCapacity += Number($scope.additionalCapacity);
            $scope.additionalCapacity = 0;
            EventService.updateEvent(event._id, event)
                .then(function (response) {
                    $scope.event = response.data;
                });
            $scope.editMode = false;
        }
    }
}());

/**
 * Created by amala on 20/04/16.
 */
(function () {
    'use strict';
    /*global angular*/
    angular
        .module("TixterApp")
        .controller("MyTicketsController", MyTicketsController);

    function MyTicketsController($scope, $location, TicketService, EventService, UserService) {
        $scope.printTicket = printTicket;
        $scope.cancelTicket = cancelTicket;
        $scope.$location = $location;
        $scope.tickets = null;

        $scope.currentUser = UserService.getCurrentUser();
        if (!$scope.currentUser) {
            $("#modal-login").modal('show');
            $location.url("/");
            return;
        }

        TicketService.findTicketsByUserId($scope.currentUser._id)
            .then(function (response) {
                $scope.tickets = response.data;
                renderTickets();
            });

        function renderTickets() {
            $scope.events = [];
            $scope.qrCodes = [];
            for (var i in $scope.tickets) {
                var ticket = $scope.tickets[i];
                EventService.findEventById(ticket.eventId)
                    .then(function (response) {
                        if (response.data) {
                            $scope.events.push(response.data);
                            renderQrCodes();
                        }
                    });
            }
        }

        function renderQrCodes() {
            for (var i in $scope.tickets) {
                var ticket = $scope.tickets[i];
                $("#qrcode-" + ticket._id).html(ticket.qrCodeImgTag);
            }
        }

        function printTicket(ticket) {
            $("#ticketpanel-" + ticket._id).print();
        }

        function cancelTicket(ticket) {
            TicketService.cancelTicket(ticket._id)
                .then(function(response){
                    $scope.tickets = response.data;
                    renderTickets();
                });
        }
    }
}());
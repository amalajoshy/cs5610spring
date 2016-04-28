/**
 * Created by amala on 19/04/16.
 */
/**
 * Created by amala on 06/03/16.
 */
(function () {
    'use strict';

    /*global angular*/
    angular
        .module("TixterApp")
        .controller("TicketController", TicketController);

        function TicketController($scope, TicketService, EventService, UserService, $routeParams) {
            $scope.printTicket = printTicket;

            $scope.currentUser = UserService.getCurrentUser();
            if (!$scope.currentUser) {
                $("#modal-login").modal('show');
                $location.url("/");
                return;
            }

            var ticketId = $routeParams.ticketId;

            TicketService.findTicketById(ticketId)
                .then(function(response){
                    $scope.ticket = response.data;
                    EventService.findEventById($scope.ticket.eventId)
                        .then(function (response) {
                            $scope.event = response.data;
                            $("#qrcode-" + $scope.ticket._id).html($scope.ticket.qrCodeImgTag);
                        });
                });

            function printTicket(ticket) {
                $("#ticketpanel-" + ticket._id).print();
            }
        }
    }());
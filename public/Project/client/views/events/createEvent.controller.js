/**
 * Created by amala on 17/02/16.
 */
(function () {
    'use strict';
    /*global angular*/
    angular
        .module("TixterApp")
        .controller("EventsController", eventsController);

    function eventsController($scope, $location, EventService, $rootScope) {
        $scope.createEvent = createEvent;
        $scope.updateEvent = updateEvent;
        //$scope.deleteEvent = deleteEvent;
        //$scope.selectEvent = selectEvent;

        var user = $rootScope.currentUser;
        if (!user) {
            $("#modal-login").modal('show');
            $location.url("/");
            return;
        }

        //$('#start-time').datetimepicker();
        //$('#end-time').datetimepicker({
        //    useCurrent: false //Important! See issue #1075
        //});
        $(".date").datetimepicker({
            useCurrent: true,
            format: 'YYYY-MM-DD HH:mm'
        });
        //$("#start-time").on("dp.change", function (e) {
        //    $("#start-time").data("DateTimePicker").minDate(e.date);
        //});
        //$("#end-time").on("dp.change", function (e) {
        //    $("#end-time").data("DateTimePicker").maxDate(e.date);
        //});
        initMap($scope);

        //var userId = user._id;
        //$scope.events = EventService.findAllEventsForUser(userId, $.noop);

        function createEvent(event) {
            event.startTime = $('#start-time input').val();
            event.endTime = $('#end-time input').val();
            event.placeId = $scope.placeId;
            event.location = $scope.location;
            console.log(event);
            EventService.createEvent(event)
                .then(function (response) {
                    console.log(response.data);
                });
        }

        function updateEvent(event) {
            event.placeId = $scope.placeId;
            event.location = $scope.location;
            EventService.updateEvent(event._id, event)
                .then(function (response) {
                    console.log(response.data);
                });
        }



            //findEventsByOrganiserId: findEventsByOrganiserId,
            //deleteEvent: deleteEvent,
            //findAllEvents: findAllEvents,
            //findEventById: findEventById,
            //setCurrentEvent: setCurrentEvent,
            //getCurrentEvent: getCurrentEvent,
            //findEventsByCategory: findEventsByCategory


        //function deleteEvent(index) {
        //    $scope.events.splice(index, 1);
        //}

        //function selectEvent(event, index) {
        //    $scope.selectedEventIndex = index;
        //    $scope.event = event;
        //    $scope.event._id = $scope.events[index]._id;
        //    $scope.event.title = $scope.events[index].title;
        //    $scope.event.place_id = $scope.events[index].place_id;
        //    $scope.event.location = $scope.events[index].location;
        //    $scope.event.time_date = $scope.events[index].time_date;
        //}
    }
}());
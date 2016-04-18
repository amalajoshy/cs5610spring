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
        $scope.addEvent = addEvent;
        $scope.updateEvent = updateEvent;
        $scope.deleteEvent = deleteEvent;
        $scope.selectEvent = selectEvent;

        var user = $rootScope.currentUser;
        var userId = user._id;
        $scope.events = EventService.findAllEventsForUser(userId, $.noop);
        console.log($scope.events);

        $("#input-4").fileinput({showCaption: false});
        $('#datetimepicker6').datetimepicker();
        $('#datetimepicker7').datetimepicker({
            useCurrent: false //Important! See issue #1075
        });
        $("#datetimepicker6").on("dp.change", function (e) {
            $('#datetimepicker7').data("DateTimePicker").minDate(e.date);
        });
        $("#datetimepicker7").on("dp.change", function (e) {
            $('#datetimepicker6').data("DateTimePicker").maxDate(e.date);
        });

        initMap($scope);

        function addEvent(event) {
            event.place_id = $scope.place_id;
            event.location = $scope.location;
            var new_event = EventService.createEventForUser(userId, event, $.noop);
            $scope.events.push(new_event);
        }

        function updateEvent(event) {
            event.place_id = $scope.place_id;
            event.location = $scope.location;
            var eventId = EventService.getEventId(event);
            var updated_event = EventService.updateEventById(eventId, event, $.noop);
        }

        function deleteEvent(index) {
            $scope.events.splice(index, 1);
        }

        function selectEvent(event, index) {
            $scope.selectedEventIndex = index;
            $scope.event = event;
            $scope.event._id = $scope.events[index]._id;
            $scope.event.title = $scope.events[index].title;
            $scope.event.place_id = $scope.events[index].place_id;
            $scope.event.location = $scope.events[index].location;
            $scope.event.time_date = $scope.events[index].time_date;
        }
    }
}());
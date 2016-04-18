/**
 * Created by amala on 17/02/16.
 */
(function () {
    'use strict';
    /*global angular*/
    angular
        .module("TixterApp")
        .controller("SelectedEventController", selectedEventController);

    function selectedEventController($scope, EventService, $routeParams) {
        var eventId = $routeParams.eventId;

        $scope.event = EventService.getCurrentEvent();
        if ($scope.event) {
            renderEventPage();
        } else {
            EventService.findEventById(eventId)
                .then(function (response) {
                    $scope.event = response.data;
                    renderEventPage();
                });
        }

        function renderEventPage() {
            $scope.map = [];
            initDisplayMap($scope, 'map');
            displayMap($scope, 'map', $scope.event.placeId, 17);

            $("#event-img").fileinput({
                showCaption: false,
                showProgress: false,
                //showPreview: false,
                initialPreview: false,
                uploadUrl: "/api/event/" + $scope.event._id + "/image",
                allowedFileExtensions: ["jpg", "png", "gif"],
                allowedFileTypes: ['image'],
                maxFileSize: 2000,
                //maxImageWidth: 200,
                maxFileCount: 1,
                resizeImage: true
            });
        }
    }
}());
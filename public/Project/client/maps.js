/**
 * Created by amala on 03/03/16.
 */
function initMap($scope) {
    "use strict";
    var input = document.getElementById('pac-input');
    var autocomplete = new google.maps.places.Autocomplete(input);
    autocomplete.addListener('place_changed', function () {
        var place = autocomplete.getPlace();
        if (!place.geometry) {
            window.alert("Autocomplete's returned place contains no geometry");
            return;
        }
        $scope.placeId = place.place_id;
        $scope.location = place.formatted_address;
    });
}

function geocodePlaceId(geocoder, map, infowindow, placeId, zoomLevel) {
    "use strict";
    geocoder.geocode({'placeId': placeId}, function(results, status) {
        if (status === google.maps.GeocoderStatus.OK) {
            if (results[0]) {
                map.setZoom(zoomLevel);
                map.setCenter(results[0].geometry.location);
                var marker = new google.maps.Marker({
                    map: map,
                    position: results[0].geometry.location
                });
                infowindow.setContent(results[0].formatted_address);
                infowindow.open(map, marker);
            } else {
                window.alert('No results found');
            }
        } else {
            window.alert('Geocoder failed due to: ' + status);
        }
    });
}

function displayMap($scope, map_id, place_id, zoom_level) {
    "use strict";
    if (place_id === null) {
        return;
    }
    geocodePlaceId($scope.geocoder, $scope.map[map_id], $scope.infowindow, place_id, zoom_level);
}

function initDisplayMap($scope, map_id) {
    "use strict";
    var map = new google.maps.Map(document.getElementById(map_id), {
        zoom: 17,
        center: {lat: 40.72, lng: -73.96}
    });
    var geocoder = new google.maps.Geocoder;
    var infowindow = new google.maps.InfoWindow;
    $scope.geocoder = geocoder;
    $scope.infowindow = infowindow;
    $scope.map[map_id] = map;
}
/**
 * [Map description]
 */
function Map() {

    var map;

}

Map.prototype.getMap = function() {
    return map;
}

Map.prototype.initialize = function() {
  var mapOptions = {
    zoom: 2,
    center: new google.maps.LatLng(0, 0),
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    styles: [{"featureType":"water","stylers":[{"visibility":"on"},{"color":"#acbcc9"}]},{"featureType":"landscape","stylers":[{"color":"#f2e5d4"}]},{"featureType":"road.highway","elementType":"geometry","stylers":[{"color":"#c5c6c6"}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#e4d7c6"}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#fbfaf7"}]},{"featureType":"poi.park","elementType":"geometry","stylers":[{"color":"#c5dac6"}]},{"featureType":"administrative","stylers":[{"visibility":"on"},{"lightness":33}]},{"featureType":"road"},{"featureType":"poi.park","elementType":"labels","stylers":[{"visibility":"on"},{"lightness":20}]},{},{"featureType":"road","stylers":[{"lightness":20}]}]
  };
  map = new google.maps.Map(document.getElementById('map-canvas'),mapOptions);
}

Map.prototype.addMarker = function(lat, lon, map, date, city, image) {
    return new google.maps.Marker({
        position: new google.maps.LatLng(lat, lon),
        map: map,
        title: date + ' - ' + city,
        icon: image
    });
}

Map.prototype.addInfoWindow = function(title, date, name, street, city, country, map, marker) {
    var infowindow = new google.maps.InfoWindow({
        content: '<div class="box normal asphalt museo-slab">' +
                 '<p>' + title + '</p>' +
                 date + '<br/>' +
                 name + '<br/>' +
                 street + '<br/>' +
                 city + '<br/>' +
                 country + '<br/>' +
                 '</div>'
    });

    google.maps.event.addListener(marker, 'mouseover', function() {
        infowindow.open(map, marker);
    });

    google.maps.event.addListener(marker, 'mouseout', function() {
        infowindow.close(map, marker);
    });
}

Map.prototype.addPath = function(lat, lon, latNext, lonNext, map) {
    var flightPlanCoordinates = [
        new google.maps.LatLng(lat, lon),
        new google.maps.LatLng(latNext, lonNext)
    ];

    var lineSymbol = {
        path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
        scale: 2
    };
    
    var flightPath = new google.maps.Polyline({
        path: flightPlanCoordinates,
        strokeColor: "#FF0000",
        strokeOpacity: 1.0,
        strokeWeight: 1,
        icons: [{
            icon: lineSymbol,
            offset: '100%'
        }],
        map: map
    });    
}

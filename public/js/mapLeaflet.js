/**
 * Working with map using Leaflet
 */

function Map() {
    var map;
}

Map.prototype.getMap = function() {
    return map;
}

Map.prototype.initialize = function() {
    map = L.map('map-canvas').setView([0, 0], 2);

    map.zoomControl.setPosition('bottomright');

    L.tileLayer('http://{s}.tiles.mapbox.com/v3/kirillstyopkin.h29f88g0/{z}/{x}/{y}.png', {
        attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://cloudmade.com">CloudMade</a>',
        maxZoom: 18
    }).addTo(map);
}

Map.prototype.addInfoWindow = function(title, date, name, street, city, country, map, marker, event_id) {

    var latlng = marker.getLatLng();

    var popup = L.popup({
            closeButton: false,
            offset: L.point(0, -30)
        })
        .setLatLng(latlng)
        .setContent('<div class="box normal asphalt museo-slab">' +
                 '<p>' + title + '</p>' +
                 date + '<br/>' +
                 name + '<br/>' +
                 street + '<br/>' +
                 city + '<br/>' +
                 country + '<br/>' +
                 '</div>');

    var actions = {
        mouseover: function() {
            map.openPopup(popup);
        },
        mouseout: function() {
            map.closePopup(popup);
        }
    };

    marker.on(actions);
    $('#'+event_id+'').on(actions);
}

Map.prototype.addPath = function(lat, lon, latNext, lonNext, map) {
    var latlng1 = L.latLng(lat, lon);
    var latlng2 = L.latLng(latNext, lonNext);

    var polyline = L.polyline([latlng1, latlng2], {color: 'red'}).addTo(map);
}

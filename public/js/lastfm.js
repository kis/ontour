$(function() {

    var map = new Map();
    map.initialize();



    $('input[name="search-field"]').on({
        keyup: function(e) {
            if (e.keyCode === 13) {
                $('a[name="search-go"]').trigger('click');
            }
        }
    });

    $('.button-group button').on('click', function() {
        $('.button-group button').each(function() {
            $(this).attr('aria-selected', false); 
        });

        $(this).attr('aria-selected', true);

        var $field = $("#search-box input");
        var $link = $("#search-box a");

        $field.val('');

        switch ($(this).attr('id')) {
            case 'artistTab':
                $field.attr({'id': 'artistField', 'placeholder': 'Enter artist name..'});
                $link.attr('id', 'artistButton');
                break;
            case 'cityTab':
                $field.attr({'id': 'cityField', 'placeholder': 'Enter country or city..'});
                $link.attr('id', 'cityButton');
                break;
            case 'venueTab':
                $field.attr({'id': 'venueField', 'placeholder': 'Enter venue..'});
                $link.attr('id', 'venueButton');
                break;
            default:
                break;
        }
    });

    /**
     *  Get venue
     */
    
    $(document).on('click', "#venueButton", function() {

        var city = $('#venueField').val();

        if(!city) {
            $('#venueField').addClass("invalid");
            return;
        }
        
        $('#venueField').removeClass("invalid");

        var lastfm = new LastFM({
            apiKey    : 'dd349d2176d3b97b8162bb0c0e583b1c',
            apiSecret : '1aaac60ed1acb3d7a10d5b1caa08d116'
        });

        map.initialize();

        $('#artist-info').children().detach();

        lastfm.venue.search({venue: city, limit: 1000}, {success: function(data) {
            var results = data.results.venuematches.venue;

            var ev = [];

            if (data.results.venuematches.venue == undefined) {
                $('#artist-info').append('<div class="box normal asphalt event"><h4 class="museo-slab">Not found </h4></div>');
                return;
            }

            //$('#artist-info').append(data.events.event[0].id + '<br/>');

            if (results.length == undefined) {
                ev.push(results);
            } else {
                ev = results;
            }

            $('#artist-info').append('<div class="box normal asphalt event"><h4 class="museo-slab">' +ev.length+ 
                    ' upcoming events found </h4></div>');

            var lat, lon, image, marker;

            ev.forEach(function(value, index) {
                $('#artist-info').append(
                    '<div class="box normal asphalt event museo-slab">' +
                    //value.id + '<br/>' +
                    value.name + '<br/><br/>' +
                    value.location.city + '<br/>' +
                    value.location.country + '<br/>' +
                    value.location.street + '<br/>' +
                    // '<img src="'+value.image[0]['#text']+'" >' +
                    '</div>');

                lat = value.location['geo:point']['geo:lat'];
                lon = value.location['geo:point']['geo:long'];

                /*image = new google.maps.MarkerImage(value.image[2]['#text'],
                        new google.maps.Size(50, 50),
                        new google.maps.Point(0,0),
                        new google.maps.Point(0, 50));*/

                if (lat != 0 && lon != 0) {

                    //add markers

                    marker = map.addMarker(lat, 
                                           lon, 
                                           map.getMap(), 
                                           value.startDate, 
                                           value.venue.location.city);

                    //add information windows

                    /*addInfoWindow(value.title,
                                  value.startDate, 
                                  value.venue.name, 
                                  value.venue.location.city, 
                                  value.venue.location.country, 
                                  map, 
                                  marker);*/
                }
            });

            map.getMap().setCenter(new google.maps.LatLng(lat, lon));
            map.getMap().setZoom(12);

        }, error: function(code, message) {
            $('#artist-info').append('<div class="box normal asphalt event"><h4 class="museo-slab">Not found </h4></div>');

            if (code == 4)
                alert('error!');
        }});            
    });

    /**
     *  Get shows by the city or country
     */
    
    $(document).on('click', "#cityButton", function() {

        var city = $('#cityField').val();

        if(!city) {
            $('#cityField').addClass("invalid");
            return;
        }
        
        $('#cityField').removeClass("invalid");

        var lastfm = new LastFM({
            apiKey    : 'dd349d2176d3b97b8162bb0c0e583b1c',
            apiSecret : '1aaac60ed1acb3d7a10d5b1caa08d116'
        });

        map.initialize();

        $('#artist-info').children().detach();

        lastfm.geo.getEvents({location: city, limit: 1000}, {success: function(data) {
            var events = data.events.event;

            var ev = [];

            if (data.events.event == undefined) {
                $('#artist-info').append('<div class="box normal asphalt event"><h4 class="museo-slab">Not found </h4></div>');
                return;
            }

            //$('#artist-info').append(data.events.event[0].id + '<br/>');

            if (events.length == undefined) {
                ev.push(events);
            } else {
                ev = events;
            }

            $('#artist-info').append('<div class="box normal asphalt event"><h4 class="museo-slab">' +ev.length+ 
                    ' upcoming events found </h4></div>');

            var lat, lon, image, marker;

            ev.forEach(function(value, index) {
                $('#artist-info').append(
                    '<div class="box normal asphalt event museo-slab">' +
                    //value.id + '<br/>' +
                    value.title + '<br/><br/>' +
                    value.startDate + '<br/>' + //value.startTime +
                    value.venue.name + '<br/>' +
                    value.venue.location.street + '<br/>' +
                    value.venue.location.city + '<br/>' +
                    value.venue.location.country + '<br/>' +
                    // '<img src="'+value.image[0]['#text']+'" >' +
                    '</div>');

                lat = value.venue.location['geo:point']['geo:lat'];
                lon = value.venue.location['geo:point']['geo:long'];

                image = new google.maps.MarkerImage(value.image[2]['#text'],
                        new google.maps.Size(50, 50),
                        new google.maps.Point(0,0),
                        new google.maps.Point(0, 50));

                if (lat != 0 && lon != 0) {

                    //add markers

                    marker = map.addMarker(lat, 
                                           lon, 
                                           map.getMap(), 
                                           value.startDate, 
                                           value.venue.location.city,
                                           image);

                    //add information windows

                    map.addInfoWindow(value.title,
                                      value.startDate, 
                                      value.venue.name, 
                                      value.venue.location.city, 
                                      value.venue.location.country, 
                                      map.getMap(), 
                                      marker);
                }
            });

            map.getMap().setCenter(new google.maps.LatLng(lat, lon));
            map.getMap().setZoom(12);

        }, error: function(code, message) {
            $('#artist-info').append('<div class="box normal asphalt event"><h4 class="museo-slab">Not found </h4></div>');

            if (code == 4)
                alert('error!');
        }});            
    });

    /*
     *  LastFM API Request. Get artist information. No need to authorize
     */

    $(document).on('click', "#artistButton", function() {

        var artistName = $('#artistField').val();

        if (!artistName) {
            $('#artistField').addClass("invalid");
            return;
        }
        
        $('#artistField').removeClass("invalid");

        var lastfm = new LastFM({
            apiKey    : 'dd349d2176d3b97b8162bb0c0e583b1c',
            apiSecret : '1aaac60ed1acb3d7a10d5b1caa08d116'
        });

        map.initialize();

        $('#artist-info').children().detach();

        lastfm.artist.getEvents({artist: artistName, autocorrect: 1, limit: 1000}, {success: function(data) {
            var events = data.events.event;

            var ev = [];

            if (data.events.event == undefined) {
                $('#artist-info').append('<div class="box normal asphalt event"><h4 class="museo-slab">Not found </h4></div>');
                return;
            }

            //$('#artist-info').append(data.events.event[0].id + '<br/>');

            if (events.length == undefined) {
                ev.push(events);
            } else {
                ev = events;
            }

            $('#artist-info').append('<div class="box normal asphalt event"><h4 class="museo-slab">' +ev.length+ 
                    ' upcoming events found </h4></div>');

            var lat, lon, marker;

            ev.forEach(function(value, index) {
                $('#artist-info').append(
                    '<div class="box normal asphalt event museo-slab">' +
                    //value.id + '<br/>' +
                    value.startDate + '<br/>' + //value.startTime +
                    value.venue.name + '<br/>' +
                    value.venue.location.city + '<br/>' +
                    value.venue.location.country + '<br/>' +
                    '</div>');

                lat = value.venue.location['geo:point']['geo:lat'];
                lon = value.venue.location['geo:point']['geo:long'];

                if (lat != 0 && lon != 0) {

                    //add markers

                    marker = map.addMarker(lat, 
                                           lon, 
                                           map.getMap(), 
                                           value.startDate, 
                                           value.venue.location.city);

                    //add information windows

                    map.addInfoWindow(value.title,
                                      value.startDate, 
                                      value.venue.name, 
                                      value.venue.location.city, 
                                      value.venue.location.country, 
                                      map.getMap(), 
                                      marker);

                    //add paths between markers

                    if (index < ev.length-1 && 
                        ev[index+1].venue.location['geo:point']['geo:lat'] != 0 &&
                        ev[index+1].venue.location['geo:point']['geo:long'] != 0) {

                        map.addPath(lat, 
                                    lon, 
                                    ev[index+1].venue.location['geo:point']['geo:lat'], 
                                    ev[index+1].venue.location['geo:point']['geo:long'], 
                                    map.getMap());
                    }
                }                    
                
            });

        }, error: function(code, message){
            if (code == 4)
                alert('error!');
        }});            
    });

});
$(function() {

    initialize(0, 0);

    var map;

    function initialize(lat, lon) {
      var mapOptions = {
        zoom: 2,
        center: new google.maps.LatLng(lat, lon),
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        styles: [{"featureType":"water","stylers":[{"visibility":"on"},{"color":"#acbcc9"}]},{"featureType":"landscape","stylers":[{"color":"#f2e5d4"}]},{"featureType":"road.highway","elementType":"geometry","stylers":[{"color":"#c5c6c6"}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#e4d7c6"}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#fbfaf7"}]},{"featureType":"poi.park","elementType":"geometry","stylers":[{"color":"#c5dac6"}]},{"featureType":"administrative","stylers":[{"visibility":"on"},{"lightness":33}]},{"featureType":"road"},{"featureType":"poi.park","elementType":"labels","stylers":[{"visibility":"on"},{"lightness":20}]},{},{"featureType":"road","stylers":[{"lightness":20}]}]
      };
      map = new google.maps.Map(document.getElementById('map-canvas'),mapOptions);
    }

    function addMarker(lat, lon, map, date, city, image) {
        return new google.maps.Marker({
            position: new google.maps.LatLng(lat, lon),
            map: map,
            title: date + ' - ' + city,
            icon: image
        });
    }

    function addInfoWindow(title, date, name, city, country, map, marker) {
        var infowindow = new google.maps.InfoWindow({
            content: '<div class="box normal asphalt museo-slab">' +
                     '<p>' + title + '</p>' +
                     date + '<br/>' +
                     name + '<br/>' +
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

    function addPath(lat, lon, latNext, lonNext, map) {
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

    /*
     *  Getting LastFM session key if pass authorization and get access token. Step 2
     */

    $("a#auth").on({
        click: function() {

            var lastfm = new LastFM({
                apiKey    : 'dd349d2176d3b97b8162bb0c0e583b1c',
                apiSecret : '1aaac60ed1acb3d7a10d5b1caa08d116',
            });

            var token = $(this).attr('token');
            var sk;

            lastfm.auth.getSession({token: token}, {success: function(data){
                alert("Привет, "+data.session.name+"!\n\rРад тебя видеть, твою ключ сессии "+data.session.key);
                sk = data.session.key;
            }, error: function(code, message){
                if (code == 4)
                    alert("Токен умер. Щелкни снова авторизацию");
            }});
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

        initialize(0, 0);

        $('#artist-info').children().detach();

        lastfm.venue.search({venue: city, limit: 1000}, {success: function(data) {
            var results = data.results.venuematches.venue;

            var ev = Array();

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

                    marker = addMarker(lat, 
                                       lon, 
                                       map, 
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

            map.setCenter(new google.maps.LatLng(lat, lon));
            map.setZoom(12);

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

        initialize(0, 0);

        $('#artist-info').children().detach();

        lastfm.geo.getEvents({location: city, limit: 1000}, {success: function(data) {
            var events = data.events.event;

            var ev = Array();

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

                    marker = addMarker(lat, 
                                       lon, 
                                       map, 
                                       value.startDate, 
                                       value.venue.location.city,
                                       image);

                    //add information windows

                    addInfoWindow(value.title,
                                  value.startDate, 
                                  value.venue.name, 
                                  value.venue.location.city, 
                                  value.venue.location.country, 
                                  map, 
                                  marker);
                }
            });

            map.setCenter(new google.maps.LatLng(lat, lon));
            map.setZoom(12);

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

        initialize(0, 0);

        $('#artist-info').children().detach();

        lastfm.artist.getEvents({artist: artistName, autocorrect: 1, limit: 1000}, {success: function(data) {
            var events = data.events.event;

            var ev = Array();

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

                    marker = addMarker(lat, 
                                       lon, 
                                       map, 
                                       value.startDate, 
                                       value.venue.location.city);

                    //add information windows

                    addInfoWindow(value.title,
                                  value.startDate, 
                                  value.venue.name, 
                                  value.venue.location.city, 
                                  value.venue.location.country, 
                                  map, 
                                  marker);

                    //add paths between markers

                    if (index < ev.length-1 && 
                        ev[index+1].venue.location['geo:point']['geo:lat'] != 0 &&
                        ev[index+1].venue.location['geo:point']['geo:long'] != 0) {

                        addPath(lat, 
                                lon, 
                                ev[index+1].venue.location['geo:point']['geo:lat'], 
                                ev[index+1].venue.location['geo:point']['geo:long'], 
                                map);
                    }
                }                    
                
            });

        }, error: function(code, message){
            if (code == 4)
                alert('error!');
        }});            
    });

    /*
     *  Getting session key. Step (2)
     */

    /*$("a#fetch_session").on({
        click: function() {

            var token = $(this).attr('token');

            alert(token);

            var address = 'http://ws.audioscrobbler.com/2.0/auth.getSession';
            //api signature = md5("api_keyxxxxxxxxmethodauth.getSessiontokenxxxxxxxmysecret")

            //lastfm.auth.getSession()

            $.ajax({
                url: address,
                type: "POST",
                data: {
                    token: token,
                    api_key: 'dd349d2176d3b97b8162bb0c0e583b1c',
                    api_sig: '1aaac60ed1acb3d7a10d5b1caa08d116'
                },
                dataType: "jsonp",
                error: function(data) {
                    alert('error! ' + data);
                },
                success: function(data) {
                   alert('success' + data);
                }
            });
        }
    });*/
});

$(function() {

    initialize(0, 0);

    var map;

    function initialize(lat, lon) {
      var mapOptions = {
        zoom: 2,
        center: new google.maps.LatLng(lat, lon),
        mapTypeId: google.maps.MapTypeId.ROADMAP
      };
      map = new google.maps.Map(document.getElementById('map-canvas'),mapOptions);
    }

    function addMarker(lat, lon, map, date, city) {
        return new google.maps.Marker({
            position: new google.maps.LatLng(lat, lon),
            map: map,
            title: date + ' - ' + city
        });
    }

    function addInfoWindow(date, name, city, country, map, marker) {
        var infowindow = new google.maps.InfoWindow({
            content: '<div class="box normal asphalt">' +
                     '<p>' + date + '</p>' +
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

    $('#artistField, #cityField').on({
        keyup: function(e) {
            if (e.keyCode === 13) {
                $("#artistButton").trigger('click');
                $("#cityButton").trigger('click');
            }
        }
    });

    $('.button-group button').on('click', function() {
        $('.button-group button').each(function() {
            $(this).attr('aria-selected', false); 
        });

        $(this).attr('aria-selected', true);

        if ($(this).text() == 'By city') {
            $("#artistButton").hide().siblings().show();
            $("#artistField").val('').hide().siblings().show();
        } else if ($(this).text() == 'By artist') {
            $("#cityButton").hide().siblings().show();
            $("#cityField").val('').hide().siblings().show();
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
     *  Get shows by the city
     */
    
    $("#cityButton").hide();
    $("#cityField").hide();

    $("#cityButton").on('click', function() {

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

        lastfm.geo.getEvents({location: city}, {success: function(data) {
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

            var lat, lon;

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
                    '</div>');

                //add markers
                
                lat = value.venue.location['geo:point']['geo:lat'];
                lon = value.venue.location['geo:point']['geo:long'];

                var marker = addMarker(lat, 
                                       lon, 
                                       map, 
                                       value.startDate, 
                                       value.venue.location.city);

                //add information windows

                addInfoWindow(value.startDate, 
                              value.venue.name, 
                              value.venue.location.city, 
                              value.venue.location.country, 
                              map, 
                              marker);
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

    $("#artistButton").on({
        click: function() {

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

            lastfm.artist.getEvents({artist: artistName, autocorrect: 1}, {success: function(data) {
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

                ev.forEach(function(value, index) {
                    $('#artist-info').append(
                        '<div class="box normal asphalt event museo-slab">' +
                        //value.id + '<br/>' +
                        value.startDate + '<br/>' + //value.startTime +
                        value.venue.name + '<br/>' +
                        value.venue.location.city + '<br/>' +
                        value.venue.location.country + '<br/>' +
                        '</div>');

                    //add markers

                    var marker = addMarker(value.venue.location['geo:point']['geo:lat'], 
                                           value.venue.location['geo:point']['geo:long'], 
                                           map, 
                                           value.startDate, 
                                           value.venue.location.city);

                    //add information windows

                    addInfoWindow(value.startDate, 
                                  value.venue.name, 
                                  value.venue.location.city, 
                                  value.venue.location.country, 
                                  map, 
                                  marker);

                    //add paths between markers

                    if (index < ev.length-1) {
                        addPath(value.venue.location['geo:point']['geo:lat'], 
                                value.venue.location['geo:point']['geo:long'], 
                                ev[index+1].venue.location['geo:point']['geo:lat'], 
                                ev[index+1].venue.location['geo:point']['geo:long'], 
                                map);
                    }
                });

            }, error: function(code, message){
                if (code == 4)
                    alert('error!');
            }});            
        }
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


$(function() {

    /**
     * Initialize map
     */

    var map = new Map();
    map.initialize();

    /**
     * Initialize LastFM lib
     */

    var lastfm = new LastFM({
        apiKey    : 'dd349d2176d3b97b8162bb0c0e583b1c',
        apiSecret : '1aaac60ed1acb3d7a10d5b1caa08d116'
    });

    /**
     * Search by enter click
     * Autocomplete on input characters
     */

    $('input[name="search-field"]').on({
        keydown: function(e) {

            switch (e.keyCode) {
                case 13:
                    //enter - get termin to input and search

                    if ($('#autocomplete').has('.selectedTermin').toArray().length) {
                        $("input[name='search-field']").val($('.selectedTermin a').text()); 
                    } 

                    $('a[name="search-go"]').trigger('click');

                    break;
                case 27:
                    //esc - hide autocomplete

                    $('#autocomplete').hide();

                    break;
                case 38:
                    //up

                    if ($('#autocomplete').has('.selectedTermin').toArray().length) {
                        $('.selectedTermin').removeClass('selectedTermin')
                                            .prev().addClass('selectedTermin');
                    } else {
                        $('#autocomplete div:last').addClass('selectedTermin');
                    }

                    break;
                case 40:
                    //down
                    
                    if ($('#autocomplete').has('.selectedTermin').toArray().length) {
                        $('.selectedTermin').removeClass('selectedTermin')
                                            .next().addClass('selectedTermin');
                    } else {
                        $('#autocomplete div:first').addClass('selectedTermin');
                    }

                    break;
                default:
                    break;
            }

        },
        input: function(e) {
            var field = $('input[name="search-field"]'),
                name = field.val(),
                term,
                term_in,
                res;

            switch (field.attr('id')) {
                case 'artistField':
                    term = lastfm.artist;
                    term_in = {artist: name, limit: 10};
                    break;
                case 'venueField':
                    term = lastfm.venue;
                    term_in = {venue: name, limit: 10};
                    break;
                default:
                    return;
                    break;
            }

            term.search(term_in, {
                success: function(data) {

                    if (typeof data != 'undefined') {

                        $('#autocomplete')
                            .show()
                            .children().detach();

                        if (field.attr('id') == 'artistField') {
                            res = data.results.artistmatches.artist;
                        } else {
                            res = data.results.venuematches.venue;
                        }

                        res.forEach(function(value, index) {
                            $('#autocomplete').append('<div><a>' + value.name + '</a></div>');
                        });

                    }
 
                }, error: function(code, message) {
                    if (code == 4)
                        alert('error!');
                } 
            });

        }
    });

    
    /**
     * Hide autocomplete on window area click
     */
    
    $(window).on('click', function() {
        $('#autocomplete').hide();
    });

    /**
     * Paste search word to input field and hide autocomplete
     */

    $('#autocomplete').on('click', 'a', function() {
        $("input[name='search-field']").val($(this).text());
        $('#autocomplete').hide();
        $('a[name="search-go"]').trigger('click');
    });


    //if we have selected area - remove it

    $('#autocomplete').on('mouseenter', 'div', function() {
        if ($('#autocomplete').has('.selectedTermin').toArray().length) {
            $('.selectedTermin').removeClass('selectedTermin');
        }
    });

    /**
     * Switch search field/button options for different tabs
     */

    $('.button-group button').on('click', function() {
        $('.button-group button').each(function() {
            $(this).attr('aria-selected', false); 
        });

        $(this).attr('aria-selected', true);

        var $field = $("#search-box input");
        var $link = $("#search-box a");

        $field.val('').removeClass("invalid");

        switch ($(this).attr('id')) {
            case 'artistTab':
                $field.attr({'id': 'artistField', 'placeholder': 'Enter artist name..'}).focus();
                $link.attr('id', 'artistButton');
                break;
            case 'cityTab':
                $field.attr({'id': 'cityField', 'placeholder': 'Enter country or city..'}).focus();
                $link.attr('id', 'cityButton');
                break;
            case 'venueTab':
                $field.attr({'id': 'venueField', 'placeholder': 'Enter venue..'}).focus();
                $link.attr('id', 'venueButton');
                break;
            default:
                break;
        }
    });


    /**
     * Search field validation
     */

    function isValidSearch() {

        var field = $('input[name="search-field"]');

        var search_val = field.val();

        if(!search_val) {
            field.addClass("invalid").focus();
            $('#artist-info').children().detach();
            return;
        }
        
        field.removeClass("invalid");

        map.initialize();

        $('#artist-info').children().detach();

        return search_val;

    }


    /**
     *  Get venues
     */
    
    $(document).on('click', "#venueButton", function() {

        var search_val = isValidSearch();

        if (!search_val) {
            return false;
        }

        var totalPages, 
            total, 
            page = 1,
            isFoundBox = false;

        var timerId = setInterval( 

            function() {

                lastfm.venue.search({venue: search_val, page: page, limit: 10}, {
                    success: function(data) {
                        var results = data.results.venuematches.venue;

                        if (typeof results == 'undefined') {
                            $('#artist-info').append('<div class="box normal error event"><h4 class="museo-slab">Not found </h4></div>');
                            clearInterval(timerId);
                        }

                        if (typeof results.length == 'undefined') {
                            var ev = [];
                            ev.push(results);
                            results = ev;
                        }

                        total = data.results['opensearch:totalResults'];
                        totalPages = (total % 10) ? Math.floor((+total + 10) / 10) : total / 10 ;

                        if (page == 2 && isFoundBox == false) {
                            $('#artist-info').append('<div class="success box normal event"><h4 class="museo-slab">' +total+ 
                                ' venues found </h4></div>');
                            isFoundBox = true;
                        }

                        var lat, lon, image, marker;

                        results.forEach(function(value, index) {
                            $('#artist-info').append(
                                '<div class="box normal asphalt event museo-slab">' +
                                //value.id + '<br/>' +
                                value.name + '<br/><br/>' +
                                value.location.street + '<br/>' + 
                                value.location.city + '<br/>' +
                                value.location.country + '<br/>' +
                                // '<img src="'+value.image[0]['#text']+'" >' +
                                '</div>');

                            lat = value.location['geo:point']['geo:lat'];
                            lon = value.location['geo:point']['geo:long'];

                            if (lat && lon) {

                                //add markers

                                marker = map.addMarker(lat, 
                                                       lon, 
                                                       map.getMap(), 
                                                       value.startDate, 
                                                       value.location.city);

                                //add information windows

                                map.addInfoWindow(value.name, 
                                                  '',
                                                  '',
                                                  value.location.street, 
                                                  value.location.city, 
                                                  value.location.country, 
                                                  map.getMap(), 
                                                  marker);
                            }
                        });

                        if (page == 2 && totalPages == 1) {
                            clearInterval(timerId);
                        }

                        if (lat && lon) {
                            // map.getMap().setCenter(new google.maps.LatLng(lat, lon));
                            // map.getMap().setZoom(12);
                        }

                    }, 
                    error: function(code, message) {
                        $('#artist-info').append('<div class="box normal error event"><h4 class="museo-slab">Not found </h4></div>');
                        clearInterval(timerId);

                        if (code == 4)
                            alert('error!');
                    }
                });

                if (page != totalPages) {
                    page++;                    
                } else {
                    clearInterval(timerId);
                }
            
            },

            2000);

    });

    /**
     *  Get events by city/country
     */
    
    $(document).on('click', "#cityButton", function() {

        var search_val = isValidSearch();

        if (!search_val) {
            return false;
        }

        var totalPages, 
            total, 
            page = 1,
            isFoundBox = false;

        var timerId = setInterval( 

            function() {

                lastfm.geo.getEvents({location: search_val, page: page, limit: 10}, {
                    success: function(data) {
                        
                        var events = data.events.event;

                        if (typeof events == 'undefined') {
                            $('#artist-info').append('<div class="box normal error event"><h4 class="museo-slab">Not found </h4></div>');
                            clearInterval(timerId);
                        }

                        if (typeof events.length == 'undefined') {
                            var ev = [];
                            ev.push(events);
                            events = ev;
                        }

                        totalPages = data.events["@attr"].totalPages;
                        total = data.events["@attr"].total;

                        if (page == 2 && isFoundBox == false) {
                            $('#artist-info').append('<div class="success box normal event"><h4 class="museo-slab">' +total+ 
                                ' upcoming events found </h4></div>');
                            isFoundBox = true;
                        }

                        var lat, lon, image, marker;

                        events.forEach(function(value, index) {
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

                            if (lat && lon) {

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
                                                  value.venue.location.street, 
                                                  value.venue.location.city, 
                                                  value.venue.location.country, 
                                                  map.getMap(), 
                                                  marker);
                            }
                        });

                        if (page == 2 && totalPages == 1) {
                            clearInterval(timerId);
                        }

                        if (page == 2 && lat && lon) {
                            map.getMap().setCenter(new google.maps.LatLng(lat, lon));
                            map.getMap().setZoom(12);
                        }

                    }, 
                    error: function(code, message) {
                        $('#artist-info').append('<div class="box normal error event"><h4 class="museo-slab">Not found </h4></div>');
                        clearInterval(timerId);

                        if (code == 4)
                            alert('error!');
                    }
                });

                if (page != totalPages) {
                    page++;                    
                } else {
                    clearInterval(timerId);
                }
            
            },

            2000);

    });

    /*
     *  Get events by artist
     */

    $(document).on('click', "#artistButton", function() {

        var search_val = isValidSearch();

        if (!search_val) {
            return false;
        }

        var totalPages, 
            total, 
            page = 1,
            isFoundBox = false,
            latLast, 
            lonLast;

        /**
         * Use interval as solution to set right param and get events in right order as result of few async requests 
         */

        var timerId = setInterval( 

            function() {

                lastfm.artist.getEvents(
                    {artist: search_val, autocorrect: 1, page: page, limit: 10}, {

                    success: function(data) {

                        var events = data.events.event;

                        // 0 events found
                        if (typeof events == 'undefined') {
                            $('#artist-info').append('<div class="box normal error event"><h4 class="museo-slab">Not found </h4></div>');
                            clearInterval(timerId);
                        }

                        //1 event found - length is undefined, using secondary array
                        if (typeof events.length == 'undefined') {
                            var ev = [];
                            ev.push(events);
                            events = ev;
                        }

                        totalPages = data.events["@attr"].totalPages;
                        total = data.events["@attr"].total;

                        if (page == 2 && isFoundBox == false) {
                            $('#artist-info').append('<div class="success box normal event"><h4 class="museo-slab">' +total+ 
                                ' upcoming events found </h4></div>');
                            isFoundBox = true;
                        }

                        var lat, lon, marker;

                        // $('#artist-info').append('<div class="success box normal event"></div>');

                        events.forEach(function(value, index) {

                            $('#artist-info').append(
                                '<div class="box normal asphalt event museo-slab">' +
                                //value.id + '<br/>' +
                                value.startDate + '<br/>' +
                                value.venue.name + '<br/>' +
                                value.venue.location.street + '<br/>' +  
                                value.venue.location.city + '<br/>' +
                                value.venue.location.country + '<br/>' +
                                '</div>');

                            lat = value.venue.location['geo:point']['geo:lat'];
                            lon = value.venue.location['geo:point']['geo:long'];

                            if (lat && lon) {

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
                                                  value.venue.location.street,  
                                                  value.venue.location.city, 
                                                  value.venue.location.country, 
                                                  map.getMap(), 
                                                  marker);

                                //add paths between markers

                                if (latLast && lonLast) {

                                    map.addPath(latLast, 
                                                lonLast, 
                                                lat, 
                                                lon, 
                                                map.getMap());
                                }
                            }   

                            latLast = lat;
                            lonLast = lon;                 
                            
                        });

                        if (page == 2 && totalPages == 1) {
                            clearInterval(timerId);
                        }

                    }, 

                    error: function(code, message) {
                        $('#artist-info').append('<div class="box normal error event"><h4 class="museo-slab">Not found </h4></div>');
                        clearInterval(timerId);

                        if (code == 4)
                            alert('error!');
                    }

                });

                if (page != totalPages && totalPages != 1) {
                    page++;                    
                } else {
                    clearInterval(timerId);
                }
            
            },

            2000); 

    });

});

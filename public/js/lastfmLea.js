
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
     * Global vars
     */

    var totalPages, 
        total, 
        page,
        isFoundBox,
        latLast, 
        lonLast,
        isLast,
        lat,
        lon,
        marker,
        eventIcon;

    /**
     * Search field validation
     */

    function isValidSearch() {

        var field = $('input[name="search-field"]');

        /*
         * Init globals on every search
         */

        isFoundBox = false;
        isLast = false;
        page = 1;
        totalPages = 0;
        latLast = 0; 
        lonLast = 0;

        var search_val = field.val();

        if(!search_val) {
            field.addClass("invalid").focus();
            $('#artist-info').children().detach();
            return;
        }
        
        field.removeClass("invalid");

        map.getMap().remove();
        map.initialize();

        $('#artist-info').children(':not(#gotop_area)').detach();

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

        var timerId = setInterval( 

            function() {

                lastfm.venue.search({venue: search_val, page: page, limit: 10}, {
                    success: function(data) {

                        console.log(page + " of " + totalPages);

                        var results = data.results.venuematches.venue;

                        if (typeof results == 'undefined') {
                            $('#artist-info').append('<div class="box normal error event"><h4 class="museo-slab">Not found </h4></div>');
                            clearInterval(timerId);
                            return;
                        }

                        if (typeof results.length == 'undefined') {
                            var ev = [];
                            ev.push(results);
                            results = ev;
                        }

                        total = data.results['opensearch:totalResults'];
                        totalPages = (total % 10) ? Math.floor((+total + 10) / 10) : total / 10 ;

                        if (page == 2 && isFoundBox == false) {
                            NProgress.start();

                            $('#artist-info').append('<div class="success box normal event"><h4 class="museo-slab">' +total+ 
                                ' venues found </h4><h2 class="museo-slab"><span class="loaded">Loading ' +((page-1)*10)+ 
                                '</span> of ' +total+ '</h2></div>');
                            isFoundBox = true;
                        }

                        $('span.loaded').text('Loading ' + (page-1)*10);
                        NProgress.set(((page-1)*10)/total);

                        results.forEach(function(value, index) {

                            console.log(index);

                            $('#artist-info').append(
                                '<div id="'+value.id+'" class="box normal asphalt event museo-slab">' +
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

                                marker = L.marker([lat, lon]).addTo(map.getMap());

                                //add information windows

                                map.addInfoWindow(value.name, 
                                                  '',
                                                  '',
                                                  value.location.street, 
                                                  value.location.city, 
                                                  value.location.country, 
                                                  map.getMap(), 
                                                  marker,
                                                  value.id);
                            }
                        });

                        if (isLast || totalPages == 1) {
                            $('span.loaded').text('Finished ' + ((totalPages == 1) ? results.length : ((page-1)*10 + results.length)));
                            $('#artist-info').append('<br/><br/><br/><br/><br/>');
                            NProgress.done();
                        }

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

                if (page != totalPages && totalPages != 1) {
                    page++;                    
                } else {
                    clearInterval(timerId);
                    isLast = true;
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

        var timerId = setInterval( 

            function() {

                lastfm.geo.getEvents({location: search_val, page: page, limit: 10}, {
                    success: function(data) {
                        
                        var events = data.events.event;

                        if (typeof events == 'undefined') {
                            $('#artist-info').append('<div class="box normal error event"><h4 class="museo-slab">Not found </h4></div>');
                            clearInterval(timerId);
                            return;
                        }

                        if (typeof events.length == 'undefined') {
                            var ev = [];
                            ev.push(events);
                            events = ev;
                        }

                        totalPages = data.events["@attr"].totalPages;
                        total = data.events["@attr"].total;

                        if (page == 2 && isFoundBox == false) {
                            NProgress.start();

                            $('#artist-info').append('<div class="success box normal event"><h4 class="museo-slab">' +total+ 
                                ' upcoming events found </h4><h2 class="museo-slab"><span class="loaded">Loading ' +((page-1)*10)+ 
                                '</span> of ' +total+ '</h2></div>');
                            isFoundBox = true;
                        }

                        $('span.loaded').text('Loading ' + (page-1)*10);
                        NProgress.set(((page-1)*10)/total);

                        events.forEach(function(value, index) {
                            $('#artist-info').append(
                                '<div id="'+value.id+'" class="box normal asphalt event museo-slab">' +
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

                            /*image = new google.maps.MarkerImage(value.image[2]['#text'],
                                    new google.maps.Size(50, 50),
                                    new google.maps.Point(0,0),
                                    new google.maps.Point(0, 50));*/

                            if (lat && lon) {

                                //add markers

                                eventIcon = L.icon({
                                    iconUrl: value.image[2]['#text'],
                                    iconSize: [75, 75],
                                    // iconAnchor: [22, 94],
                                    // popupAnchor: [-3, -76],
                                    // shadowUrl: 'my-icon-shadow.png',
                                    // shadowRetinaUrl: 'my-icon-shadow@2x.png',
                                    // shadowSize: [68, 95],
                                    // shadowAnchor: [22, 94]
                                });

                                marker = L.marker([lat, lon], {icon: eventIcon, riseOnHover: true, riseOffset: 25}).addTo(map.getMap());

                                //add information windows

                                map.addInfoWindow(value.title,
                                                  value.startDate, 
                                                  value.venue.name, 
                                                  value.venue.location.street, 
                                                  value.venue.location.city, 
                                                  value.venue.location.country, 
                                                  map.getMap(), 
                                                  marker,
                                                  value.id);
                            }
                        });

                        if (isLast || totalPages == 1) {
                            $('span.loaded').text('Finished ' + ((totalPages == 1) ? events.length : ((page-1)*10 + events.length)));
							$('#artist-info').append('<br/><br/><br/><br/><br/>');
                            NProgress.done();
						}

                        if (page == 2 && totalPages == 1) {
                            clearInterval(timerId);
                        }

                        if (page == 2 && lat && lon) {
                            map.getMap().setView([lat, lon], 10);
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
                    isLast = true;
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

        /**
         * Use interval as solution to set right param and get events in right order as result of few async requests 
         */

        var timerId = setInterval( 

            function() {

                lastfm.artist.getEvents(
                    {artist: search_val, autocorrect: 1, page: page, limit: 10}, {

                    success: function(data) {

                        console.log(page + ' of ' + totalPages);

                        var events = data.events.event;

                        // 0 events found
                        if (typeof events == 'undefined') {
                            $('#artist-info').append('<div class="box normal error event"><h4 class="museo-slab">Not found </h4></div>');
                            clearInterval(timerId);
                            return;
                        }

                        //1 event found - length is undefined, using secondary array
                        if (typeof events.length == 'undefined') {
                            var ev = [];
                            ev.push(events);
                            events = ev;
                        }

                        totalPages = data.events["@attr"].totalPages;
                        total = data.events["@attr"].total;

                        if ((page == 1 || page == 2) && isFoundBox == false) {
                            NProgress.start();

                            $('#artist-info').append('<div class="success box normal event"><h4 class="museo-slab">' +total+ 
                                ' upcoming events found </h4><h2 class="museo-slab"><span class="loaded">Loading ' +((page-1)*10)+ 
                                '</span> of ' +total+ '</h2></div>');
                            isFoundBox = true;
                        }

                        $('span.loaded').text('Loading ' + (page-1)*10);
                        NProgress.set(((page-1)*10)/total);

                        events.forEach(function(value, index) {

                            console.log(index);

                            $('#artist-info').append(
                                '<div id="'+value.id+'" class="box normal asphalt event museo-slab">' +
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
                                marker = L.marker([lat, lon]).addTo(map.getMap());

                                //add information windows

                                map.addInfoWindow(value.title,
                                                  value.startDate, 
                                                  value.venue.name,
                                                  value.venue.location.street,  
                                                  value.venue.location.city, 
                                                  value.venue.location.country, 
                                                  map.getMap(), 
                                                  marker,
                                                  value.id);

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

						if (isLast || totalPages == 1) {
                            $('span.loaded').text('Finished ' + ((totalPages == 1) ? events.length : ((page-1)*10 + events.length)));
							$('#artist-info').append('<br/><br/><br/><br/><br/>');
                            NProgress.done();
						}

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
                    console.log('before');
                    page++;                    
                } else {
                    clearInterval(timerId);
                    isLast = true;
                }

            },

            2000); 

    });

});

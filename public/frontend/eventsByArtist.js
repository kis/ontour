
require(['backbone',   
		 'frontend/models/Event',
		 'frontend/models/Map',
		 'frontend/models/SearchStatus',
		 'frontend/views/EventView',
		 'frontend/views/EventsList',
		 'frontend/views/MapView',
		 'frontend/views/SearchStatusView',
		 'frontend/collections/Events'], 
		 function(backbone, Event, Map, SearchStatus, EventView, EventsList, MapView, SearchStatusView, Events) {

	var map = new Map(),
		mapView = new MapView({model: map});

	function getSearchValue() {

		var field = $(".search-field");
		var search_val = field.val();

		if(!search_val) {
			field.addClass("invalid").focus();
			$('#artist-info').children().detach();
			return;
		}

		field.removeClass("invalid");
		$('#artist-info').children(':not(#go-top, .info-block)').detach();

		return search_val;
	}


	$(document).on('click', "#artist-button", getEventsByParam.bind(this, 'artist'));

	$(document).on('click', "#city-button", getEventsByParam.bind(this, 'geo'));


	function getEventsByParam(param) {

		var search_val = getSearchValue();

		if (!search_val) {
			return false;
		}

		if (typeof eventsListView !== 'undefined') {
			eventsListView.reset();
		}

		var search = new SearchStatus({page: 1, total: 1, totalPages: 1, status: 1}),
			searchView = new SearchStatusView({model: search});

		var eventCollection = new Events();
			eventsListView = new EventsList({collection: eventCollection});

		function go() {
			Backbone.ajax({
				url: 'http://ws.audioscrobbler.com/2.0/',
				type: 'GET',
				data: {
					method: param + '.getevents',
					location: search_val,
					artist: search_val,
					autocorrect: 1,
					page: search.get('page'),
					limit: 10,
					api_key: 'dd349d2176d3b97b8162bb0c0e583b1c',
					format: 'json'
				},
				success: function(data) {
					getEventsData(data, eventCollection, param, search, searchView);

					search.set('page', search.get('page') + 1);

					if (search.get('page') <= search.get('totalPages')) {
						go();
					} else {
						$('span.loaded').text('Finished ' + search.get('total'));
						$('#artist-info').append('<br/><br/><br/><br/><br/><br/>');
						eventsListView.addPaths();
					}

				}
			});
		}

		go();

	}

	function getEventsData(data, eventCollection, param, search, searchView) {

		var events = data.events.event;
		
		if (data.events.total == 0) {
			$('#artist-info').append('<div class="info-block"><h4>Not found</h4></div>');
			return false;
		}

		search.set({totalPages: data.events["@attr"].totalPages,
					total: data.events["@attr"].total});

		searchView.render();

		/*if (page == totalPages && /1$/.test(data.events["@attr"].total)) {
			if (page == 1) {
				$('#artist-info').append('<div class="info-block"><h4>' +total+ ' upcoming events found</h4>');
			}             
			createEventModel(events, events, null);
			return false;
		}

		if (page == 1) {
			$('#artist-info').append('<div class="info-block"><h4>' +total+ 
					' upcoming events found </h4><h2><span class="loaded">Loading ' +(page*10)+ 
					'</span> of ' +total+ '</h2></div>');
		} else {
			$('span.loaded').text('Loading ' + (page*10));
		}*/

		events.forEach(function(value, index) {
			createEventModel(events, value, index);

			if(search.get('page') == 1 && index == 0) {
				mapView.getMap().setView(
					L.latLng(value.venue.location['geo:point']['geo:lat'], 
							 value.venue.location['geo:point']['geo:long']), 
					param == "artist" ? 4 : 12);
			}
		});

		function createEventModel(events, value, index) {
			eventCollection.add(new Event({
				id: value.id,
				title: value.title,
				artists: value.artists,
				date: value.startDate,
				venue: value.venue,
				image: value.image[2]['#text'],
				map: mapView.getMap(),
				param: param
			}));
		}

	}

});
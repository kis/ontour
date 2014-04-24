define(['models/Menu',
		'models/Event',
		'models/Map',
		'models/SearchStatus',
		'views/MenuView',
		'views/EventView',
		'views/EventsList',
		'views/MapView',
		'views/SearchStatusView',
		'collections/Events',
		'marionette'
], function(Menu, Event, Map, SearchStatus, MenuView, EventView, EventsList, MapView, SearchStatusView, Events) {
	'use strict';

	var app = new Marionette.Application();

	var mapView = new MapView({model: new Map()}),
		menuView = new MenuView({model: new Menu()}),
		searchView = new SearchStatusView({model: 
			new SearchStatus({
				page: 1, 
				total: 1, 
				totalPages: 1
			})
		}),
		eventsListView = new EventsList({collection: new Events()});

	app.addRegions({
		// map: '#map',
		menu: '#search'
		// status: '#status',
		// events: '#events'
	});

	app.addInitializer(function () {
		// app.map.show(mapView);
		app.menu.show(menuView);
		// app.status.show(SearchStatusView);
		// app.events.show(eventsListView);
	});

	return app;

});
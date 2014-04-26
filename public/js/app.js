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
		'models/AutocompleteItem',
		'collections/AutocompleteCollection',
		'views/AutocompleteList',
		'marionette'
], function(Menu, 
			Event, 
			Map, 
			SearchStatus, 
			MenuView, 
			EventView, 
			EventsList, 
			MapView, 
			SearchStatusView, 
			Events,
			AutocompleteItem,
			AutocompleteCollection,
			AutocompleteList) {
	'use strict';

	var app = new Marionette.Application();

	app.addRegions({
		menu: '#search',
		autocomplete: '#autocomplete',
		// status: '#status',
		events: '#events'
	});

	var menuView = new MenuView({model: new Menu()}),
		searchView = new SearchStatusView({model: new SearchStatus()}),
		eventsListView = new EventsList({collection: new Events()}),
		autocompleteList = new AutocompleteList({collection: new AutocompleteCollection()});

	app.addInitializer(function () {
		app.menu.show(menuView);
		app.autocomplete.show(autocompleteList);
		// app.status.show(SearchStatusView);
		app.events.show(eventsListView);
	});

	return app;

});
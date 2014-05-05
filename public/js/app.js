define(['models/Menu',
		'models/Controls',
		'models/Event',
		'models/Map',
		'models/Search',
		'views/MenuView',
		'views/ControlsView',
		'views/EventView',
		'views/EventsList',
		'views/MapView',
		'views/SearchView',
		'views/SettingsView',
		'collections/Events',
		'models/AutocompleteItem',
		'collections/AutocompleteCollection',
		'views/AutocompleteList',
		'marionette'
], function(Menu, 
			Controls,
			Event, 
			Map, 
			Search, 
			MenuView, 
			ControlsView,
			EventView, 
			EventsList, 
			MapView, 
			SearchView,
			SettingsView,
			Events,
			AutocompleteItem,
			AutocompleteCollection,
			AutocompleteList) {
	'use strict';

	var app = new Marionette.Application();

	app.addRegions({
		menu: '#search',
		controls: '#controls',
		settings: '#settings',
		autocomplete: '#autocomplete',
		// status: '#status',
		events: '#events'
	});

	var menuView = new MenuView({model: new Menu()}),
		controlsView = new ControlsView({model: new Controls()}),
		settingsView = new SettingsView(),
		searchView = new SearchView({model: new Search()}),
		eventsListView = new EventsList({collection: new Events()}),
		autocompleteList = new AutocompleteList({collection: new AutocompleteCollection()});

	app.addInitializer(function () {
		app.menu.show(menuView);
		app.controls.show(controlsView);
		app.settings.show(settingsView);
		app.autocomplete.show(autocompleteList);
		// app.status.show(SearchView);
		app.events.show(eventsListView);
	});

	return app;

});
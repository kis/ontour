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
		'models/Notification',
		'views/NotificationView',
		'marionette',
		'scrollbar',
		'mousewheel'
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
			AutocompleteList,
			Notification,
			NotificationView,
			scrollbar,
			mousewheel) {
	'use strict';

	var app = new Marionette.Application();

	app.addRegions({
		menu: '#search',
		controls: '#controls',
		settings: '#settings',
		autocomplete: '#autocomplete',
		notification: '#notification',
		search: '#status',
		events: '#events'
	});

	var menuView 	 	 = new MenuView({model: new Menu()}),
		controlsView 	 = new ControlsView({model: new Controls()}),
		settingsView 	 = new SettingsView(),
		searchView 		 = new SearchView({model: new Search()}),
		notificationView = new NotificationView({model: new Notification()}),
		eventsList       = new EventsList({collection: new Events()}),
		autocompleteList = new AutocompleteList({collection: new AutocompleteCollection()});

	app.addInitializer(function () {
		app.menu.show(menuView);
		app.controls.show(controlsView);
		app.settings.show(settingsView);
		app.notification.show(notificationView);
		app.search.show(searchView);
		app.events.show(eventsList);
		app.autocomplete.show(autocompleteList);
	});

	return app;

});
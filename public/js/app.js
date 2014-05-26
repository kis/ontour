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
		'models/Tag',
		'collections/Tags',
		'views/TagView',
		'views/TagsList',
		'models/Date',
		'collections/DateCollection',
		'views/DateView',
		'views/DateList',
		'views/EventDetailsView',
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
			Tag,
			Tags,
			TagView,
			TagsList,
			Date,
			DateCollection,
			DateView,
			DateList,
			EventDetailsView,
			scrollbar,
			mousewheel) {
	'use strict';

	var app = new Marionette.Application();

	app.addRegions({
		menu         : '#search',
		controls 	 : '#controls',
		// settings 	 : '#settings',
		autocomplete : '#autocomplete',
		notification : '#notification',
		search 		 : '#status',
		events 		 : '#events',
		tags 		 : '#tags',
		year 		 : '#years',
		month 		 : '#months',
		day 		 : '#days'
	});

	var menuView = new MenuView({
			model: new Menu()
		}),
		controlsView = new ControlsView({
			model: new Controls()
		}),
		settingsView = new SettingsView(),
		searchView = new SearchView({
			model: new Search()
		}),
		notificationView = new NotificationView({
			model: new Notification()
		}),
		eventsList = new EventsList({
			collection: new Events()
		}),
		eventDetails = new EventDetailsView({
			model: new Event()
		}),
		autocompleteList = new AutocompleteList({
			collection: new AutocompleteCollection()
		}),
		tagsList = new TagsList({
			collection: new Tags([
				{name: "rock"},
				{name: "pop"},
				{name: "alternative"},
				{name: "indie"},
				{name: "electronic"},
				{name: "classic rock"},
				{name: "hip-hop"},
				{name: "dance"},
				{name: "jazz"}
			])
		}),
		yearList = new DateList({
			collection: new DateCollection([
				{name: 2014},
				{name: 2015},
				{name: 2016},
				{name: 2017},
				{name: 2018},
				{name: 2019}
			])
		}),
		monthList = new DateList({
			collection: new DateCollection([
				{name: 'January'},
				{name: 'February'},
				{name: 'March'},
				{name: 'April'},
				{name: 'May'},
				{name: 'June'},
				{name: 'July'},
				{name: 'August'},
				{name: 'September'},
				{name: 'October'},
				{name: 'November'},
				{name: 'December'}
			])
		}),
		dayCollection = new DateCollection(),
		dayList = new DateList({
			collection: dayCollection
		});

		yearList.collection.type = 'Year';
		monthList.collection.type = 'Month';
		dayList.collection.type = 'Day';

	for (var i = 1; i < 32; i++) {
		dayCollection.push({name: i});
	}

	app.addInitializer(function () {
		app.menu.show(menuView);
		app.controls.show(controlsView);
		// app.settings.show(settingsView);
		app.notification.show(notificationView);
		app.search.show(searchView);
		app.events.show(eventsList);
		app.autocomplete.show(autocompleteList);
		app.tags.show(tagsList);
		app.year.show(yearList);
		app.month.show(monthList);
		app.day.show(dayList);
	});

	return app;

});
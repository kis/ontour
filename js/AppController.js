define(['App', 
        'marionette',
        'models/Menu',
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
], function (App, 
             Marionette, 
             Menu, 
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

    return Marionette.Controller.extend({

        initialize: function() {

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
                    {name: 2017}
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

            App.map = new MapView({model: new Map()});

            App.menu.show(menuView);
            App.controls.show(controlsView);
            // App.settings.show(settingsView);
            App.notification.show(notificationView);
            App.search.show(searchView);
            App.events.show(eventsList);
            App.autocomplete.show(autocompleteList);
            App.tags.show(tagsList);
            App.year.show(yearList);
            App.month.show(monthList);
            App.day.show(dayList);
        },

        index: function() {
            App.vent.trigger('index-route'); 
        },

        search: function(query) {
            if (query) {
                App.vent.trigger('search', query);
            }
        },

        myevents: function() {
            App.vent.trigger('myevents');
        }

    });

});

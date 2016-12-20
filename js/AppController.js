import App from './App';
import Backbone from 'backbone';
import Marionette from 'backbone.marionette';
import Menu from './models/Menu'; 
import Controls from './models/Controls';
import Event from './models/Event'; 
import Map from './models/Map';
import Search from './models/Search';
import MenuView from './views/MenuView';
import ControlsView from './views/ControlsView';
import EventView from './views/EventView';
import EventsList from './views/EventsList';
import MapView from './views/MapView';
import SearchView from './views/SearchView';
import Events from './collections/Events';
import AutocompleteItem from './models/AutocompleteItem';
import AutocompleteCollection from './collections/AutocompleteCollection';
import AutocompleteList from './views/AutocompleteList';
import Notification from './models/Notification';
import NotificationView from './views/NotificationView';
import Tag from './models/Tag';
import Tags from './collections/Tags';
import TagView from './views/TagView';
import TagsList from './views/TagsList';
import Date from './models/Date';
import DateCollection from './collections/DateCollection';
import DateView from './views/DateView';
import DateList from './views/DateList';
import EventDetailsView from './views/EventDetailsView';

var contr = Marionette.Object.extend({

    initialize: function() {

        var menuView = new MenuView({
            model: new Menu()
        }),
        controlsView = new ControlsView({
            model: new Controls()
        }),
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

        App.menu = menuView;
        App.controls = controlsView;
        App.notification = notificationView;
        App.search = searchView;
        App.events = eventsList;
        App.autocomplete = autocompleteList;
        App.tags = tagsList;
        App.year = yearList;
        App.month = monthList;
        App.day = dayList;
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

export default contr;
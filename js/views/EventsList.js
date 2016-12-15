define(['views/EventView',
		'models/Event',
		'App',
		'marionette'
], function(EventView, Event, App, Marionette) {
	'use strict';

	return Marionette.CollectionView.extend({

		el: '#events',

		itemView: EventView,
		
		itemViewContainer: '#events',

		events: {
			'scroll' : 'scroll'
		},

		initialize: function() {
			this.listenTo(App.vent, 'setParam', this.setParam);
			this.listenTo(App.vent, 'addEvent', this.addEvent);
			this.listenTo(App.vent, 'addPaths', this.setPaths);
			this.listenTo(App.vent, 'getEvents', this.reset);
			this.listenTo(App.vent, 'reset', this.reset);
			this.listenTo(App.vent, 'index-route', this.off);
			this.listenTo(App.vent, 'switchMarkers', this.switchMarkers);
			this.listenTo(App.vent, 'switchPaths', this.switchPaths);
			this.listenTo(App.vent, 'gotop', this.gotop);
			this.listenTo(App.vent, 'filter', this.filter);
			this.listenTo(App.vent, 'setHeight', this.setHeight);
		},

		off: function() {
			this.reset();
			this.$el.hide();
		},

		setParam: function(param) {
			this.collection.param = param;
			this.$el.show();
		},

		addEvent: function(value) {
			this.collection.add(new Event({
				id 		: value.id,
				title   : value.title,
				artists : value.artists,
				date    : value.startDate,
				venue   : value.venue,
				image   : value.image[2]['#text'],
				url     : value.url
			}));

			this.$el.perfectScrollbar();
		},

		setPaths: function(event) {
			if (this.collection.param == 'geo') {
				return false;
			}

			this.collection.each(function(event, index, list) {
				if (!event.get('marker') || index == list.length - 1 || !list[index+1].get('marker')) {
					return false;
				}

				var latlng1 = event.get('marker').getLatLng();
				var latlng2 = list[index+1].get('marker').getLatLng();

				var polyline = L.polyline([latlng1, latlng2], {color: '#10315a', weight: 2, opacity: 1}).addTo(App.map.getMap());
				event.set('path', polyline);
			});
		},

		filter: function(date) {
			this.hideMarkers();
			this.hidePaths();

			var self = this;

			this.collection.each(function(event) {
				var eventDate = new Date(event.get('date'));

				if ((eventDate.getFullYear() == date.year || !date.year) &&
					(eventDate.getMonth() == date.month || !date.month) &&
					(eventDate.getDate() == date.day || !date.day)) {
						if (event.get('marker') && self.collection.showMarkers) {
							App.map.getCluster().addLayer(event.get('marker'));
						}

						if (event.get('path') && self.collection.showPaths) {
							App.map.getMap().addLayer(event.get('path'));
						}

						event.set('filtered', true);
				} else {
					event.set('filtered', false);
				}
			});

			this.gotop();
		},

		switchMarkers: function() {
			if (this.collection.showMarkers) {
				this.collection.showMarkers = false;
				this.hideMarkers();
			} else {
				this.collection.showMarkers = true;
				this.showMarkers();
			}
		},

		showMarkers: function() {
			this.collection.each(function(event) {
				if(event.get('marker') && event.get('filtered')) {
					App.map.getCluster().addLayer(event.get('marker'));
				}
			});
		},	

		hideMarkers: function() {
			this.collection.each(function(event) {
				if(event.get('marker') && event.get('filtered')) {
					App.map.getCluster().removeLayer(event.get('marker'));
				}
			});
		},

		switchPaths: function() {
			if (this.collection.showPaths) {
				this.collection.showPaths = false;
				this.hidePaths();
			} else {
				this.collection.showPaths = true;
				this.showPaths();
			}
		},

		showPaths: function() {
			this.collection.each(function(event) {
				if(event.get('path') && event.get('filtered')) {
					App.map.getMap().addLayer(event.get('path'));
				}
			});
		},

		hidePaths: function() {
			this.collection.each(function(event) {
				if(event.get('path') && event.get('filtered')) {
					App.map.getMap().removeLayer(event.get('path'));
				}
			});
		},

		reset: function(event) {
			this.collection.each(function(event) {
				if(event.get('path')) {
					App.map.getMap().removeLayer(event.get('path'));
				}
			});

			this.collection.reset();
		},

		scroll: function() {
			if (this.$el.scrollTop() > this.$el.height()) {
				App.vent.trigger('gotop-show');
			} else {
				App.vent.trigger('gotop-hide');
			}
		},

		gotop: function() {
			this.$el.animate({
				'scrollTop': 0
				}, 500, 'swing');
		},

		setHeight: function(menu_height) {
			this.$el.css('height', $('#sidebar').height() - menu_height - 45);
		}

	});

});
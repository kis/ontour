define(['views/EventView',
		'models/Event',
		'channel',
		'map',
		'marionette'
], function(EventView, Event, channel, map) {
	'use strict';

	return Marionette.CollectionView.extend({

		el: '#events',

		itemView: EventView,
		
		itemViewContainer: '#events',

		events: {
			'scroll' : 'scroll'
		},

		initialize: function() {
			this.listenTo(channel, 'setParam', this.setParam);
			this.listenTo(channel, 'addEvent', this.addEvent);
			this.listenTo(channel, 'addPaths', this.setPaths);
			this.listenTo(channel, 'getEvents', this.reset);
			this.listenTo(channel, 'reset', this.reset);
			this.listenTo(channel, 'switchMarkers', this.switchMarkers);
			this.listenTo(channel, 'switchPaths', this.switchPaths);
			this.listenTo(channel, 'gotop', this.gotop);
			this.listenTo(channel, 'filter', this.filter);
		},

		setParam: function(param) {
			this.collection.param = param;
		},

		addEvent: function(value) {
			this.collection.add(new Event({
				id: value.id,
				title: value.title,
				artists: value.artists,
				date: value.startDate,
				venue: value.venue,
				image: value.image[2]['#text']
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

				var polyline = L.polyline([latlng1, latlng2], {color: '#10315a', weight: 2, opacity: 1}).addTo(map);
				event.set('path', polyline);
			});
		},

		filter: function(date) {
			this.hideMarkers();
			this.hidePaths();

			this.collection.each(function(event) {
				var eventDate = new Date(event.get('date'));

				if ((eventDate.getFullYear() == date.year || date.year == 'Год') &&
					(eventDate.getMonth() + 1 == date.month || date.month == 'Месяц') &&
					(eventDate.getDate() == date.day || date.day == 'День')) {
						if (event.get('marker')) {
							map.addLayer(event.get('marker'));
						}

						if (event.get('path')) {
							map.addLayer(event.get('path'));
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
					map.addLayer(event.get('marker'));
				}
			});
		},	

		hideMarkers: function() {
			this.collection.each(function(event) {
				if(event.get('marker') && event.get('filtered')) {
					map.removeLayer(event.get('marker'));
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
					map.addLayer(event.get('path'));
				}
			});
		},

		hidePaths: function() {
			this.collection.each(function(event) {
				if(event.get('path') && event.get('filtered')) {
					map.removeLayer(event.get('path'));
				}
			});
		},

		reset: function(event) {
			this.collection.each(function(event) {
				if(event.get('marker')) {
					map.removeLayer(event.get('marker'));
				}

				if(event.get('path')) {
					map.removeLayer(event.get('path'));
				}
			});

			this.collection.reset();
		},

		scroll: function() {
			if (this.$el.scrollTop() > this.$el.height()) {
				channel.trigger('gotop-show');
			} else {
				channel.trigger('gotop-hide');
			}
		},

		gotop: function() {
			this.$el.animate({
				'scrollTop': 0
				}, 500, 'swing');
		}

	});

});
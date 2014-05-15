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
			this.listenTo(channel, 'addPaths', this.addPaths);
			this.listenTo(channel, 'getEvents', this.reset);
			this.listenTo(channel, 'reset', this.reset);
			this.listenTo(channel, 'switchMarkers', this.switchMarkers);
			this.listenTo(channel, 'switchPaths', this.switchPaths);
			this.listenTo(channel, 'gotop', this.gotop);
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

		addPaths: function(event) {
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

		filterByMonth: function() {
			
			// this.collection.where({date: })
		},

		switchMarkers: function() {
			if (this.collection.showMarkers) {
				this.collection.showMarkers = false;

				this.collection.each(function(event) {
					if(event.get('marker')) {
						map.removeLayer(event.get('marker'));
					}
				});
			} else {
				this.collection.showMarkers = true;

				this.collection.each(function(event) {
					if(event.get('marker')) {
						map.addLayer(event.get('marker'));
					}
				});
			}
		},

		switchPaths: function() {
			if (this.collection.showPaths) {
				this.collection.showPaths = false;

				this.collection.each(function(event) {
					if(event.get('path')) {
						map.removeLayer(event.get('path'));
					}
				});
			} else {
				this.collection.showPaths = true;

				this.collection.each(function(event) {
					if(event.get('path')) {
						map.addLayer(event.get('path'));
					}
				});
			}
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
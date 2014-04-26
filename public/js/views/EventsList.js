define(['views/EventView',
		'models/Event',
		'channel',
		'map',
		'marionette'
], function(EventView, Event, channel, map) {
	'use strict';

	return Marionette.CollectionView.extend({

		itemView: EventView,
		
		itemViewContainer: '#events',

		events: {
			'scroll' : 'scroll'
		},

		initialize: function() {
			$('#go-top').on('click', this.gotop.bind(this));

			this.listenTo(channel, 'getEvents', this.reset);
			this.listenTo(channel, 'addEvents', this.addEvents);
			this.listenTo(channel, 'addPaths', this.addPaths);
			this.listenTo(channel, 'reset', this.reset);
		},

		addEvents: function(value, param) {

			this.collection.add(new Event({
				id: value.id,
				title: value.title,
				artists: value.artists,
				date: value.startDate,
				venue: value.venue,
				image: value.image[2]['#text'],
				// param: param
			}));

		},

		addPaths: function(event) {

			this.collection.each(function(event, index, list) {
				if (event.get('param') == 'geo' || index == list.length - 1) {
					return false;
				}

				if (!event.get('marker') || !list[index+1].get('marker')) {
					return false;
				}

				var latlng1 = event.get('marker').getLatLng();
				var latlng2 = list[index+1].get('marker').getLatLng();

				var polyline = L.polyline([latlng1, latlng2], {color: '#10315a', weight: 2, opacity: 1}).addTo(map);
				event.set('path', polyline);
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
				$('#go-top').css({
					display: 'block'
				});
			} else {
				$('#go-top').css({
					display: 'none'
				});
			}
		},

		gotop: function() {
			this.$el.animate({
				'scrollTop': 0
				}, 500, 'swing');
		}

	});

});
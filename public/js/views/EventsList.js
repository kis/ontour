define(['views/EventView',
		'models/Event', 
		'channel',
		'marionette'
], function(EventView, channel) {
	'use strict';

	return Marionette.CollectionView.extend({

		el: '#events',

		itemView: EventView,

		events: {
			'scroll' : 'scroll'
		},

		initialize: function() {
			$('#go-top').on('click', this.gotop.bind(this));

			channel.on('addPaths', this.addPaths, this);
			channel.on('reset', this.reset, this);
		},

		addEvents: function(value) {

			this.collection.add(new Event({
				id: value.id,
				title: value.title,
				artists: value.artists,
				date: value.startDate,
				venue: value.venue,
				image: value.image[2]['#text'],
				map: mapView.getMap(),
				param: param
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

				var polyline = L.polyline([latlng1, latlng2], {color: '#10315a', weight: 2, opacity: 1}).addTo(event.get('map'));
				event.set('path', polyline);
			});

		},

		reset: function(event) {

			this.collection.each(function(event) {
				if(event.get('marker')) {
					event.get('map').removeLayer(event.get('marker'));
				}

				if(event.get('path')) {
					event.get('map').removeLayer(event.get('path'));
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
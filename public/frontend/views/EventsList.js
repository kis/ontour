define(['frontend/views/EventView', 
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
			channel.on('addPaths', this.addPaths, this);
			channel.on('reset', this.reset, this);
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
		}

	});

});
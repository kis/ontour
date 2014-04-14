define(['underscore', 
		'backbone', 
		'frontend/views/EventView', 
		'channel'
], function(_, Backbone, EventView, channel) {
	'use strict';

	return Backbone.View.extend({

		el: '#artist-info',

		initialize: function() {
			this.collection.on('add', this.addOne, this);

			channel.on('addPaths', this.addPaths, this);

			channel.on('reset', this.reset, this);
		},

		render: function() {
			this.collection.each(this.addOne, this);
			return this;
		},

		addOne: function(event) {
			var eventView = new EventView({model: event});
			this.$el.append(eventView.render().el);
		},

		addPaths: function(event) {

			this.collection.each(function(event, index, list) {
				if (event.get('param') == 'geo' || index == list.length - 1) {
					return false;
				}

				if (!event.get('marker') || !list[index+1].get('marker')) {
					return false;
				}

				var latlng1 = L.latLng(event.get('venue').location['geo:point']['geo:lat'], 
									   event.get('venue').location['geo:point']['geo:long']);

				var latlng2 = L.latLng(list[index+1].get('venue').location['geo:point']['geo:lat'], 
									   list[index+1].get('venue').location['geo:point']['geo:long']);

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
		}

	});

});
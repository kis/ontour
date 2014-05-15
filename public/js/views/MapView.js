define(['channel',
		'marionette', 
		'mapbox'
], function(channel) {
	'use strict';

	return Marionette.ItemView.extend({

		initialize: function() {
			/*kirillstyopkin.h29f88g0
			zr0njcqy
			4l7djmvo*/

			this.model.set('map', L.mapbox.map('map', 'examples.map-i87786ca').setView([0, 0], 2))
				.get('map').zoomControl.setPosition('bottomright');

			this.listenTo(channel, 'setView', this.setView);
		},

		getMap: function() {
			return this.model.get('map');
		},

		setView: function(list, param) {
			var self = this;

			for(var i = 0; i < list.length; i++) {
				if (list[i].venue.location['geo:point']['geo:lat'] &&
					list[i].venue.location['geo:point']['geo:long']) {
					self.getMap().setView(
						L.latLng(list[i].venue.location['geo:point']['geo:lat'], 
								 list[i].venue.location['geo:point']['geo:long']), 
						(param == "artist") ? 4 : 12
					);
					break;
				}
			}
		}

	});

});
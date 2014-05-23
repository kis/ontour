define(['channel',
		'cluster',
		'marionette', 
		'mapbox'
], function(channel, cluster) {
	'use strict';

	return Marionette.ItemView.extend({

		el: '#map',

		initialize: function() {
			/*kirillstyopkin.h29f88g0
			zr0njcqy
			4l7djmvo*/

			this.model.set('map', L.mapbox.map('map', 'examples.map-i87786ca').setView([0, 0], 2))
				.get('map').zoomControl.setPosition('bottomright');

			this.listenTo(channel, 'setView', this.setView);
			this.listenTo(channel, 'addToCluster', this.addToCluster);
			this.listenTo(channel, 'resetCluster', this.resetCluster);
		},

		addToCluster: function(layer) {
		    this.model.get('cluster').addLayer(layer);
			this.getMap().addLayer(this.model.get('cluster'));
		},

		resetCluster: function() {
			this.getMap().removeLayer(this.model.get('cluster'));
			this.model.set('cluster', new L.MarkerClusterGroup());
		},

		getCluster: function() {
			return this.model.get('cluster');
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
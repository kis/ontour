define(['underscore', 
		'backbone',
		'marionette', 
		'mapbox'
], function(_, Backbone, Marionette) {
	'use strict';

	return Backbone.Marionette.ItemView.extend({

		getMap: function() {
			return this.model.get('map');
		},

		initialize: function() {
			/*kirillstyopkin.h29f88g0
			zr0njcqy
			4l7djmvo*/

			this.model.set('map', L.mapbox.map('map', 'examples.map-vyofok3q').setView([0, 0], 2))
					  .get('map').zoomControl.setPosition('bottomright');
		}

	});

});
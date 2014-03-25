
define(['underscore', 'backbone', 'leaflet'], function(_, Backbone) {

	var MapView = Backbone.View.extend({

		getMap: function() {
			return this.model.get('map');
		},

		initialize: function() {
			this.model.set('map', L.map('map-canvas').setView([0, 0], 2))
					  .get('map').zoomControl.setPosition('bottomright');

    	    //'http://{s}.tiles.mapbox.com/v3/kirillstyopkin.h29f88g0/{z}/{x}/{y}.png'

			L.tileLayer('http://api.tiles.mapbox.com/v3/examples.map-zr0njcqy/{z}/{x}/{y}.png', {
			    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://cloudmade.com">CloudMade</a>',
			    maxZoom: 18
			}).addTo(this.model.get('map'));
		}

	});

	return MapView;

});
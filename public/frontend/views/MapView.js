define(['underscore', 
		'backbone', 
		'mapbox'
], function(_, Backbone) {
	'use strict';

	return Backbone.View.extend({

		getMap: function() {
			return this.model.get('map');
		},

		initialize: function() {
			L.Map = L.Map.extend({
			    openPopup: function(popup) {
			        //        this.closePopup();  // just comment this
			        this._popup = popup;

			        return this.addLayer(popup).fire('popupopen', {
			            popup: this._popup
			        });
			    },
			    closePopup: function(popup) {
			        //        this.closePopup();  // just comment this
			        this._popup = popup;

			        return this.removeLayer(popup).fire('popupclose', {
			            popup: this._popup
			        });
			    }
			});

			this.model.set('map', L.map('map-canvas').setView([0, 0], 2))
					  .get('map').zoomControl.setPosition('bottomright');

    	    //'http://{s}.tiles.mapbox.com/v3/kirillstyopkin.h29f88g0/{z}/{x}/{y}.png'

			//zr0njcqy

			L.tileLayer('http://api.tiles.mapbox.com/v3/examples.map-vyofok3q/{z}/{x}/{y}.png', {
			    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://cloudmade.com">CloudMade</a>',
			    maxZoom: 18
			}).addTo(this.model.get('map'));
		}

	});

});
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

			/*kirillstyopkin.h29f88g0
			zr0njcqy
			4l7djmvo*/

			this.model.set('map', L.mapbox.map('map', 'examples.map-vyofok3q').setView([0, 0], 2))
					  .get('map').zoomControl.setPosition('bottomright');
		}

	});

});
'use strict';

import Backbone from 'backbone';
import Marionette from 'marionette';
import App from '../App';

export default Marionette.ItemView.extend({

	el: '#map',

	initialize: function() {
		mapboxgl.accessToken = 'pk.eyJ1Ijoia2lyaWxsc3R5b3BraW4iLCJhIjoiZjA3MTRlZDQzYzYyZmQ1ZGMyZDZkNjlhMjliMjQ2YjUifQ.BmlYKQnKTUcpLi2vk2AxYA';
		var map = new mapboxgl.Map({
		    container: 'map', // container id
		    style: 'mapbox://styles/mapbox/streets-v9', //stylesheet location
		    center: [-74.50, 40], // starting position
		    zoom: 9 // starting zoom
		});

		this.model.set('map', map);

		this.listenTo(App.vent, 'setView', this.setView);
		this.listenTo(App.vent, 'resetCluster', this.resetCluster);
	},

	resetCluster: function() {
		// this.getMap().removeLayer(this.model.get('cluster'));
		// this.model.set('cluster', new L.MarkerClusterGroup());
		// this.getMap().addLayer(this.model.get('cluster'));
	},

	getCluster: function() {
		// return this.model.get('cluster');
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
					(param == "artist") ? 4 : 10
				);
				break;
			}
		}
	}

});
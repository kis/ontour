'use strict';

import { View } from 'backbone.marionette';

export default class MapView extends View {

	constructor(props) {
		super(props);

		this.el = '#map';
	}

	initialize() {
		mapboxgl.accessToken = 'pk.eyJ1Ijoia2lyaWxsc3R5b3BraW4iLCJhIjoiZjA3MTRlZDQzYzYyZmQ1ZGMyZDZkNjlhMjliMjQ2YjUifQ.BmlYKQnKTUcpLi2vk2AxYA';
		var map = new mapboxgl.Map({
		    container: 'map', // container id
		    style: 'mapbox://styles/mapbox/streets-v9', //stylesheet location
		    center: [-74.50, 40], // starting position
		    zoom: 9 // starting zoom
		});

		this.model.set('map', map);

		this.on('setView', this.setView);
		this.on('resetCluster', this.resetCluster);
	}

	resetCluster() {
		// this.getMap().removeLayer(this.model.get('cluster'));
		// this.model.set('cluster', new L.MarkerClusterGroup());
		// this.getMap().addLayer(this.model.get('cluster'));
	}

	getCluster() {
		// return this.model.get('cluster');
	}

	getMap() {
		return this.model.get('map');
	}

	setView(list, param) {
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

}
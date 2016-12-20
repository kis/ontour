'use strict';

import { CollectionView } from 'backbone.marionette';
import App from '../App';
import EventView from './EventView';
import Event from '../models/Event';

export default class EventsList extends CollectionView {

	constructor(props) {
		super(props);

		this.el = '#events';

		this.itemView = EventView;
		
		this.itemViewContainer = '#events';

		this.events = {
			'scroll' : 'scroll'
		};
	}

	initialize() {
		this.on('setParam', this.setParam);
		this.on('addEvent', this.addEvent);
		this.on('addPaths', this.setPaths);
		this.on('getEvents', this.reset);
		this.on('reset', this.reset);
		this.on('index-route', this.off);
		this.on('switchMarkers', this.switchMarkers);
		this.on('switchPaths', this.switchPaths);
		this.on('gotop', this.gotop);
		this.on('filter', this.filter);
		this.on('setHeight', this.setHeight);
	}

	off() {
		this.reset();
		this.$el.hide();
	}

	setParam(param) {
		this.collection.param = param;
		this.$el.show();
	}

	addEvent(value) {
		this.collection.add(new Event({
			id 		: value.id,
			title   : value.title,
			artists : value.artists,
			date    : value.startDate,
			venue   : value.venue,
			image   : value.image[2]['#text'],
			url     : value.url
		}));

		this.$el.perfectScrollbar();
	}

	setPaths(event) {
		if (this.collection.param == 'geo') {
			return false;
		}

		this.collection.each(function(event, index, list) {
			if (!event.get('marker') || index == list.length - 1 || !list[index+1].get('marker')) {
				return false;
			}

			var latlng1 = event.get('marker').getLatLng();
			var latlng2 = list[index+1].get('marker').getLatLng();

			// var polyline = L.polyline([latlng1, latlng2], {color: '#10315a', weight: 2, opacity: 1}).addTo(App.map.getMap());
			// event.set('path', polyline);
		});
	}

	filter(date) {
		this.hideMarkers();
		this.hidePaths();

		var self = this;

		this.collection.each(function(event) {
			var eventDate = new Date(event.get('date'));

			if ((eventDate.getFullYear() == date.year || !date.year) &&
				(eventDate.getMonth() == date.month || !date.month) &&
				(eventDate.getDate() == date.day || !date.day)) {
					if (event.get('marker') && self.collection.showMarkers) {
						App.map.getCluster().addLayer(event.get('marker'));
					}

					if (event.get('path') && self.collection.showPaths) {
						App.map.getMap().addLayer(event.get('path'));
					}

					event.set('filtered', true);
			} else {
				event.set('filtered', false);
			}
		});

		this.gotop();
	}

	switchMarkers() {
		if (this.collection.showMarkers) {
			this.collection.showMarkers = false;
			this.hideMarkers();
		} else {
			this.collection.showMarkers = true;
			this.showMarkers();
		}
	}

	showMarkers() {
		this.collection.each(function(event) {
			if(event.get('marker') && event.get('filtered')) {
				App.map.getCluster().addLayer(event.get('marker'));
			}
		});
	}

	hideMarkers() {
		this.collection.each(function(event) {
			if(event.get('marker') && event.get('filtered')) {
				App.map.getCluster().removeLayer(event.get('marker'));
			}
		});
	}

	switchPaths() {
		if (this.collection.showPaths) {
			this.collection.showPaths = false;
			this.hidePaths();
		} else {
			this.collection.showPaths = true;
			this.showPaths();
		}
	}

	showPaths() {
		this.collection.each(function(event) {
			if(event.get('path') && event.get('filtered')) {
				App.map.getMap().addLayer(event.get('path'));
			}
		});
	}

	hidePaths() {
		this.collection.each(function(event) {
			if(event.get('path') && event.get('filtered')) {
				App.map.getMap().removeLayer(event.get('path'));
			}
		});
	}

	reset(event) {
		this.collection.each(function(event) {
			if(event.get('path')) {
				App.map.getMap().removeLayer(event.get('path'));
			}
		});

		this.collection.reset();
	}

	scroll() {
		if (this.$el.scrollTop() > this.$el.height()) {
			this.triggerMethod('gotop-show');
		} else {
			this.triggerMethod('gotop-hide');
		}
	}

	gotop() {
		this.$el.animate({'scrollTop': 0}, 500, 'swing');
	}

	setHeight(menu_height) {
		this.$el.css('height', $('#sidebar').height() - menu_height - 45);
	}

}
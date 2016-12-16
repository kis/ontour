'use strict';

import Marionette from 'marionette';
import App from '../App';
import text from 'text';
import settingsTmpl from 'text!templates/Settings.tmpl';

export default Marionette.ItemView.extend({

	el: '#settings',

	ui: {
		myevents : '#myevents',
	},

	events: {
		'click @ui.myevents' : 'myevents',
	},

	initialize: function() {
		this.listenTo(App.vent, 'myevents', this.myevents);
	},

	myevents: function() {
		App.appRouter.navigate('myevents');

		App.vent.trigger('index-route');
		App.vent.trigger('setParam', 'geo');
		App.vent.trigger('showControls');

		var self = this;

		Backbone.ajax({
			url: 'events',
			type: 'GET',
			success: function(response) {
				response.forEach(function(event) {
					self.searchEvent(event.event_id);
				});
			}
		});	
	},

	searchEvent: function(id) {
		Backbone.ajax({
			url: 'http://ws.audioscrobbler.com/2.0/',
			type: 'GET',
			data: {
				method  : 'event.getInfo', 
				event   : id,
				api_key : 'dd349d2176d3b97b8162bb0c0e583b1c',
				format 	: 'json'
			},
			success: function(data) {
				App.vent.trigger('addEvent', data.event);
			}	
		});
	}

});
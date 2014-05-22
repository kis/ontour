define(['channel',
		'text', 
		'text!templates/Settings.tmpl',
		'marionette'
], function(channel, text, settingsTmpl) {
	'use strict';

	return Marionette.ItemView.extend({

		itemViewContainer: '#settings',

		template: _.template(settingsTmpl),

		ui: {
			logout   : '#logout',
			profile  : '#profile',
			myevents : '#myevents'
		},

		events: {
			'click @ui.logout'   : 'logout',
			'click @ui.profile'  : 'profile',
			'click @ui.myevents' : 'myevents'
		},

		logout: function() {
			Backbone.ajax({
				url: 'users/logout',
				type: 'GET',
				success: function() {
					document.location.replace("users/login-page");
				}
			});			
		},

		profile: function() {
			Backbone.ajax({
				url: 'users/profile',
				type: 'GET',
				success: function() {
					document.location.replace("users/profile");
				}
			});			
		},

		myevents: function() {
			channel.trigger('resetSearch', 'geo');

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
					channel.trigger('addEvent', data.event);
				}	
			});
		}

	});

});
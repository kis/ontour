define(['channel',
		'vk',
		'text', 
		'text!templates/Settings.tmpl',
		'marionette'
], function(channel, vk, text, settingsTmpl) {
	'use strict';

	return Marionette.ItemView.extend({

		el: '#settings',

		// template: _.template(settingsTmpl),

		ui: {
			logout   : '#logout',
			profile  : '#profile',
			myevents : '#myevents',
			vk		 : '#vk'
		},

		events: {
			'click @ui.logout'   : 'logout',
			'click @ui.profile'  : 'profile',
			'click @ui.myevents' : 'myevents',
			'click @ui.vk' 	 	 : 'vk'
		},

		logout: function() {
			document.location.replace("users/logout");
		},

		profile: function() {
			document.location.replace("users/profile");
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
		},

		vk: function() {
			VK.init({
				apiId: '3903848'
			});

			/*VK.Auth.login(function(response) {
				console.log(response);

				if (response.session) {
					console.log('user: '+response.session.mid);
				} else {
					console.log('not auth');
				}
			});*/

			VK.Api.call('audio.get', {uid: '9408031'}, function(response) {
				console.log(response);
			});
		}

	});

});
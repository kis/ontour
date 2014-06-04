define(['App',
		'text', 
		'text!templates/Settings.tmpl',
		'marionette'
		// 'vk',
], function(App, text, settingsTmpl, Marionette) {
	'use strict';

	return Marionette.ItemView.extend({

		el: '#settings',

		// template: _.template(settingsTmpl),

		ui: {
			myevents : '#myevents',
			// vk		 : '#vk'
		},

		events: {
			'click @ui.myevents' : 'myevents'
			// 'click @ui.vk' 	 	 : 'vk'
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

		/*vk: function() {
			VK.init({
				apiId: '3903848'
			});

			VK.Auth.login(function(response) {
				console.log(response);

				if (response.session) {
					console.log('user: '+response.session.mid);
				} else {
					console.log('not auth');
				}
			});

			VK.Api.call('audio.get', {uid: '9408031'}, function(response) {
				console.log(response);
			});
		}*/

	});

});
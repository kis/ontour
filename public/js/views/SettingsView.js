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
			logout  : '#logout',
			profile : '#profile'
		},

		events: {
			'click @ui.logout'  : 'logout',
			'click @ui.profile' : 'profile'
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

	});

});
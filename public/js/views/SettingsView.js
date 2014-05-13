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
			logout : '#logout'
		},

		events: {
			'click @ui.logout' : 'logout'
		},

		logout: function() {
			Backbone.ajax({
				url: 'users/logout',
				type: 'POST',
				success: function() {
					document.location.replace("users/login-page");
				}
			});			
		}

	});

});
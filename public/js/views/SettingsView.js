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
			login   : '#login',
			signin   : '#sign-in'
		},

		events: {
			'click @ui.login'   : 'slide',
			'click @ui.signin' : 'switchMarkers'
		}

	});

});
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
			signin   : '#sign-in',
			signup   : '#sign-up'
		},

		events: {
			'click @ui.signup' : 'signup',
			'click @ui.signin' : 'signin'
		}

	});

});
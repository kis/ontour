define(['channel',
		'text', 
		'text!templates/Settings.tmpl',
		'marionette'
], function(channel, text, settingsTmpl, Marionette) {
	'use strict';

	return Marionette.ItemView.extend({

		itemViewContainer: '#registration',

		template: _.template(settingsTmpl),

		ui: {
			email    : '#email',
			password : '#password',
			register : '#register'
		},

		events: {
			'click @ui.register' : 'register'
		}
		
	});

});
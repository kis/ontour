define(['backbone'], function(Backbone) {
	'use strict';

	return Backbone.Model.extend({

		defaults: {
			header: 'Notification',
			body: '',
		}
		
	});

});
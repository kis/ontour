define(['backbone'], function(Backbone) {
	'use strict';

	return Backbone.Model.extend({

		defaults: {
			email: 'email',
			password: 'pwd'
		}

	});

});
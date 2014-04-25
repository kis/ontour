define(['backbone'], function(Backbone) {
	'use strict';

	return Backbone.Model.extend({

		defaults: {
			activeTab: 'artist',
			value: ''
		},

		validate: function() {
			if (value == '') {
				console.log('invalid value!');
			}
		}

	});

});
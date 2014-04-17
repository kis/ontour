define(['underscore',
		'backbone',
		'marionette'
], function(_, Backbone) {
	'use strict';

	return Backbone.Model.extend({

		defaults: {
			activeTab: 'artist',
			fieldId: 'artist'
		}

	});

});
define(['underscore', 
		'backbone'
], function(_, Backbone) {
	'use strict';

	return Backbone.Model.extend({

		defaults: {
			page: 1,
			total: 1,
			totalPages: 1
		}

	});

});
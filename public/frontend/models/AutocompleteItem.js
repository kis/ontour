define(['underscore', 
		'backbone'
], function(_, Backbone) {
	'use strict';

	return Backbone.Model.extend({

		defaults: {
			title: 'title',
			meta: '',
			selected: false
		}

	});

});
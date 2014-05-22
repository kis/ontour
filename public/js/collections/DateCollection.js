define(['backbone', 
		'models/Date'
], function(Backbone, Date) {
	'use strict';

	return Backbone.Collection.extend({
		model: Date,

		type: ''
	});
});
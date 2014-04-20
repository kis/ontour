define(['underscore', 
		'backbone', 
		'frontend/models/Event'
], function(_, Backbone, Event) {
	'use strict';

	return Backbone.Collection.extend({
		model: Event
	});
});
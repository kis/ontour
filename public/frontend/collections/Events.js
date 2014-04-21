define(['backbone', 
		'frontend/models/Event'
], function(Backbone, Event) {
	'use strict';

	return Backbone.Collection.extend({
		model: Event
	});
});
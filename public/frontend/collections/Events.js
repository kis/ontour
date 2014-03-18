
define(['underscore', 'backbone', 'frontend/models/Event'], function(_, Backbone, Event) {

	var Events = Backbone.Collection.extend({

		model: Event

	});

	return Events;

});
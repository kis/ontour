
define(['underscore', 'backbone'], function(_, Backbone) {

	var Event = Backbone.Model.extend({

		defaults: {
			id: 'id',
			title: 'title',
			artists: 'artists',
			date: 'date',
			venue: 'venue',
			image: null,
			icon: null,
			marker: null,
			popup: null,
			path: null,
			map: {},
			param: null
		}

	});

	return Event;

});
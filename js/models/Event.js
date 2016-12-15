define(['backbone'], function(Backbone) {
	'use strict';

	return Backbone.Model.extend({

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
			url: null,
			selected: false,
			filtered: true
		},

		url: '/events/:id'

	});

});
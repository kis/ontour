define(['backbone',
		'channel'
], function(Backbone, channel) {
	'use strict';	

	var Router = Backbone.Router.extend({

		routes: {
			''				: 'index',
			'search/:query' : 'search',
			'myevents'		: 'myevents'
		},

		index: function() {
			channel.trigger('index-route');	
		},

		search: function(query) {
			if (query) {
				channel.trigger('search', query);
			}
		},

		myevents: function() {
			channel.trigger('myevents');
		}

	});

	return new Router;

});
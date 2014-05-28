define(['channel',
		'marionette'
], function(channel) {
	'use strict';	

	var Router = Marionette.AppRouter.extend({

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
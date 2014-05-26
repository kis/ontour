define(['backbone',
		'channel'
], function(Backbone, channel) {
	'use strict';	

	var Router = Backbone.Router.extend({

		routes: {
			''				: 'index',
			'search/:query' : 'search'
		},

		index: function() {
			channel.trigger('resetSearch');	
		},

		search: function(query) {
			if (query) {
				channel.trigger('search', query);
			}
		}

	});

	return new Router;

});
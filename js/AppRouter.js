define(['marionette',
], function(Marionette) {
	'use strict';	

	return Marionette.AppRouter.extend({

		appRoutes: {
			''				: 'index',
			'search/:query' : 'search',
			'myevents'		: 'myevents'
		}

	});

});
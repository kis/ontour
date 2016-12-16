'use strict';	

import Marionette from '../lib/backbone.marionette.min';

const router = Marionette.AppRouter.extend({

	appRoutes: {
		''				: 'index',
		'search/:query' : 'search',
		'myevents'		: 'myevents'
	}

});

export default router;
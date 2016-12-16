'use strict';	

import Marionette from 'marionette';

const router = Marionette.AppRouter.extend({

	appRoutes: {
		''				: 'index',
		'search/:query' : 'search',
		'myevents'		: 'myevents'
	}

});

export default router;
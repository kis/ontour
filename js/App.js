'use strict';

import Marionette from 'backbone.marionette';

const App = new Marionette.Application();

/*App.addRegions({
	autocomplete : '#autocomplete',
	notification : '#notification',
	search 		 : '#status',
	events 		 : '#events',
	tags 		 : '#tags',
	year 		 : '#years',
	month 		 : '#months',
	day 		 : '#days'
});*/

App.on("initialize:after", function(options) {
	if (Backbone.history){
    	Backbone.history.start({pushState : true});
  	}
});

export default App;

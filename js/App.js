define(['marionette'
], function(Marionette) {
	'use strict';

	var App = new Marionette.Application();

	App.addRegions({
		menu         : '#search',
		controls 	 : '#controls',
		// settings 	 : '#settings',
		autocomplete : '#autocomplete',
		notification : '#notification',
		search 		 : '#status',
		events 		 : '#events',
		tags 		 : '#tags',
		year 		 : '#years',
		month 		 : '#months',
		day 		 : '#days'
	});

	App.on("initialize:after", function(options) {
		if (Backbone.history){
	    	Backbone.history.start({pushState : true});
	  	}
	});

	return App;

});
define(['marionette'], function() {
	'use strict';

	return Marionette.Layout.extend({
		template: "body",

		regions: {
			map: {
		  		selector: "#map",
			},
			menu: {
		  		selector: "#search",
			},
			status: {
		  		selector: "#status",
			},
			events: {
		  		selector: "#events",
			}
	  	}
	});

});
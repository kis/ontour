define(['underscore',
		'backbone',
		'marionette'
], function(_, Backbone) {
	'use strict';

	return Backbone.Marionette.Layout.extend({
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
requirejs.config({
	shim: {
		jquery: {
			exports: '$',
		},
		underscore: {
			exports: '_'
		},
		backbone: {
			deps: [
				'jquery',
				'underscore'
			],
			exports: 'Backbone'
		},
		marionette: {
			deps: [
				'jquery',
				'underscore',
				'backbone'
			],
			exports: 'Marionette'
		}
	},

	paths: {
		jquery: 'lib/jquery.min', //'http://code.jquery.com/jquery-latest.min',
		mapbox: 'lib/mapbox', //'https://api.tiles.mapbox.com/mapbox.js/v1.6.2/mapbox',
		text: 'lib/text',
		underscore: 'lib/underscore',
		backbone: 'lib/backbone',
		marionette: 'lib/backbone.marionette'
	}
});

requirejs(['app'], function(app) {
	'use strict';
	
	app.start();

});
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
		/*babysitter: {
		    exports: 'Backbone.Babysitter',
		    deps: ['backbone']
		},
		wreqr: {
		    exports: 'Backbone.Wreqr',
		    deps: ['backbone']
		},*/
		marionette: {
			deps: [
				'jquery',
				'underscore',
				'backbone'
				// 'babysitter',
		        // 'wreqr'
			],
			exports: 'Marionette'
		},
		cluster: {
			deps: [
				'mapbox'
			]
		}
	},

	paths: {
		jquery 		: 'lib/jquery.min', //'http://code.jquery.com/jquery-latest.min',
		mapbox 		: 'lib/mapbox', //'https://api.tiles.mapbox.com/mapbox.js/v1.6.2/mapbox',
		cluster 	: 'https://api.tiles.mapbox.com/mapbox.js/plugins/leaflet-markercluster/v0.4.0/leaflet.markercluster',
		vk  		: 'http://vkontakte.ru/js/api/openapi', 		
		text 		: 'lib/text',
		underscore  : 'lib/underscore-min',
		backbone    : 'lib/backbone-min',
		// babysitter  : 'lib/backbone.babysitter.min',
		// wreqr  	 	: 'lib/backbone.wreqr.min',
		marionette  : 'lib/backbone.marionette.min',
		scrollbar   : 'lib/scrollbar.min',
		mousewheel  : 'lib/jquery.mousewheel'
	}
});

requirejs(['app'], function(app) {
	'use strict';
	
	app.start();

	Backbone.history.start({pushState : true});

});

require.config({

	baseUrl: '../',

	shim: {
		underscore: {
			exports: '_'
		},
		backbone: {
			deps: [
				'underscore',
				'jquery'
			],
			exports: 'Backbone'
		},
		menu: {
			deps: ['jquery']
		}
	},

	paths: {
		jquery: 'http://code.jquery.com/jquery-latest.min',

		leaflet: 'leaflet/leaflet',

		text: 'lib/text',		
		underscore: 'lib/underscore',
		backbone: 'lib/backbone',

		menu: 'frontend/menu',
		getEvents: 'frontend/getEvents'
	}
});

require(['jquery', 'menu', 'getEvents'], function() {


});
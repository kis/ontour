
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
		eventsByArtist: 'frontend/eventsByArtist'
	}
});

require(['jquery', 'menu', 'eventsByArtist'], function() {


});

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

		mapbox: 'https://api.tiles.mapbox.com/mapbox.js/v1.6.2/mapbox',

		text: 'lib/text',
		underscore: 'lib/underscore',
		backbone: 'lib/backbone',

		channel: 'frontend/channel',

		menu: 'frontend/menu',
		getEvents: 'frontend/getEvents'
	}
});

require(['jquery', 'menu', 'getEvents'], function() {


});
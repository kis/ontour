({
    appDir: ".",
    baseUrl: ".",
    dir: "../build",
    modules: [
        {
            name: "main"
        }
    ],
    
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
		jquery: 'http://code.jquery.com/jquery-latest.min',
		mapbox: 'https://api.tiles.mapbox.com/mapbox.js/v1.6.2/mapbox',
		text: 'lib/text',
		underscore: 'lib/underscore-min',
		backbone: 'lib/backbone-min',
		marionette: 'lib/backbone.marionette.min'
	}
})
({
    // appDir: "./",
    baseUrl: "./",
    mainConfigFile : "./main.js",
    dir: "./dist",
    modules: [
        {
            name: 'main'
        }
    ],
    // out: "dist/main.js",
    // fileExclusionRegExp: /^(r|build)\.js$/,
    removeCombined: true,
    findNestedDependencies: true,

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
		underscore: 'lib/underscore',
		backbone: 'lib/backbone',
		marionette: 'lib/backbone.marionette'
	}
})
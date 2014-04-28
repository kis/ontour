({
    appDir: ".",
    baseUrl: ".",
    dir: "../appdirectory-build",
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
		underscore: 'lib/underscore',
		backbone: 'lib/backbone',
		marionette: 'lib/backbone.marionette'
	}
})

/*({
	baseUrl: ".",
	mainConfigFile: 'main.js',
	out: "main.built.js",
	name : 'main',

	optimize: 'uglify',

	uglify: {
		toplevel: true,
		ascii_only: true,
		beautify: false,
		max_line_length: 1000
	},

	inlineText: true,
	useStrict: false,

	skipPragmas: false,
	skipModuleInsertion: false,
	stubModules: ['text'],
	optimizeAllPluginResources: false,
	findNestedDependencies: false,
	removeCombined: false,

	fileExclusionRegExp: /^\./,

	preserveLicenseComments: true,

	logLevel: 0
})*/
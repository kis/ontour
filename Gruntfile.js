module.exports = function (grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		javascripts: ['public/js/**/**.js'],
		styles: ['assets/styles/*.styl'],
		php: ['app/**/**.php'],
		jshint: {
			client: ['Gruntfile.js', '<%= javascripts %>'],
			options: {
				sub: true,
				smarttabs: true,
				ignores: []
			}
		},
		watch: {
			options: {
				livereload: true
			},
			scripts: {
				files: ['<%= javascripts %>'],
				tasks: ['javascripts']
			},
			styles: {
				files: ['<%= styles %>'],
				tasks: ['stylus']
			},
			php: {
				files: ['<%= php %>']
			}
		},
		stylus: {
			compile: {
				options: {
					'include css': true,
					'paths': [],
					'compress': true
				},
				files: {
					'public/css/style.css': ['<%= styles %>']
				}
			}
		},
		requirejs: {
			compile: {
				options: {
					// appDir: "./",
					baseUrl: "public/js",
					mainConfigFile : "public/js/main.js",
					// dir: "public/js/dist",
					modules: [
						{
							name: 'app',

							include: [
								"collections/AutocompleteCollection.js",
								"collections/Events.js",

								"models/AutocompleteItem.js",
								"models/Controls.js",
								"models/Event.js",
								"models/Map.js",
								"models/Menu.js",
								"models/Search.js",

								"views/AutocompleteItemView.js",
								"views/AutocompleteList.js",
								"views/ControlsView.js",
								"views/EventView.js",
								"views/MapView.js",
								"views/MenuView.js",
								"views/SearchView.js",
								"views/SettingsView.js"
							]
						},
						{
							name: 'map'
						},
						{
							name: 'channel'
						}
					],
					dir: "public/js/build",
					// fileExclusionRegExp: /^(r|build)\.js$/,
					removeCombined: false,
					findNestedDependencies: false
				}
			}
		}
		/*concat: {
			dist: {
				src: [
					"public/js/lib/jquery.min.js",
					"public/js/lib/mapbox.js",
					"public/js/lib/text.js",
					"public/js/lib/underscore-min.js",
					"public/js/lib/backbone-min.js",
					"public/js/lib/backbone.marionette.min.js",
					"public/js/lib/require-min.js",

					"public/js/*.js",

					"public/js/collections/AutocompleteCollection.js",
					"public/js/collections/Events.js",

					"public/js/models/AutocompleteItem.js",
					"public/js/models/Controls.js",
					"public/js/models/Event.js",
					"public/js/models/Map.js",
					"public/js/models/Menu.js",
					"public/js/models/Search.js",

					"public/js/templates/Controls.tmpl",
					"public/js/templates/Event.tmpl",
					"public/js/templates/Menu.tmpl",
					"public/js/templates/Settings.tmpl",

					"public/js/views/AutocompleteView.js",
					"public/js/views/AutocompleteList.js",
					"public/js/views/ControlsView.js",
					"public/js/views/EventView.js",
					"public/js/views/MapView.js",
					"public/js/views/MenuView.js",
					"public/js/views/SearchView.js",
					"public/js/views/SettingsView.js",

				],
				dest: 'public/js/build/build.js'
			}
		},

		min: {
			dist: {
				src: ['public/js/build/build.js'],
				dest: 'public/js/build/build.min.js'
			}
		},	*/	
	});

	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-stylus');
	grunt.loadNpmTasks('grunt-contrib-requirejs');

	grunt.registerTask('default', ['jshint', 'stylus']);
};
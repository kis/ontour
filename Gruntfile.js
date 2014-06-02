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
			},
			app: {
			    files: 'public/js/**/*.js',
			    tasks: ['copy', 'requirejs']
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
					'public/css/styles.css': ['<%= styles %>']
				}
			}
		},
		requirejs: {
			compile: {
				options: {
					appDir: "public/",
					baseUrl: "js",
					mainConfigFile : "public/js/main.js",
					dir: "public/build",
					paths: {
						jquery 		: 'lib/jquery.min', //'http://code.jquery.com/jquery-latest.min',
						mapbox 		: 'lib/mapbox', //'https://api.tiles.mapbox.com/mapbox.js/v1.6.2/mapbox',
						cluster 	: 'https://api.tiles.mapbox.com/mapbox.js/plugins/leaflet-markercluster/v0.4.0/leaflet.markercluster',
						vk  		: 'http://vkontakte.ru/js/api/openapi', 		
						text 		: 'lib/text',
						underscore  : 'lib/underscore-min',
						backbone    : 'lib/backbone-min',
						marionette  : 'lib/backbone.marionette.min',
						scrollbar   : 'lib/scrollbar.min',
						mousewheel  : 'lib/jquery.mousewheel'
					},
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
						},
						cluster: {
							deps: [
								'mapbox'
							]
						}
					},
					copy: {
						requirejs: {
							files: [
						    	{
						      		src: 'node_modules/requirejs/require.js',
						      		dest: 'app/js/lib/require.js'
						    	}
						  	]
						},
					}
				}
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-stylus');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-requirejs');

	grunt.registerTask('default', ['requirejs']);
};
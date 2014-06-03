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
		    options: {
				baseUrl: '.',
				appDir: 'public/js',
				mainConfigFile: 'public/js/main.js',
				optimize: 'uglify',
				generateSourceMaps: false,
				preserveLicenseComments: false,
				useStrict: true,
				removeCombined: false,
				modules: [
			 		{
			  			name: 'main',
			  			exclude: [
			  			    "lib/jquery.min",
			  			    "lib/mapbox",
			  			    "lib/text",
			  			    "lib/underscore-min",
			  			    "lib/backbone-min",
			  			    "lib/backbone.babysitter.min",
			  			    "lib/backbone.wreqr.min",
			  			    "lib/backbone.marionette.min",
			  			    "lib/scrollbar.min",
			  			    "lib/jquery.mousewheel"
			  			]
			 		}
				]
		   	},
		   	main: {
				options: {
			 		dir: 'public/build'
				}
		   	}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-stylus');
	// grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-requirejs');

	grunt.registerTask('default', ['requirejs']);
};
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
			options:{
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
			php:{
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
			options: {
				baseUrl: '.',
				appDir: 'public/javascripts',
				mainConfigFile: '',
				// optimize: '',
				generateSourceMaps: false,
				preserveLicenseComments: false,
				useStrict: true,
				removeCombined: false
			}
		},
		phantomas: {
			perf : {
				options : {
					indexPath : './phantomas/',
					options   : {},
					url: 'http://localhost:9999/',
				}
			}
		},
		concat: {
			js: {
				src: ['<%= javascripts %>'],
				dest: 'public/js/app.concat.js',
			},

			styles: {
				//here you should concatenate styles
			}
		},
		uglify: {
			js: {
				files: {
					'public/frontend.min.js': ['<%= javascripts %>']
				}
			}
		},
		cssmin: {
			minify: {
				src: ['public/css/style.css'],
				dest: 'public/css/style.min.css'
			}
		},
		htmlmin: {
			dist: {
				options: {
					removeComments: true,
					collapseWhitespace: true
				},
				files: {
					// 'public/index.min.html': []
				}
			}
		},
		requirejs: {
			compile: {
				options: {
					baseUrl: "public/js/dev",
					mainConfigFile: "public/js/dev/app.js",
					name: [
						"models/Event", 
						"models/Map", 
						"models/SearchStatus", 
						"collections/Events",
						"views/EventView",
						"views/EventsList",
						"views/MapView",
						"views/SearchStatusView"
					], // assumes a production build using almond
					out: "public/js/live/optimized.js"
				}
			}
		},
		rjs: {
		 	// no minification, is done by the min task
		 	optimize: 'none',
		 	baseUrl: 'public/js/dev/',
		 	wrap: true
		}
	});

	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-requirejs');
	grunt.loadNpmTasks('grunt-contrib-stylus');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-htmlmin');
	grunt.loadNpmTasks('grunt-contrib-requirejs');
	grunt.loadNpmTasks('rjs');
	grunt.loadNpmTasks('grunt-phantomas');

	grunt.registerTask('default', ['jshint', 'stylus']);
	// grunt.registerTask('javascripts', ['jshint']);
};
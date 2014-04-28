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
		}
		/*requirejs: {
			production: {
				options: {
			  		baseUrl: "public/js",
			  		mainConfigFile: 'public/js/main.js',
			  		out: "public/js/main.built.js",
			  		include : 'main',

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
				}
		  	}
		}*/
	});

	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-stylus');
	grunt.loadNpmTasks('grunt-contrib-requirejs');

	grunt.registerTask('default', ['jshint', 'stylus']);
};
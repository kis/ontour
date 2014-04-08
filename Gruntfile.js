module.exports = function (grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		javascripts: ['public/frontend/**/**.js'],
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
		}
	});

	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-requirejs');
	grunt.loadNpmTasks('grunt-contrib-stylus');

	grunt.registerTask('default', ['jshint', 'stylus']);
	// grunt.registerTask('javascripts', ['jshint']);
};
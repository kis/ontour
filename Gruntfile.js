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
					// modules: [
						// {
							include: 'main',
						// }
					// ],
					out: "public/dist/main.js",
					// fileExclusionRegExp: /^(r|build)\.js$/,
					removeCombined: false,
					findNestedDependencies: false
				}
			}
		}		
	});

	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-stylus');
	grunt.loadNpmTasks('grunt-contrib-requirejs');

	grunt.registerTask('default', ['jshint', 'stylus']);
};
module.exports = function(grunt) {
	// Grunt configuration
	grunt.initConfig({
		// Config for clean task
		clean: {
			css: ['public/css/*.css'],
			js: ['public/js/*.js']
		},
		// Config for sass task
		sass: {
			options: {
				style: 'compressed',
				noCache: true
			},
			scssfiles: {
				files: {
					'public/css/tetris.min.css': 'src/scss/tetris.scss'
				}
			}
		},
		// Config for jshint task
		jshint: {
			all: ['src/js/**/*.js', '*.js']
		},
		// Config for uglify task
		uglify: {
			options: {
				compress: true
			},
			js: {
				files: {
					'public/js/tetris.min.js': ['src/js/**/*.js']
				}
			}
		},
		// Config for watch task
		watch: {
			js: {
				files: ['src/js/**/*.js'],
				tasks: ['jshint', 'uglify']
			},
			css: {
				files: ['src/scss/**/*.scss'],
				tasks: ['compass']
			}
		},
	});

	// Load external grunt plugins
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch');

	// Available tasks
	grunt.registerTask('default', ['clean', 'sass', 'jshint', 'uglify']);
	grunt.registerTask('build', ['default']);
};
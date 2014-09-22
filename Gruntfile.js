module.exports = function(grunt) {
    // Grunt configuration
    grunt.initConfig({
        // Config for clean task
        clean: {
            css: ['public/css/*.css'],
            js: ['build/js/*.js', 'public/js/*.js']
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
        // Config for handlebars precompile task
        handlebars: {
            compile: {
                options: {
                    namespace: "Tetris"
                },
                files: {
                    "build/js/hbs-templates.js": "views/**/*.handlebars"
                }
            }
        },
        // Config for requirejs task
        requirejs: {
            compile: {
                options: {
                    baseUrl: '.',
                    mainConfigFile: 'src/js/require-config.js',
                    name: 'src/js/tetrisGameController.js',
                    out: 'build/js/required.js',
                    include: ['src/js/vendor/require.js', 'src/js/vendor/jquery-1.11.1.min.js'],
                    insertRequire: ['src/js/tetrisGameController.js'],
                    preserveLicenseComments: false
                }
            }
        },
        // Config for jshint task
        jshint: {
            options: {
                ignores: ['src/js/vendor/*.js']
            },
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
        // Config for concat task
        concat: {
            js: {
                src: ['build/js/*.js'],
                dest: 'public/js/tetris.min.js'
            }
        },
        // Config for watch task
        watch: {
            js: {
                files: ['src/js/**/*.js'],
                tasks: ['jshint', 'requirejs', 'concat']
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
    grunt.loadNpmTasks('grunt-contrib-handlebars');
    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.loadNpmTasks('grunt-contrib-concat');

    // Available tasks
    grunt.registerTask('default', ['clean', 'sass', 'jshint', 'requirejs', 'concat']);
    grunt.registerTask('build', ['default']);
};
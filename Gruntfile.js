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
        // Config for handlebars precompile task
        handlebars: {
            compile: {
                options: {
                    amd: true,
                    processName: function(filename) {
                        return filename
                                    .replace(/^src\/templates\//, '')
                                    .replace(/\.hbs$/, '')
                                    .replace(/(.*)(\/\w+)/, '$1')
                                    .split('/')
                                    .join('.');
                    }
                },
                files: {
                    'src/js/hbs-templates.js': 'src/templates/**/*.hbs'
                }
            }
        },
        // Config for requirejs task
        // TODO: comment on each option specified
        requirejs: {
            compile: {
                options: {
                    baseUrl: '.',
                    mainConfigFile: 'src/js/require-config.js',
                    name: 'src/js/tetrisGameController.js',
                    include: ['src/js/vendor/require.js', 'src/js/vendor/jquery-1.11.1.min.js'],
                    insertRequire: ['src/js/tetrisGameController.js'],
                    preserveLicenseComments: false,
                    generateSourceMaps: true,
                    optimize: 'uglify2',
                    out: 'public/js/tetris.min.js'
                }
            }
        },
        // Config for jshint task
        jshint: {
            options: {
                ignores: ['src/js/vendor/*.js', 'src/js/hbs-templates.js']
            },
            all: ['src/js/**/*.js', '*.js']
        },
        // Config for watch task
        // TODO: comment on each watch task
        watch: {
            js: {
                files: ['src/js/**/*.js'],
                tasks: ['jshint', 'requirejs']
            },
            css: {
                files: ['src/scss/**/*.scss'],
                tasks: ['sass']
            },
            views: {
                files: ['src/templates/*.hbs'],
                tasks: ['handlebars', 'requirejs']
            },
            grunt: {
                files: ['Gruntfile.js'],
                tasks: ['build']
            }
        },
    });

    // Load external grunt plugins
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-handlebars');
    grunt.loadNpmTasks('grunt-contrib-requirejs');

    // Available tasks
    grunt.registerTask('default', ['clean', 'sass', 'jshint', 'requirejs']);
    grunt.registerTask('build', ['default']);
};
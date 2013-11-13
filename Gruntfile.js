module.exports = function(grunt) {

  grunt.initConfig({

    dirTmp: '.tmp/',
    dirResourcesTmp: 'tmp/resources/',
    dirRelease: 'build/release/',
    dirDebug: 'build/debug/',

    uglify: {
      prod: {
        files: {
          '<%= dirRelease %>app.js': '<%= dirTmp %>app.js'
        }
      }
    },

    browserify: {
      options: {},
      dev: {
        files: {
          '<%= dirDebug %>app.js': 'src/index.js'
        },
        options: {
          debug: true
        }
      },
      prod: {
        files: {
          '<%= dirTmp %>app.js': 'src/index.js'
        },
        options: {}
      }
    },

    dcl_resources: {
      dev: {
        options: {
          entry: './src/index.js',
          dir: '<%= dirResourcesTmp %>'
        }
      }
    },

    less: {
      options: {
        strictMath: false,
        report: 'min',
        paths: ['.']
      },
      dev: {
        files: {
          '<%= dirDebug %>/style.css': '<%= dirResourcesTmp %>/imports.less'
        }
      }
    },

    watch: {
      dev: {
        files: [
          './lib/**/*.js',
          './src/**/*.js'
        ],
        tasks: [
          'browserify:dev',
          'dcl_resources:dev',
          'less:dev'
        ],
        options: {
          livereload: true,
          spawn: false,
          atBegin: true
        }
      }
    },

    connect: {
      dev: {
        options: {
          port: 3000,
          base: '.',
          livereload: true
        }
      }
    }
  });



  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-dcl-resources');

  grunt.registerTask('debug', [
    'browserify:dev'
  ]);

  grunt.registerTask('server', [
    'connect:dev',
    'watch:dev'
  ]);

  grunt.registerTask('release', [
    'browserify:prod',
    'uglify:prod'
  ]);

  grunt.registerTask('default', [
    'debug'
  ]);
};
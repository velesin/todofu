"use strict"

module.exports = function(grunt) {

  grunt.initConfig({
    clean: {
      'tmp': ['.tmp'],
      'public': ['public']
    },
    copy: {
      dist: {
        files: {
          'public/index.html': ['app/index.html'],
          'public/css/bootstrap.css': ['bower_components/bootstrap/dist/css/bootstrap.css']
        }
      }
    },
    emberTemplates: {
      options: {
        templateBasePath: 'app/templates'
      },
      dist: {
        src: ['app/templates/**/*.hbs'],
        dest: '.tmp/templates.js'
      }
    },
    concat: {
      dist: {
        files: {
          'public/js/dependencies.js': [
            'bower_components/jquery/jquery.js',
            'bower_components/bootstrap/dist/js/bootstrap.js',
            'bower_components/handlebars/handlebars.js',
            'bower_components/ember/ember.js'
          ],
          'public/js/app.js': ['app/app.js', '.tmp/templates.js']
        }
      }
    },
    express: {
      test: {
        options: {
          script: 'server.js'
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-ember-templates');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-express-server');

  grunt.registerTask('dist', ['clean', 'copy', 'emberTemplates', 'concat', 'clean:tmp']);
  grunt.registerTask('default', ['dist']);

};

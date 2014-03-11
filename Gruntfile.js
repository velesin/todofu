"use strict"

module.exports = function(grunt) {

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-ember-templates');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-express-server');
  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-karma');
  grunt.loadNpmTasks('grunt-build-control');

  grunt.initConfig({
    clean: ['.tmp', 'dist/**/*', '!dist/.git'],
    copy: {
      dist: {
        files: [
          {src: ['**'], dest: 'dist/', expand: true, cwd: 'api'},
          {src: ['app/index.html'], dest: 'dist/public/index.html'},
          {src: ['package.json'], dest: 'dist/package.json'}
        ]
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
          'dist/public/js/dependencies.js': [
            'bower_components/jquery/jquery.js',
            'bower_components/bootstrap/dist/js/bootstrap.js',
            'bower_components/handlebars/handlebars.js',
            'bower_components/ember/ember.js',
            'bower_components/ember-data/ember-data.js'
          ],
          'dist/public/js/app.js': [
            'app/app.js',
            'app/routes.js',
            'app/**/*.js',
            '.tmp/templates.js']
        }
      }
    },
    less: {
      dist: {
        options: {
          paths: ['app/stylesheets', 'bower_components/bootstrap/less']
        },
        files: {
          'dist/public/css/app.css': 'app/stylesheets/app.less'
        }
      }
    },
    express: {
      test: {
        options: {
          node_env: 'test',
          script: 'dist/server.js'
        }
      }
    },
    mochaTest: {
      api: {
        options: {
          mocha: require('mocha'),
          require: 'spec/api/spec_helper.js'
        },
        src: ['spec/api/**/*_spec.js']
      }
    },
    karma: {
      options: {
        browsers: ['PhantomJS'],
        frameworks: ['mocha'],
        singleRun: true,
        proxies:{
          '/': 'http://localhost:3000/'
        },
        urlRoot: '/_karma_/'
      },
      app: {
        options: {
          files: [
            'dist/public/js/dependencies.js',
            'dist/public/js/app.js',
            'bower_components/chai/chai.js',
            'bower_components/sinon-chai/lib/sinon-chai.js',
            'bower_components/sinon-1.9.0/index.js',
            'spec/app/spec_helper.js',
            'spec/app/**/*_spec.js']
        }
      },
      e2e: {
        options: {
          files: [
            'dist/public/js/dependencies.js',
            'dist/public/js/app.js',
            'bower_components/ember-mocha-adapter/adapter.js',
            'bower_components/chai/chai.js',
            'bower_components/sinon-chai/lib/sinon-chai.js',
            'bower_components/sinon-1.9.0/index.js',
            'spec/e2e/spec_helper.js',
            'spec/e2e/**/*_spec.js']
        }
      }
    },
    buildcontrol: {
      openshift: {
        options: {
          dir: 'dist',
          remote: 'ssh://52ea50e24382ec6c120001d7@todofu-velesin.rhcloud.com/~/git/todofu.git/',
          branch: 'master',
          commit: true,
          push: true,
          connectCommits: false
        }
      }
    }
  });

  grunt.registerTask('dist', ['clean', 'copy', 'emberTemplates', 'concat', 'less']);
  grunt.registerTask('test:api', ['mochaTest:api']);
  grunt.registerTask('test:app', ['dist', 'karma:app']);
  grunt.registerTask('test:e2e', ['dist', 'express', 'karma:e2e']);
  grunt.registerTask('deploy', ['dist', 'buildcontrol:openshift']);
  grunt.registerTask('default', ['dist']);

};

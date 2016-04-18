module.exports = function(grunt) {
  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    
    jshint: {
      options: {
        reporter: require('jshint-stylish')
      },
      build: ['Gruntfile.js', 'src/js/*.js']
    },

    uglify: {
      options: {
        banner: '/*\n <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> \n*/\n'
      },
      build: {
        files: {
          'build/js/app.min.js': 'src/js/*.js'
        }
      }
    },

    sass: {
      build: {
        options: {
          style: 'expanded'
        },
        files: {
          'build/css/styles.css' : 'src/scss/main.scss'
        }
      }
    },

    cssmin: {
      options: {
        banner: '/*\n <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> \n*/\n'
      },
      build: {
        files: {
          'build/css/styles.min.css': 'build/css/styles.css'
        }
      }
    },

    watch: {
      stylesheets: {
        files: ['src/**/*.scss'],
        tasks: ['sass']
      },
      scripts: {
        files: 'src/js/*.js',
        tasks: ['jshint', 'uglify']
      }
    }
  });

  // LOAD PLUGINS
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-watch');
  //grunt.loadNpmTasks('grunt-contrib-concat');


  //TASKS
  grunt.registerTask('default', ['jshint', 'uglify', 'sass', 'cssmin']);
};
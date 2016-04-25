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
          'build/js/app.min.js': 'build/js/app.js'
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

    webpack: {
      build: {
        entry : "./src/js/app.js",
        output : {
          path : "build/js/",
          filename : "app.js"
        }
      }
    },

    clean: {
      dev : [
        './build/js/app.js',
        './build/css/styles.css',
        './build/css/styles.css.map'
      ],

      min : [
        './build/js/app.min.js',
        './build/css/styles.min.css'
      ]
    },

    watch: {
      stylesheets: {
        files: ['src/**/*.scss'],
        tasks: ['sass']
      },
      scripts: {
        files: 'src/js/*.js',
        tasks: ['jshint', 'webpack']
      }
    }
  });

  // LOAD PLUGINS
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-webpack');
  grunt.loadNpmTasks('grunt-contrib-clean');

  //TASKS
  grunt.registerTask('default', ['clean:dev', 'jshint', 'webpack', 'sass']);
  grunt.registerTask('minify', ['clean:min', 'cssmin', 'uglify']);
};
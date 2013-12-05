module.exports = function(grunt) {

  // Load Assemble as the very first thing.
  grunt.loadNpmTasks('assemble');

  // Load Grunt tasks declared in the package.json file.
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  grunt.initConfig({
    // npm package information.
    pkg: grunt.file.readJSON('package.json'),

    // Project information.
    app: grunt.file.readJSON('src/db/app.json'),

    // Image spriting.
    // Two sprites are being generated. One for screens with low pixel density
    // and another for screens with high pixel density (like retina displays).
    // https://github.com/Ensighten/grunt-spritesmith
    sprite:{
      options: {
        padding: 10,
        engine: 'gm'
      },
      // For screens with low pixel density.
      development_1x: {
        src: '<%= app.src %>/images/1x/*.png',
        destImg: '<%= app.dev %>/images/sprite_1x.png',
        destCSS: '<%= app.src %>/scss/sprites/_sprite_1x.scss',
        imgPath: '../images/sprite_1x.png'
      },
      // For screens with high pixel density.
      development_2x: {
        src: '<%= app.src %>/images/2x/*.png',
        destImg: '<%= app.dev %>/images/sprite_2x.png',

        // Notice, this stylesheet is not being imported. It is only being
        // generated because Spritesmith requires this setting.
        destCSS: '<%= app.src %>/scss/sprites/_sprite_2x.scss', 
        imgPath: '../images/sprite_1x.png'
      },
      production_1x: {
        src: '<%= app.src %>/images/1x/*.png',
        destImg: '<%= app.prod %>/images/sprite_1x.png',
        destCSS: '<%= app.src %>/scss/sprites/_sprite_1x.scss',
        imgPath: '../images/sprite_1x.png'
      },
      // For screens with high pixel density.
      production_2x: {
        src: '<%= app.src %>/images/2x/*.png',
        destImg: '<%= app.prod %>/images/sprite_2x.png',

        // Notice, this stylesheet is not being imported. It is only being
        // generated because Spritesmith requires this setting.
        destCSS: '<%= app.src %>/scss/sprites/_sprite_2x.scss', 
        imgPath: '../images/sprite_1x.png'
      },
    },

    // Compass (scss compiling).
    // https://github.com/gruntjs/grunt-contrib-compass
    compass: {
      options: {
        sassDir: '<%= app.src %>/scss',
        banner: '/*! <%= grunt.template.today("dddd, mmmm dS, yyyy, HH:MM") %> */',
        specify: '<%= app.src %>/scss/*.scss' // Specify files to compile. Required by the 'banner' option.
      },
      development: {
        options: {
          cssDir: '<%= app.dev %>/css',
          environment: 'development',
          outputStyle: 'expanded'
        }
      },
      production: {
        options: {
          cssDir: '<%= app.prod %>/css',
          environment: 'production',
          outputStyle: 'compressed'
        }
      }
    },

    // Javascript uglification.
    // https://github.com/gruntjs/grunt-contrib-uglify
    uglify: {
      options: {
        banner: '/*! <%= grunt.template.today("dddd, mmmm dS, yyyy, HH:MM") %> */\n'
      },
      development: {
        options: {
          mangle: false,
          beautify: true,
          compress: false
        },
        files: {
          '<%= app.dev %>/js/app.min.js': ['<%= app.src %>/js/vendor/**/*.js', '<%= app.src %>/js/app.js']
        },
      },
      production: {
        files: {
          '<%= app.prod %>/js/app.min.js': ['<%= app.src %>/js/vendor/**/*.js', '<%= app.src %>/js/app.js']
        },
      }
    },

    // Optimize image file sizes.
    // https://github.com/JamieMason/grunt-imageoptim
    imageoptim: {
      all: {
        options: { quitAfter: true },
        src: ['<%= app.prod %>/images', '<%= app.prod %>/favicons']
      }
    },

    // Staic site generation.
    // http://assemble.io/docs/
    assemble: {
      options: {
        layout: 'default.hbs',
        layoutdir: '<%= app.src %>/templates/layouts',
        partials: '<%= app.src %>/templates/partials/*.hbs',
        pages: '<%= app.src %>/templates/pages/*.hbs',
        flatten: true,
        data: '<%= app.src %>/db/*.json' 
      },
      pages: {
        files: { '<%= app.dev %>': ['<%= app.src %>/templates/pages/*.hbs'] }
      }
    },

    // HTML minification.
    // The HTML minification is being run after assemble has generated
    // its files (assemble puts these in /development). The files in
    // /development is then copied to the production target and
    // compressed by htmlmin. Htmlmin is only run for the production task which
    // means that the development task need to run first.
    // https://github.com/gruntjs/grunt-contrib-htmlmin
    htmlmin: {
      production: {
        options: {
          removeComments: true,
          collapseWhitespace: true,
          removeEmptyAttributes: true,
          collapseBooleanAttributes: true,
          removeAttributeQuotes: true,
          removeRedundantAttributes: true,
          removeOptionalTags: true
        },
        expand: true,
        cwd: '<%= app.dev %>',
        src: ['**/*.html'],
        dest: '<%= app.prod %>/',
        filter: 'isFile'
      }
    },

    // Copy files and folders.
    // https://github.com/gruntjs/grunt-contrib-copy
    copy: {
      development: {
        files: [
          // Images
          // { expand: true, flatten: true, src: ['<%= app.src %>/images/**'], dest: '<%= app.dev %>/images/', filter: 'isFile' },

          // Favicons
          { expand: true, flatten: true, src: ['<%= app.src %>/favicons/**'], dest: '<%= app.dev %>/', filter: 'isFile' },

          // Fonts
          { expand: true, cwd: '<%= app.src %>/fonts/', src: ['**'], dest: '<%= app.dev %>/fonts/', filter: 'isFile' },

          // crossdomain.xml and robots.txt
          { expand: true, cwd: '<%= app.src %>/misc/', src: ['**'], dest: '<%= app.dev %>/', filter: 'isFile' }
        ]
      },
      production: {
        files: [
          // Images
          // { expand: true, flatten: true, src: ['<%= app.dev %>/images/sprite*.*'], dest: '<%= app.prod %>/images/', filter: 'isFile' },

          // Favicons
          { expand: true, flatten: true, src: ['<%= app.src %>/favicons/**'], dest: '<%= app.prod %>/', filter: 'isFile' },

          // Fonts
          { expand: true, cwd: '<%= app.src %>/fonts/', src: ['**'], dest: '<%= app.prod %>/fonts/', filter: 'isFile' },

          // crossdomain.xml and robots.txt
          { expand: true, cwd: '<%= app.src %>/misc/', src: ['**'], dest: '<%= app.prod %>/', filter: 'isFile' }
        ]
      }
    },

    // Deploy to staging via FTP (smk.mourier.me)
    // https://github.com/zonak/grunt-ftp-deploy
    'ftp-deploy': {
      build: {
        auth: {
          host: 'ftp.mourier.me',
          port: 21,
          authKey: 'key1' // See ./.ftppass
        },
        src: '<%= app.prod %>',
        dest: '/smk',
        // Exclude files that don't change very often (fonts and favicons)
        exclusions: ['.DS_Store']
      }
    },

    // Server (with livereload).
    // This server can be fired up with 'grunt server'.
    // https://github.com/blai/grunt-express
    express: {
      all: {
        options: {
          port: 9001,
          hostname: 'localhost',
          bases: ['<%= app.dev %>'],
          livereload: true
        }
      }
    },

    // Watch files for changes.
    // https://github.com/gruntjs/grunt-contrib-watch
    watch: {
      all: {
        files: ['<%= app.src %>/**/*.*'],
        tasks: ['default'],
        options: {
          livereload: true
        },
      }
    },
    
    // Open browser at the project's URL.
    // This is triggered when 'grunt server' is run.
    // https://github.com/jsoverson/grunt-open
    open: {
      all: {
        // Gets the port from the express configuration
        path: 'http://localhost:<%= express.all.options.port%>'
      }
    }

  }); // end grunt.initConfig

  // Development build (default task).
  // Notice that grunt-newer is used to only touch files that have
  // been changed since the last run.
  // https://github.com/tschaub/grunt-newer
  grunt.registerTask('default', [
    'sprite:development_1x',
    'sprite:development_2x',
    'compass:development',
    'uglify:development',
    'assemble',
    'newer:copy:development'
  ]);

  // Server (with livereload).
  grunt.registerTask('server', [
    'express',
    'open',
    'watch'
  ]);

  // Production build.
  grunt.registerTask('production', [  
    'sprite:production_1x',
    'sprite:production_2x',
    'compass:production',
    'uglify:production',
    'assemble',
    'htmlmin',
    'imageoptim',
    'copy:production'
  ]);

  // Deploy to staging
  grunt.registerTask('deploy_stag', [
    'production',
    'ftp-deploy'
  ]);

}; // end module
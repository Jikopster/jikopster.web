module.exports = function (grunt) {
  grunt.initConfig({
    css: {
      dir: 'css',
      dist: '<%= css.dir %>/dist',
      name: 'styles',
      file: '<%= css.name %>.css',
      path: '<%= css.dist %>/<%= css.file %>',
      min: {
        name: '<%= css.name %>.min',
        file: '<%= css.min.name %>.css',
        path: '<%= css.dist %>/<%= css.min.file %>',
      },
    },
    
    clean: {
      css: '<%= css.dist %>',
    },
    less: {
      options: {
        strictMath: true,
      },
      dir: '<%= css.dir %>/less',
      styles: {
        src: '<%= less.dir %>/styles.less',
        dest: '<%= css.path %>',
      },
    },
    autoprefixer: {
      styles: {
        src: '<%= css.path %>',
      },
    },
    csslint: {
      styles: {
        options: {
          csslintrc: '<%= less.dir %>/bootstrap/.csslintrc',
        },
        src: '<%= css.path %>',
      },
    },
    csscomb: {
      styles: {
        src: '<%= css.path %>',
      }
    },
    cssmin: {
      styles: {
        options: {
          compatibility: 'ie8',
          keepSpecialComments: '*',
          advanced: false,
        },
        src : '<%= css.path %>',
        dest: '<%= css.min.path %>',
      },
    },
    copy: {
      css: {
        expand: true,
        cwd: 'css/dist/',
        src: '*.css',
        dest: 'public/assets/css',
      },
      fonts: {
        expand: true,
        cwd: 'icons/',
        src: 'fonts/*',
        dest: 'public/assets/',
      },
    },
    webfont: {
      icons: {
        options: {
          stylesheet: 'less',
          htmlDemo: false,
          relativeFontPath: '../fonts',
        },
        src: 'icons/svg/*.svg',
        dest: 'icons/fonts',
        destCss: '<%= less.dir %>',
      },
    },
  })
  
  require('load-grunt-tasks')(grunt, { scope: 'devDependencies' })
  
  grunt.registerTask('icons', ['webfont:icons'])
  grunt.registerTask('styles', ['less:styles', 'autoprefixer:styles', 'csscomb:styles', 'cssmin:styles'])
  grunt.registerTask('publish', ['copy:css', 'copy:fonts'])
  
  grunt.registerTask('dist', ['clean', 'icons', 'styles', 'publish'])
  grunt.registerTask('test', ['csslint:styles'])
  
  grunt.registerTask('default', ['dist', 'test'])
}
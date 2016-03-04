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
        dest: '<%= css.path %>'
      },
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
        src: '<%= css.min.file %>',
        dest: 'public/assets/css',
      },
    },
    webfont: {
      icons: {
        options: {
          stylesheet: 'less',
          htmlDemo: false,
          relativeFontPath: '../fonts',
        },
        src: 'icons/*.svg',
        dest: 'public/assets/fonts',
        destCss: '<%= less.dir %>',
      },
    },
    clean: {
      css: '<%= css.dist %>',
      icons: '<%= less.dir %>/icons.less',
    },
  })
  
  require('load-grunt-tasks')(grunt)
  
  grunt.registerTask('icons', ['clean:icons', 'webfont:icons'])
  
  grunt.registerTask('styles', ['less:styles', 'autoprefixer:styles', 'csscomb:styles', 'cssmin:styles'])
  grunt.registerTask('css', ['clean:css', 'styles', 'copy:css'])
  
  grunt.registerTask('dist', 'icons', 'css')
  grunt.registerTask('test', ['csslint:styles'])
  
  grunt.registerTask('default', ['dist', 'test'])
  grunt.registerTask('prod', ['css'])
}
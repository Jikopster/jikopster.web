module.exports = function (grunt) {
  grunt.initConfig({
    copy: {
      bootstrap: {
        expand: true,
        cwd: 'bootstrap-3.3.6/dist/',
        src: 'css/bootstrap.min.css',
        dest: 'public/assets/'
      },
      icons: {
        files: [
          {
            expand: true,
            cwd: 'icons/css',
            src: 'icons.min.css',
            dest: 'public/assets/css/'
          },
          {
            expand: true,
            cwd: 'icons/',
            src: 'fonts/*',
            dest: 'public/assets/'
          }
        ]
      }
    },
    webfont: {
      icons: {
        src: 'icons/svg/*.svg',
        dest: 'icons/fonts',
        destCss: 'icons/css'
      }
    },
    cssmin: {
      icons: {
        src: 'icons/css/icons.css',
        dest: 'icons/css/icons.min.css'
      }
    }
  })
  
  grunt.registerTask('bootstrap', ['copy:bootstrap'])
  grunt.registerTask('icons', ['webfont:icons', 'cssmin:icons', 'copy:icons'])
  
  grunt.registerTask('default', ['bootstrap', 'icons'])
  
  grunt.loadNpmTasks('grunt-contrib-cssmin')
  grunt.loadNpmTasks('grunt-contrib-copy')
  grunt.loadNpmTasks('grunt-webfont')
}
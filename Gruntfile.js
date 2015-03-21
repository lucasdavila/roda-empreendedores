module.exports = function(grunt) {
  grunt.initConfig({
    connect: {
      server: {
        options: {
          keepalive: true
        }
      }
    }
  });

  // Load the plugin that provides the "connect" task.
  grunt.loadNpmTasks('grunt-contrib-connect');

  // Default task(s).
  grunt.registerTask('default', ['connect']);
};

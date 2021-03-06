module.exports = function (grunt) {

    /**
     * Load all `grunt-*` tasks from `package.json`
     */
    require('load-grunt-tasks')(grunt);

    /**
     * Load DEFAULT configuration for tasks from directory `grunt/*.js`
     */
    var config = require('load-grunt-configs')(grunt, {config: {src: "grunt/*.js"}});
    config.pkg = grunt.file.readJSON('package.json');

    /**
     * Initialize Grunt configuration
     */
    grunt.initConfig(config);

    grunt.registerTask('default', [
        'dist',
        'test'
    ]);

    grunt.registerTask('dist', [
        'clear',
        'compile'
    ]);

    grunt.registerTask('clear', [
        'clean'
    ]);

    grunt.registerTask('compile', [
        'concat_in_order',
        'preprocessor',
        'uglify'
    ]);

    grunt.registerTask('dev', [
        'watch'
    ]);

    grunt.registerTask('docs', [
        'exec:jsduck'
    ]);

    grunt.registerTask('test', [
        'karma:all'
    ]);

    grunt.registerTask('test-fast', [
        'karma:phantomjs'
    ]);

    grunt.registerTask('release-patch', [
        // Just bump version from `0.0.1` to `0.0.2`
        'push-only:patch',
        'release'
    ]);

    grunt.registerTask('release-minor', [
        // Just bump version from `0.1.1` to `0.2.0`
        'push-only:minor',
        'release'
    ]);

    grunt.registerTask('release', [
        // Run build on bumped version
        'default',
        'docs',

        // Create tag, commit and push to remote repo
        'push-commit',

        // Publish to NPM
        'push-publish',

        // Convert `webjar/pom.template` to `webjar/pom.xml` and run `mvn clean deploy` in `webjar` directory
        'maven-deploy'
    ]);

    grunt.registerTask('maven-install', [
        'clean:webjar',
        'copy:pom',
        'exec:maven-install'
    ]);

    grunt.registerTask('maven-deploy', [
        'clean:webjar',
        'copy:pom',
        'exec:maven-deploy'
    ]);
};
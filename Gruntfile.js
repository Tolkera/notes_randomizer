module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),


        copy: {
            main: {
                options: {
                    process: function (content, srcpath) {
                        return content.replace("script.js","production.min.js");

                    },
                    noProcess: ['*/*/*.{png,gif,jpg,ico, svg}', '*/*.{png,gif,jpg,ico, svg}']
                },
                files: [
                    {src: ['index.html'], dest: 'build/'},
                    {src: ['main.css'], dest: 'build/'},
                    {src: ['imgage/*', 'image/*'], dest: 'build/'}
                ]
            }
        },

        clean: {
            build: {
                src: [ 'build' ]
            }
        },

        uglify: {
            build: {
                src: 'script.js',
                dest: 'build/production.min.js'
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');

    grunt.registerTask('build',[ 'clean', 'uglify', 'copy']);
};
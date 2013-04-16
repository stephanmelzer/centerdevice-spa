module.exports = function(grunt) {

	// Grunt config
	var gruntConfig = {};

	gruntConfig.distdir = 'dist';

	gruntConfig.meta = {
		cssDir: 'src/assets/css',
		sassDir: 'src/assets/sass',
		allSassFiles: 'src/assets/sass/**/*'
	};

	gruntConfig.pkg = grunt.file.readJSON('package.json');

	gruntConfig.concat = {
		dist: {
			src: ['src/**/*.js', '!src/**/*.spec.js', '!src/assets/**'],
			dest: '<%= distdir %>/centerdevice-spa.js'
		},
		libs: {
			src: 'vendor/angular/angular.js',
			dest: '<%= distdir %>/assets/angular.js'
		}
	};

	gruntConfig.copy = {
		html: {
			files: [{
				expand: true,
				cwd: 'src/',
				src: ['*.html'],
				dest: '<%= distdir %>'
			}, {
				expand: true,
				flatten: true,
				cwd: 'src/',
				src: ['**/*.tpl.html'],
				dest: '<%= distdir %>/partials'
			}]
		},
		css: {
			files: [{
				expand: true,
				cwd: 'src/assets/css',
				src: ['**/*.css'],
				dest: '<%= distdir %>/assets/css'
			}]
		},
		img: {
			files: [{
				expand: true,
				cwd: 'src/assets/img',
				src: ['**/*'],
				dest: '<%= distdir %>/assets/img'
			}]
		}
	};

	gruntConfig.compass = {
		options: {
			sassDir: '<%= meta.sassDir %>',
			cssDir: '<%= meta.cssDir %>'
		},
		dist: {
			options: {
				environment: 'production',
				outputStyle: 'compressed'
			}
		},
		dev: {
			options: {
				debugInfo: true
			}
		}
	};

	gruntConfig.clean = ['<%= distdir %>', '<%= meta.cssDir %>'];

	gruntConfig.watch = {
		sass: {
			files: ['<%= meta.allSassFiles %>'],
			tasks: ['compass:dev']
		}
	};

	gruntConfig.connect = {
		dev: {
			options: {
				port: 8001,
				base: '.'
			}
		}
	};

	grunt.initConfig(gruntConfig);

	// Loading Grunt plugins
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-compass');
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-contrib-watch');

	// Register Grunt tasks
	grunt.registerTask('default', ['clean', 'compass:dist', 'concat', 'copy']);
	grunt.registerTask('run', ['clean', 'compass:dev', 'concat', 'copy', 'connect', 'watch']);
	grunt.registerTask('build', ['compass:dev', 'concat', 'copy']);
};
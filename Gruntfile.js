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
		dev: {
			src: ['vendor/angular/angular.js', 'tmp/templates.js', 'src/**/*.js', '!src/**/*.spec.js', '!src/assets/**'],
			dest: '<%= distdir %>/centerdevice-spa.js'
		},
		dist: {
			src: ['vendor/angular/angular.js', 'tmp/templates.js', 'src/**/*.js', '!src/**/*.spec.js', '!src/assets/**'],
			dest: 'tmp/centerdevice-spa.js'
		}
	};

	gruntConfig.copy = {
		dist: {
			files: [{
				expand: true,
				cwd: 'src/',
				src: ['*.html'],
				dest: '<%= distdir %>'
			}, {
				expand: true,
				cwd: 'src/assets/css',
				src: ['app.css'],
				dest: '<%= distdir %>/assets/css'
			}, {
				expand: true,
				cwd: 'src/assets/img',
				src: ['**/*'],
				dest: '<%= distdir %>/assets/img'
			}]
		},
		dev: {
			files: [{
				expand: true,
				cwd: 'src/',
				src: ['*.html'],
				dest: '<%= distdir %>'
			}, {
				expand: true,
				cwd: 'src/assets/css',
				src: ['**/*.css'],
				dest: '<%= distdir %>/assets/css'
			}, {
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

	gruntConfig.clean = ['<%= distdir %>', '<%= meta.cssDir %>', 'tmp'];

	gruntConfig.watch = {
		sass: {
			files: ['<%= meta.allSassFiles %>'],
			tasks: ['compass:dev']
		},
		html: {
			files: ['src/**', '!src/assets'],
			tasks: ['concat', 'copy'],
		}
	};

	gruntConfig.connect = {
		dev: {
			options: {
				port: 8000,
				base: '<%= distdir %>'
			}
		}
	};

	gruntConfig.jshint = {
		options: {
			curly: true,
			eqeqeq: true,
			immed: true,
			latedef: true,
			newcap: true,
			noarg: true,
			sub: true,
			undef: true,
			boss: true,
			eqnull: true,
			unused: true,
			browser: true,
			strict: false,
			jquery: true,
			globals: {
				angular: true,
			}
		},
		beforeconcat: ['src/**/*.js', '!src/assets/*'],
		afterconcat: ['dist/centerdevice-spa.js']
	};

	gruntConfig.uglify = {
		dist: {
			files: {
				'<%= distdir %>/centerdevice-spa.min.js': ['tmp/centerdevice-spa.js']
			}
		}
	};

	gruntConfig.html2js = {
		options: {
			base: 'src/app'
		},
		main: {
			src: ['src/**/*.tpl.html'],
			dest: 'tmp/templates.js'
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
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-html2js');

	// Register Grunt tasks
	grunt.registerTask('default', ['clean', 'compass:dist', 'html2js', 'concat:dist', 'uglify', 'copy:dist']);
	grunt.registerTask('runDev', ['clean', 'compass:dev', 'html2js', 'jshint', 'concat:dev', 'copy:dev', 'connect', 'watch']);
	grunt.registerTask('run', ['default', 'connect', 'watch']);
	grunt.registerTask('build', ['compass:dev', 'concat:dev', 'copy']);
	grunt.registerTask('heroku', ['default']);

};
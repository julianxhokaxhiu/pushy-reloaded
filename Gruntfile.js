/*
	The MIT License (MIT)

	Copyright (c) 2015 Julian Xhokaxhiu

	Permission is hereby granted, free of charge, to any person obtaining a copy
	of this software and associated documentation files (the "Software"), to deal
	in the Software without restriction, including without limitation the rights
	to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	copies of the Software, and to permit persons to whom the Software is
	furnished to do so, subject to the following conditions:

	The above copyright notice and this permission notice shall be included in all
	copies or substantial portions of the Software.

	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
	SOFTWARE.
*/
module.exports = function(grunt) {

	// Load Tasks
  require('load-grunt-tasks')(grunt);

  // Configure the tasks
  grunt.initConfig({
    clean: {
      options: {
        force: true
      },
      css: [
        'css/pushy*',
      ],
      js: [
        'js/pushy.min*'
      ]
    },
		sass: {
      options: {
        sourcemap: 'none',
        loadPath: '.'
      },
			build: {
				files: {
					'css/pushy.css' : [ 'scss/pushy.scss' ],
          'css/pushy-right.css' : [ 'scss/pushy-right.scss' ],
				}
			}
		},
    autoprefixer: {
      options: {
        browsers: [
          "Android 2.3",
          "Android >= 4",
          "Chrome >= 20",
          "Firefox >= 24",
          "Explorer >= 8",
          "iOS >= 6",
          "Opera >= 12",
          "Safari >= 6"
        ]
      },
      build: {
      	options: {
      		map: false
      	},
        src: 'css/pushy.css'
      }
    },
    cssmin: {
      build: {
        files: {
          'css/pushy.min.css' : [ 'css/pushy.css' ],
          'css/pushy-right.min.css' : [ 'css/pushy-right.css' ],
        }
      }
    },
    closurecompiler: {
      build: {
      	files: {
      		'js/pushy.min.js': 'js/pushy.js'
      	},
      	options: {
          // Any options supported by Closure Compiler, for example:
          "compilation_level": "SIMPLE_OPTIMIZATIONS",

          // Plus a simultaneous processes limit
          "max_processes": 5,
        }
      }
    },
    connect: {
      build: {
        options: {
          port: 8000,
          hostname: '*'
        }
      }
    }
  });

  grunt.registerTask('default', [
		'clean',
    'sass',
    'cssmin',
    'autoprefixer',
    'closurecompiler'
  ]);

  grunt.registerTask('serve', [
    'clean',
    'sass',
    'cssmin',
    'autoprefixer',
    'closurecompiler',
    'connect'
  ]);
};
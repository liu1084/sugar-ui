/*
 * The MIT License (MIT)
 * Copyright (c) @year Jim.liu
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

/* jshint mocha: true */

var assert = require('assert');
var fs = require('fs');
var path = require('path');

var pkg = require('./../package.json');
var dirs = pkg['h5bp-configs'].directories;

var expectedFilesInArchiveDir = [
    pkg.name + '_v' + pkg.version + '.zip'
];

var expectedFilesInDistDir = [

    '.editorconfig',
    '.gitattributes',
    '.gitignore',
    '.htaccess',
    '404.html',
    'apple-touch-icon.png',
    'browserconfig.xml',
    'crossdomain.xml',

    'css/', // for directories, a `/` character
            // should be included at the end
        'css/main.css',
        'css/normalize.css',

    'doc/',
        'doc/TOC.md',
        'doc/css.md',
        'doc/extend.md',
        'doc/faq.md',
        'doc/html.md',
        'doc/js.md',
        'doc/misc.md',
        'doc/usage.md',

    'favicon.ico',
    'humans.txt',

    'img/',
        'img/.gitignore',

    'index.html',

    'js/',
        'js/main.js',
        'js/plugins.js',
        'js/vendor/',
            'js/vendor/jquery-' + pkg.devDependencies.jquery + '.min.js',
            'js/vendor/modernizr-2.8.3.min.js',

    'robots.txt',
    'tile-wide.png',
    'tile.png'

];

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

function checkFiles(directory, expectedFiles) {

    // Get the list of files from the specified directory
    var files = require('glob').sync('**/*', {
        'cwd': directory,
        'dot': true,      // include hidden files
        'mark': true      // add a `/` character to directory matches
    });

    // Check if all expected files are present in the
    // specified directory, and are of the expected type
    expectedFiles.forEach(function (file) {

        var ok = false;
        var expectedFileType = (file.slice(-1) !== '/' ? 'regular file' : 'directory');

        // If file exists
        if (files.indexOf(file) !== -1) {

            // Check if the file is of the correct type
            if (file.slice(-1) !== '/') {
                // Check if the file is really a regular file
                ok = fs.statSync(path.resolve(directory, file)).isFile();
            } else {
                // Check if the file is a directory
                // (Since glob adds the `/` character to directory matches,
                // we can simply check if the `/` character is present)
                ok = (files[files.indexOf(file)].slice(-1) === '/');
            }

        }

        it('"' + file + '" should be present and it should be a ' + expectedFileType, function () {
            assert.equal(true, ok);
        });

    });

    // List all files that should be NOT
    // be present in the specified directory
    (files.filter(function (file) {
        return expectedFiles.indexOf(file) === -1;
    })).forEach(function (file) {
        it('"' + file + '" should NOT be present', function () {
            assert(false);
        });
    });

}

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

function runTests() {

    describe('Test if all the expected files, and only them, are present in the build directories', function () {

        describe(dirs.archive, function () {
            checkFiles(dirs.archive, expectedFilesInArchiveDir);
        });

        describe(dirs.dist, function () {
            checkFiles(dirs.dist, expectedFilesInDistDir);
        });

    });

}

runTests();

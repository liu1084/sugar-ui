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

/*******************************
          Register PM
*******************************/

/*
  Task to register component repos with Package Managers
  * Registers component with bower
  * Registers component with NPM
*/

var
  // node dependencies
  process = require('child_process'),

  // config
  release = require('../config/admin/release'),

  // register components and distributions
  repos   = release.distributions.concat(release.components),
  total   = repos.length,
  index   = -1,

  stream,
  stepRepo
;

module.exports = function(callback) {

  console.log('Registering repos with package managers');

  // Do Git commands synchronously per component, to avoid issues
  stepRepo = function() {
    index = index + 1;
    if(index >= total) {
      callback();
      return;
    }
    var
      repo            = repos[index].toLowerCase(),
      outputDirectory = release.outputRoot + repo + '/',
      exec            = process.exec,
      execSettings    = {cwd: outputDirectory},
      updateNPM       = 'npm publish'
    ;

    /* Register with NPM */
    exec(updateNPM, execSettings, function(err, stdout, stderr) {
      console.log(err, stdout, stderr);
      stepRepo();
    });

  };
  stepRepo();
};


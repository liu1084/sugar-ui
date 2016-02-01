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
          Init Repos
*******************************/

/*

 This task pulls the latest version of each component from GitHub

  * Creates new repo if doesnt exist (locally & GitHub)
  * Adds remote it doesnt exists
  * Pulls latest changes from repo

*/

var
  gulp      = require('gulp'),

  // node dependencies
  console   = require('better-console'),
  del       = require('del'),
  fs        = require('fs'),
  path      = require('path'),
  git       = require('gulp-git'),
  githubAPI = require('github'),
  mkdirp    = require('mkdirp'),

  // admin files
  github    = require('../../config/admin/github.js'),
  release   = require('../../config/admin/release'),
  project   = require('../../config/project/release'),


  // oAuth configuration for GitHub
  oAuth     = fs.existsSync(__dirname + '/../../config/admin/oauth.js')
    ? require('../../config/admin/oauth')
    : false,

  // shorthand
  version         = project.version
;

module.exports = function(callback) {

  var
    index = -1,
    total = release.components.length,
    timer,
    stream,
    stepRepo
  ;

  if(!oAuth) {
    console.error('Must add oauth token for GitHub in tasks/config/admin/oauth.js');
    return;
  }

  // Do Git commands synchronously per component, to avoid issues
  stepRepo = function() {

    index = index + 1;

    if(index >= total) {
      callback();
      return;
    }

    var
      component            = release.components[index]
      outputDirectory      = path.resolve(release.outputRoot + component),
      capitalizedComponent = component.charAt(0).toUpperCase() + component.slice(1),
      repoName             = release.componentRepoRoot + capitalizedComponent,

      gitOptions           = { cwd: outputDirectory },
      pullOptions          = { args: '-q', cwd: outputDirectory, quiet: true },
      resetOptions         = { args: '-q --hard', cwd: outputDirectory, quiet: true },

      gitURL               = 'https://github.com/' + release.org + '/' + repoName + '.git',
      repoURL              = 'https://github.com/' + release.org + '/' + repoName + '/',
      localRepoSetup       = fs.existsSync(path.join(outputDirectory, '.git'))
    ;

    console.log('Processing repository: ' + outputDirectory);

    // create folder if doesn't exist
    if( !fs.existsSync(outputDirectory) ) {
      mkdirp.sync(outputDirectory);
    }

    // clean folder
    if(release.outputRoot.search('../repos') == 0) {
      console.info('Cleaning dir', outputDirectory);
      del.sync([outputDirectory + '**/*'], {silent: true, force: true});
    }

    // set-up local repo
    function setupRepo() {
      if(localRepoSetup) {
        addRemote();
      }
      else {
        initRepo();
      }
    }

    function initRepo() {
      console.info('Initializing repository for ' + component);
      git.init(gitOptions, function(error) {
        if(error) {
          console.error('Error initializing repo', error);
        }
        addRemote();
      });
    }

    function createRepo() {
      console.info('Creating GitHub repo ' + repoURL);
      github.repos.createFromOrg({
        org      : release.org,
        name     : repoName,
        homepage : release.homepage
      }, function() {
        setupRepo();
      });
    }

    function addRemote() {
      console.info('Adding remote origin as ' + gitURL);
      git.addRemote('origin', gitURL, gitOptions, function(){
        pullFiles();
      });
    }

    function pullFiles() {
      console.info('Pulling ' + component + ' files');
      git.pull('origin', 'master', pullOptions, function(error) {
        resetFiles();
      });
    }

    function resetFiles() {
      console.info('Resetting files to head');
      git.reset('HEAD', resetOptions, function(error) {
        nextRepo();
      });
    }

    function nextRepo() {
      //console.log('Sleeping for 1 second...');
      // avoid rate throttling
      global.clearTimeout(timer);
      timer = global.setTimeout(function() {
        stepRepo()
      }, 0);
    }


    if(localRepoSetup) {
      pullFiles();
    }
    else {
      setupRepo();
      // createRepo() only use to create remote repo (easier to do manually)
    }

  };

  stepRepo();


};

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
          GitHub Login
*******************************/
/*
  Logs into GitHub using OAuth
*/

var
  fs          = require('fs'),
  path        = require('path'),
  githubAPI   = require('github'),

  // stores oauth info for GitHub API
  oAuthConfig = path.join(__dirname, 'oauth.js'),
  oAuth       = fs.existsSync(oAuthConfig)
    ? require(oAuthConfig)
    : false,
  github
;

if(!oAuth) {
  console.log('here');
  console.error('Must add oauth token for GitHub in tasks/config/admin/oauth.js');
}

github = new githubAPI({
  version    : '3.0.0',
  debug      : true,
  protocol   : 'https',
  timeout    : 5000
});

github.authenticate({
  type: 'oauth',
  token: oAuth.token
});

module.exports = github;
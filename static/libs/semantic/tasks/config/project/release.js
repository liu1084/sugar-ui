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
         Release Config
*******************************/

var
  requireDotFile = require('require-dot-file'),
  config,
  npmPackage,
  version
;


/*******************************
         Derived Values
*******************************/

try {
  config = requireDotFile('semantic.json');
}
catch(error) {}


try {
  npmPackage = require('../../../package.json');
}
catch(error) {
  // generate fake package
  npmPackage = {
    name: 'Unknown',
    version: 'x.x'
  };
}

// looks for version in config or package.json (whichever is available)
version = (npmPackage && npmPackage.version !== undefined && npmPackage.name == 'semantic-ui')
  ? npmPackage.version
  : config.version
;


/*******************************
             Export
*******************************/

module.exports = {

  title      : 'Semantic UI',
  repository : 'https://github.com/Semantic-Org/Semantic-UI',
  url        : 'http://www.semantic-ui.com/',

  banner: ''
    + ' /*' + '\n'
    + ' * # <%= title %> - <%= version %>' + '\n'
    + ' * <%= repository %>' + '\n'
    + ' * <%= url %>' + '\n'
    + ' *' + '\n'
    + ' * Copyright 2014 Contributors' + '\n'
    + ' * Released under the MIT license' + '\n'
    + ' * http://opensource.org/licenses/MIT' + '\n'
    + ' *' + '\n'
    + ' */' + '\n',

  version    : version

};

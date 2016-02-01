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
        Release Settings
*******************************/

// release settings
module.exports = {

  // path to components for repos
  source     : './dist/components/',

  // modified asset paths for component repos
  paths: {
    source : '../themes/default/assets/',
    output : 'assets/'
  },

  templates: {
    bower    : './tasks/config/admin/templates/bower.json',
    composer : './tasks/config/admin/templates/composer.json',
    package  : './tasks/config/admin/templates/package.json',
    meteor   : {
      css       : './tasks/config/admin/templates/css-package.js',
      component : './tasks/config/admin/templates/component-package.js',
      less      : './tasks/config/admin/templates/less-package.js',
    },
    readme : './tasks/config/admin/templates/README.md',
    notes  : './RELEASE-NOTES.md'
  },

  org         : 'Semantic-Org',
  repo        : 'Semantic-UI',

  // files created for package managers
  files: {
    composer : 'composer.json',
    config   : 'semantic.json',
    npm      : 'package.json',
    meteor   : 'package.js'
  },

  // root name for distribution repos
  distRepoRoot      : 'Semantic-UI-',

  // root name for single component repos
  componentRepoRoot : 'UI-',

  // root name for package managers
  packageRoot          : 'semantic-ui-',

  // root path to repos
  outputRoot  : '../repos/',

  homepage    : 'http://www.semantic-ui.com',

  // distributions that get separate repos
  distributions: [
    'LESS',
    'CSS'
  ],

  // components that get separate repositories for bower/npm
  components : [
    'accordion',
    'ad',
    'api',
    'breadcrumb',
    'button',
    'card',
    'checkbox',
    'comment',
    'container',
    'dimmer',
    'divider',
    'dropdown',
    'embed',
    'feed',
    'flag',
    'form',
    'grid',
    'header',
    'icon',
    'image',
    'input',
    'item',
    'label',
    'list',
    'loader',
    'menu',
    'message',
    'modal',
    'nag',
    'popup',
    'progress',
    'rail',
    'rating',
    'reset',
    'reveal',
    'search',
    'segment',
    'shape',
    'sidebar',
    'site',
    'statistic',
    'step',
    'sticky',
    'tab',
    'table',
    'transition',
    'visibility'
  ]
};

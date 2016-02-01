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
          Default Paths
*******************************/

module.exports = {

  // base path added to all other paths
  base : '',

  // base path when installed with npm
  pmRoot: 'semantic/',

  // octal permission for output files, i.e. 644 (false does not adjust)
  permission : 744,

  // whether to generate rtl files
  rtl        : false,

  // file paths
  files: {
    config   : 'semantic.json',
    site     : 'src/site',
    theme    : 'src/theme.config'
  },

  // folder paths
  paths: {
    source: {
      config      : 'src/theme.config',
      definitions : 'src/definitions/',
      site        : 'src/site/',
      themes      : 'src/themes/'
    },
    output: {
      packaged     : 'dist/',
      uncompressed : 'dist/components/',
      compressed   : 'dist/components/',
      themes       : 'dist/themes/'
    },
    clean : 'dist/'
  },

  // components to include in package
  components: [

    // global
    'reset',
    'site',

    // elements
    'button',
    'container',
    'divider',
    'flag',
    'header',
    'icon',
    'image',
    'input',
    'label',
    'list',
    'loader',
    'rail',
    'reveal',
    'segment',
    'step',

    // collections
    'breadcrumb',
    'form',
    'grid',
    'menu',
    'message',
    'table',

    // views
    'ad',
    'card',
    'comment',
    'feed',
    'item',
    'statistic',

    // modules
    'accordion',
    'checkbox',
    'dimmer',
    'dropdown',
    'embed',
    'modal',
    'nag',
    'popup',
    'progress',
    'rating',
    'search',
    'shape',
    'sidebar',
    'sticky',
    'tab',
    'transition',

    // behaviors
    'api',
    'form',
    'state',
    'visibility'
  ],

  // whether to load admin tasks
  admin: false,

  // globs used for matching file patterns
  globs      : {
    ignored    : '!(*.min|*.map|*.rtl)',
    ignoredRTL : '!(*.min|*.map)'
  }

};

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
    Internal Task Collection
*******************************/

/* These tasks create packaged files from **dist** components
   Not intended to be called directly by a user because
   these do not build fresh from **src**
*/

module.exports = function(gulp) {

  var
    // node dependencies
    fs         = require('fs'),
    chmod      = require('gulp-chmod'),
    concat     = require('gulp-concat'),
    concatCSS  = require('gulp-concat-css'),
    clone      = require('gulp-clone'),
    dedupe     = require('gulp-dedupe'),
    gulpif     = require('gulp-if'),
    header     = require('gulp-header'),
    less       = require('gulp-less'),
    minifyCSS  = require('gulp-minify-css'),
    plumber    = require('gulp-plumber'),
    print      = require('gulp-print'),
    rename     = require('gulp-rename'),
    replace    = require('gulp-replace'),
    uglify     = require('gulp-uglify'),

    // user config
    config     = require('./../config/user'),
    docsConfig = require('./../config/docs'),

    // install config
    tasks      = require('./../config/tasks'),
    release    = require('./../config/project/release'),

    // shorthand
    globs      = config.globs,
    assets     = config.paths.assets,
    output     = config.paths.output,

    banner     = tasks.banner,
    filenames  = tasks.filenames,
    log        = tasks.log,
    settings   = tasks.settings
  ;

  /*--------------
      Packaged
  ---------------*/

  gulp.task('package uncompressed css', function() {
    return gulp.src(output.uncompressed + '/**/' + globs.components + globs.ignored + '.css')
      .pipe(plumber())
      .pipe(dedupe())
      .pipe(replace(assets.uncompressed, assets.packaged))
      .pipe(concatCSS(filenames.concatenatedCSS))
        .pipe(gulpif(config.hasPermission, chmod(config.permission)))
        .pipe(header(banner, settings.header))
        .pipe(gulp.dest(output.packaged))
        .pipe(print(log.created))
    ;
  });

  gulp.task('package compressed css', function() {
    return gulp.src(output.uncompressed + '/**/' + globs.components + globs.ignored + '.css')
      .pipe(plumber())
      .pipe(dedupe())
      .pipe(replace(assets.uncompressed, assets.packaged))
      .pipe(concatCSS(filenames.concatenatedMinifiedCSS))
        .pipe(gulpif(config.hasPermission, chmod(config.permission)))
        .pipe(minifyCSS(settings.concatMinify))
        .pipe(header(banner, settings.header))
        .pipe(gulp.dest(output.packaged))
        .pipe(print(log.created))
    ;
  });

  gulp.task('package uncompressed js', function() {
    return gulp.src(output.uncompressed + '/**/' + globs.components + globs.ignored + '.js')
      .pipe(plumber())
      .pipe(dedupe())
      .pipe(replace(assets.uncompressed, assets.packaged))
      .pipe(concat(filenames.concatenatedJS))
        .pipe(header(banner, settings.header))
        .pipe(gulpif(config.hasPermission, chmod(config.permission)))
        .pipe(gulp.dest(output.packaged))
        .pipe(print(log.created))
    ;
  });

  gulp.task('package compressed js', function() {
    return gulp.src(output.uncompressed + '/**/' + globs.components + globs.ignored + '.js')
      .pipe(plumber())
      .pipe(dedupe())
      .pipe(replace(assets.uncompressed, assets.packaged))
      .pipe(concat(filenames.concatenatedMinifiedJS))
        .pipe(uglify(settings.concatUglify))
        .pipe(header(banner, settings.header))
        .pipe(gulpif(config.hasPermission, chmod(config.permission)))
        .pipe(gulp.dest(output.packaged))
        .pipe(print(log.created))
    ;
  });

  /*--------------
        RTL
  ---------------*/

  if(config.rtl) {

    gulp.task('package uncompressed rtl css', function () {
      return gulp.src(output.uncompressed + '/**/' + globs.components + globs.ignoredRTL + '.rtl.css')
        .pipe(dedupe())
        .pipe(replace(assets.uncompressed, assets.packaged))
        .pipe(concatCSS(filenames.concatenatedRTLCSS))
          .pipe(gulpif(config.hasPermission, chmod(config.permission)))
          .pipe(header(banner, settings.header))
          .pipe(gulp.dest(output.packaged))
          .pipe(print(log.created))
      ;
    });

    gulp.task('package compressed rtl css', function () {
      return gulp.src(output.uncompressed + '/**/' + globs.components + globs.ignoredRTL + '.rtl.css')
        .pipe(dedupe())
        .pipe(replace(assets.uncompressed, assets.packaged))
        .pipe(concatCSS(filenames.concatenatedMinifiedRTLCSS))
          .pipe(gulpif(config.hasPermission, chmod(config.permission)))
          .pipe(minifyCSS(settings.concatMinify))
          .pipe(header(banner, settings.header))
          .pipe(gulp.dest(output.packaged))
          .pipe(print(log.created))
      ;
    });

    gulp.task('package uncompressed docs css', function() {
      return gulp.src(output.uncompressed + '/**/' + globs.components + globs.ignored + '.css')
        .pipe(dedupe())
        .pipe(plumber())
        .pipe(replace(assets.uncompressed, assets.packaged))
        .pipe(concatCSS(filenames.concatenatedCSS))
          .pipe(gulpif(config.hasPermission, chmod(config.permission)))
          .pipe(gulp.dest(output.packaged))
          .pipe(print(log.created))
      ;
    });

    gulp.task('package compressed docs css', function() {
      return gulp.src(output.uncompressed + '/**/' + globs.components + globs.ignored + '.css')
        .pipe(dedupe())
        .pipe(plumber())
        .pipe(replace(assets.uncompressed, assets.packaged))
        .pipe(concatCSS(filenames.concatenatedMinifiedCSS))
          .pipe(minifyCSS(settings.concatMinify))
          .pipe(header(banner, settings.header))
          .pipe(gulpif(config.hasPermission, chmod(config.permission)))
          .pipe(gulp.dest(output.packaged))
          .pipe(print(log.created))
      ;
    });

  }

  /*--------------
        Docs
  ---------------*/

  var
    docsOutput = docsConfig.paths.output
  ;

  gulp.task('package uncompressed docs css', function() {
    return gulp.src(docsOutput.uncompressed + '/**/' + globs.components + globs.ignored + '.css')
      .pipe(dedupe())
      .pipe(plumber())
      .pipe(replace(assets.uncompressed, assets.packaged))
      .pipe(concatCSS(filenames.concatenatedCSS))
        .pipe(gulpif(config.hasPermission, chmod(config.permission)))
        .pipe(gulp.dest(docsOutput.packaged))
        .pipe(print(log.created))
    ;
  });

  gulp.task('package compressed docs css', function() {
    return gulp.src(docsOutput.uncompressed + '/**/' + globs.components + globs.ignored + '.css')
      .pipe(dedupe())
      .pipe(plumber())
      .pipe(replace(assets.uncompressed, assets.packaged))
      .pipe(concatCSS(filenames.concatenatedMinifiedCSS))
        .pipe(minifyCSS(settings.concatMinify))
        .pipe(header(banner, settings.header))
        .pipe(gulpif(config.hasPermission, chmod(config.permission)))
        .pipe(gulp.dest(docsOutput.packaged))
        .pipe(print(log.created))
    ;
  });

  gulp.task('package uncompressed docs js', function() {
    return gulp.src(docsOutput.uncompressed + '/**/' + globs.components + globs.ignored + '.js')
      .pipe(dedupe())
      .pipe(plumber())
      .pipe(replace(assets.uncompressed, assets.packaged))
      .pipe(concat(filenames.concatenatedJS))
        .pipe(header(banner, settings.header))
        .pipe(gulpif(config.hasPermission, chmod(config.permission)))
        .pipe(gulp.dest(docsOutput.packaged))
        .pipe(print(log.created))
    ;
  });

  gulp.task('package compressed docs js', function() {
    return gulp.src(docsOutput.uncompressed + '/**/' + globs.components + globs.ignored + '.js')
      .pipe(dedupe())
      .pipe(plumber())
      .pipe(replace(assets.uncompressed, assets.packaged))
      .pipe(concat(filenames.concatenatedMinifiedJS))
        .pipe(uglify(settings.concatUglify))
        .pipe(header(banner, settings.header))
        .pipe(gulpif(config.hasPermission, chmod(config.permission)))
        .pipe(gulp.dest(docsOutput.packaged))
        .pipe(print(log.created))
    ;
  });

};
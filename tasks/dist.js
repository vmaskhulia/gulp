'use strict';

import gulp from 'gulp';
import runSequence from 'run-sequence';
import paths from '../paths';
import Builder from 'systemjs-builder';
import {JSPM_PACKAGES_FOR_DIST} from '../consts';
import {copy} from '../helpers';
var $ = require('gulp-load-plugins')();


gulp.task('dist', done => {
  runSequence([
    'cleanDist',
    'compile'
  ], [
    'copyAssetsToDist',
    'copyJspmPackagesToDist'
  ], [
    'replaceIndexHtml'
  ], done);
});

gulp.task('copyAssetsToDist', () => {
  return copy(paths.app.assets, paths.dist.base);
});

gulp.task('copyJspmPackagesToDist', () => {
  return gulp.src(JSPM_PACKAGES_FOR_DIST, {base: '.'}) // base due to font's glob
    .pipe(gulp.dest(paths.dist.base));
});

gulp.task('replaceIndexHtml', ['injectBundlesToIndexHtml', 'bundle'], () => {
  return gulp.src(paths.dist.indexHtml)
    .pipe($.useref())
    .pipe($.if('*.js', $.rev()))
    .pipe($.if('*.css', $.rev()))
    .pipe($.revReplace())
    .pipe($.if('*.html', $.htmlmin({collapseWhitespace: true})))
    .pipe(gulp.dest(paths.dist.base));
});

gulp.task('injectBundlesToIndexHtml', ['bundle'], () => {
  var src = ['build.js', 'build.css'];

  return gulp.src(paths.app.indexHtml)
    .pipe($.inject(gulp.src(src, {read: false, cwd: paths.dist.base})))
    .pipe(gulp.dest(paths.dist.base));
});

gulp.task('bundle', () => {
  var builder = new Builder('', `${paths.config.jspm}`);
  var inputPath = paths.tmp.starter;
  var outputPath = `${paths.dist.base}/build.js`;

  builder.config({
    buildCSS: true,
    separateCSS: true
  });

  return builder.buildStatic(inputPath, outputPath);
});

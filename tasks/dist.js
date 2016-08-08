'use strict';

import gulp from 'gulp';
import runSequence from 'run-sequence';
import paths from '../paths';
import Builder from 'systemjs-builder';
import {FONTS_PATHS} from '../consts';
import {getMinifyFromArgv, copy} from '../helpers';
const $ = require('gulp-load-plugins')();


gulp.task('dist', done => {
  runSequence(
    ['cleanDist', 'tmp'],
    ['copyAssetsToDist', 'copyJspmPackagesToDist'],
    ['replaceIndexHtml'],
    done);
});

gulp.task('copyAssetsToDist', () => {
  return copy(paths.app.assets, paths.dist.base);
});

gulp.task('copyJspmPackagesToDist', () => {
  return gulp.src(FONTS_PATHS, {base: '.'}) // base due to font's glob
    .pipe(gulp.dest(paths.dist.base));
});

gulp.task('replaceIndexHtml', ['injectBundlesToIndexHtml'], () => {
  return gulp.src(paths.dist.indexHtml)
    .pipe($.useref())
    .pipe($.if('*.js', $.rev()))
    .pipe($.if('*.css', $.rev()))
    .pipe($.revReplace())
    .pipe($.if('*.html', $.htmlmin({collapseWhitespace: true})))
    .pipe(gulp.dest(paths.dist.base));
});

gulp.task('injectBundlesToIndexHtml', ['bundle'], () => {
  const src = ['build.js', 'build.css'];

  return gulp.src(paths.app.indexHtml)
    .pipe($.inject(gulp.src(src, {read: false, cwd: paths.dist.base})))
    .pipe(gulp.dest(paths.dist.base));
});

gulp.task('bundle', () => {
  const builder = new Builder('', `${paths.config.jspm}`);
  const inputPath = paths.tmp.starter;
  const outputPath = `${paths.dist.base}/build.js`;
  const minify = getMinifyFromArgv();

  builder.config({
    buildCSS: true,
    separateCSS: true
  });

  return builder.buildStatic(inputPath, outputPath, {minify});
});

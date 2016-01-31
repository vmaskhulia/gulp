'use strict';

import gulp from 'gulp';
import runSequence from 'run-sequence';
import paths from '../paths';
import Builder from 'systemjs-builder';
import {JSPM_PACKAGES_FOR_DIST} from '../consts';
import {copy} from '../helpers';
var $ = require('gulp-load-plugins')();


gulp.task('dist', done =>
  runSequence([
    'cleanDist',
    'compile'
  ], [
    'copyAssetsToDist',
    'copyJspmPackagesToDist'
  ], [
    'replaceIndexHtml'
  ], done)
);

gulp.task('copyAssetsToDist', () =>
  copy(paths.app.assets, paths.dist.basePath)
);

gulp.task('copyJspmPackagesToDist', () =>
  gulp.src(JSPM_PACKAGES_FOR_DIST, {base: '.'}) // base due to fonts
    .pipe(gulp.dest(paths.dist.basePath))
);

gulp.task('replaceIndexHtml', ['injectDistFiles'], () => {
  var userefAssets = $.useref.assets();

  return gulp.src(paths.dist.indexHtml)
    .pipe(userefAssets)
    .pipe($.rev())
    .pipe(userefAssets.restore())
    .pipe($.useref())
    .pipe($.revReplace())
    .pipe($.if('*.html', $.htmlmin({collapseWhitespace: true})))
    .pipe(gulp.dest(paths.dist.basePath));
});

gulp.task('injectDistFiles', ['bundle'], () =>
  gulp.src(paths.app.indexHtml)
    .pipe($.inject(
      gulp.src(['build.js', 'build.css'], {
        read: false,
        cwd: paths.dist.basePath
      }), {
        relative: false
      })
    )
    .pipe(gulp.dest(paths.dist.basePath))
);

gulp.task('bundle', () => {
  var builder = new Builder('', `${paths.jspmConfig}`);
  var inputPath = paths.tmp.starter;
  var outputPath = `${paths.dist.basePath}/build.js`;

  return builder.buildStatic(inputPath, outputPath);
});

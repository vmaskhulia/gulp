'use strict';

import gulp from 'gulp';
import paths from '../paths';
var $ = require('gulp-load-plugins')();


gulp.task('lint', [
   //'lintHtml',
  'lintStyles',
  'lintGulpfiles',
  'lintClientScripts',
  'lintServerScripts'
]);

gulp.task('lintHtml', () => {
  return gulp.src([paths.app.indexHtml, paths.app.templates])
    .pipe($.w3cjs({doctype: 'HTML5'}));
});

gulp.task('lintStyles', () => {
  return gulp.src(paths.app.styles)
    .pipe($.stylint());
});

gulp.task('lintGulpfiles', () => {
  return gulp.src(paths.gulpfiles)
    .pipe($.jshint(paths.jshintrc))
    .pipe($.jshint.reporter('jshint-stylish'));
});

gulp.task('lintClientScripts', () => {
  return gulp.src(paths.app.scripts)
    .pipe($.jshint(paths.jshintrc))
    .pipe($.jshint.reporter('jshint-stylish'));
});

gulp.task('lintServerScripts', () => {
  return gulp.src(paths.server.scripts)
    .pipe($.jshint(paths.jshintrc))
    .pipe($.jshint.reporter('jshint-stylish'));
});

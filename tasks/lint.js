'use strict';

import gulp from 'gulp';
import paths from '../paths';
var $ = require('gulp-load-plugins')();

gulp.task('lint', [
  // 'lintHtml',
  'lintStyles',
  'lintScripts',
  'lintJs'
]);

gulp.task('lintHtml', () =>
  gulp.src([paths.app.html, paths.app.templates])
    .pipe($.w3cjs({doctype: 'HTML5'}))
);

gulp.task('lintStyles', () =>
  gulp.src(paths.app.styles)
    .pipe($.stylint())
);

gulp.task('lintScripts', () =>
  gulp.src(paths.app.scripts)
    .pipe($.jshint(`${paths.jshintrc}`))
    .pipe($.jshint.reporter('jshint-stylish'))
);

gulp.task('lintJs', () => {
  var glob = paths.gulpfile.concat('server/**/*.js');
  return gulp.src(glob)
    .pipe($.jshint('.jshintrc'))
    .pipe($.jshint.reporter('jshint-stylish'));
});

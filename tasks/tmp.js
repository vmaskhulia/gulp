'use strict';

import gulp from 'gulp';
import paths from '../paths';
import runSequence from 'run-sequence';
import {copy} from '../helpers';
const $ = require('gulp-load-plugins')();


gulp.task('tmp', done => {
  runSequence(
    ['cleanTmp', 'inject'],
    ['compileStyles', 'compileScripts', 'copyTemplates'],
    done);
});

gulp.task('compileStyles', () => {
  return gulp.src(paths.app.styles)
    .pipe($.plumber())
    .pipe($.changed(paths.tmp.base, {extension: '.css'}))
    .pipe($.stylus())
    .pipe($.autoprefixer({
      browsers: ['last 5 versions'],
      cascade: false
    }))
    .pipe(gulp.dest(`${paths.tmp.base}/app`));
});

gulp.task('compileScripts', () => {
  return gulp.src(paths.app.scripts)
    .pipe($.plumber())
    .pipe($.changed(paths.tmp.base, {extension: '.js'}))
    .pipe($.babel({
      presets: ['es2015'],
      plugins: ['babel-plugin-transform-runtime']
    }))
    .pipe($.ngAnnotate())
    .pipe(gulp.dest(`${paths.tmp.base}/app`));
});


gulp.task('copyTemplates', () => {
  return copy(paths.app.templates, `${paths.tmp.base}/app`);
});

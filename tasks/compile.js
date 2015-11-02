'use strict';

import gulp from 'gulp';
import paths from '../paths';
import runSequence from 'run-sequence';
import {copy} from '../helpers';
var $ = require('gulp-load-plugins')();

const tmpAppBase = `${paths.tmp.basePath}app`;

var babelOptions = {
  stage: 1,
  modules: 'system',
  moduleIds: false,
  externalHelpers: true,
  comments: true,
  compact: false
};

gulp.task('compile', done => {
  runSequence([
    'cleanTmp',
    'inject'
  ], [
    'compileTemplates',
    'compileStyles',
    'compileScripts',
    'compileAssets',
    'compileExtras'
  ], done);
});

gulp.task('compileTemplates', () =>
  copy(paths.app.templates, tmpAppBase)
);

gulp.task('compileStyles', () =>
  gulp.src(paths.app.styles)
    .pipe($.plumber())
    .pipe($.changed(paths.tmp.basePath, {extension: '.css'}))
    .pipe($.stylus())
    .pipe($.autoprefixer({
      browsers: ['last 5 versions'],
      cascade: false
    }))
    .pipe(gulp.dest(tmpAppBase))
);

gulp.task('compileScripts', () =>
  gulp.src(paths.app.scripts)
    .pipe($.plumber())
    .pipe($.changed(paths.tmp.basePath, {extension: '.js'}))
    .pipe($.babel(babelOptions))
    .pipe($.ngAnnotate())
    .pipe(gulp.dest(tmpAppBase))
);

gulp.task('compileAssets', ['cleanAssets'], () =>
  copy(paths.app.assets, `${paths.tmp.basePath}assets`)
);

gulp.task('compileExtras', () =>
  copy(paths.app.extras, paths.tmp.basePath)
);

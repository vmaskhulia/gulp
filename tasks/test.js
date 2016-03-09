'use strict';

import gulp from 'gulp';
var $ = require('gulp-load-plugins')();
import {LOCALHOST_PORT} from '../consts';
import paths from '../paths';
var Server = require('karma').Server;
var protractor = $.protractor.protractor;


gulp.task('test', ['test:e2e', 'test:server', 'test:client']);

gulp.task('test:server', () => {
  return gulp.src('server/**/*.spec.js', {read: false})
    .pipe($.plumber())
    .pipe($.spawnMocha({
      env: {'NODE_ENV': 'test'},
      reporter: 'spec'
    }));
});

gulp.task('test:client', done => {
  new Server({
    configFile: paths.config.karma
  }, done).start();
});

gulp.task('test:e2e', done => {
  gulp.src([])
    .pipe(protractor({
      configFile: paths.config.e2e,
      args: ['--baseUrl', `http://127.0.0.1:${LOCALHOST_PORT}`]
    }))
    .on('error', e => {
      console.error(e);
      process.exit(1);
    })
    .on('end', done);
});

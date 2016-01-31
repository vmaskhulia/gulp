'use strict';

import gulp from 'gulp';
var $ = require('gulp-load-plugins')();
import {LOCALHOST_PORT} from '../consts';
import paths from '../paths';
var protractor = $.protractor.protractor;
var Server = require('karma').Server;


gulp.task('test:server', () => {
  gulp.src('server/**/*.spec.js', {read: false})
    .pipe($.plumber())
    .pipe($.spawnMocha({
      env: {'NODE_ENV': 'test'},
      reporter: 'spec'
    }));
});

gulp.task('test:client', ['compileScripts'], done => {
  new Server({
    configFile: paths.karmaConfig
  }, done).start();
});

gulp.task('test:e2e', done => {
  var args = ['--baseUrl', `http://127.0.0.1:${LOCALHOST_PORT}`];

  gulp.src([])
    .pipe(protractor({
      configFile: paths.protractorConfig,
      args
    }))
    .on('error', e => {
      console.error(e);
      process.exit(1);
    })
    .on('end', done);
});

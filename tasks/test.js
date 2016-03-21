'use strict';

import gulp from 'gulp';
var $ = require('gulp-load-plugins')();
import {HOST, PRODUCTION_PORT, DEVELOPMENT_PORT} from '../consts';
import paths from '../paths';
var Server = require('karma').Server;
var protractor = $.protractor.protractor;
var argv = $.util.env;

var isProduction = argv.p;
var scheme = isProduction ? 'http' : 'http';
var host = isProduction ? 'localhost' : 'localhost';
var port = isProduction ? PRODUCTION_PORT : DEVELOPMENT_PORT;
var url = `${scheme}://${host}:${port}`;


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
      args: ['--baseUrl', url]
    }))
    .on('error', done)
    .on('end', done);
});

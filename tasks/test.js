'use strict';

import gulp from 'gulp';
const $ = require('gulp-load-plugins')();
import {HOST, PRODUCTION_PORT, DEVELOPMENT_PORT} from '../consts';
import paths from '../paths';
const Server = require('karma').Server;
const protractor = $.protractor.protractor;
const argv = $.util.env;

const isProduction = argv.p;
const scheme = isProduction ? 'http' : 'http';
const host = isProduction ? 'localhost' : 'localhost';
const port = isProduction ? PRODUCTION_PORT : DEVELOPMENT_PORT;
const url = `${scheme}://${host}:${port}`;


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

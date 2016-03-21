'use strict';

import gulp from 'gulp';
import runSequence from 'run-sequence';
import browserSync from 'browser-sync';
import ripe from 'ripe';
import {DEVELOPMENT_PORT, BROWSER_SYNC_PORT} from '../consts';
import paths from '../paths';
var $ = require('gulp-load-plugins')();


gulp.task('serve', done => {
  runSequence(
    ['nodemon', 'tmp'],
    ['browserSync', 'watch'],
    done);
});

gulp.task('nodemon', done => {
  var hasStarted = false;

  $.nodemon({
      script: paths.server.starter,
      watch: paths.server.scripts
    })
    .on('start', () => {
      if (hasStarted) {
        ripe.wait(() => browserSync.reload({stream: false}));
      } else {
        ripe.wait(done);
        hasStarted = true;
      }
    });
});

gulp.task('browserSync', () => {
  browserSync.init({
    proxy: {target: `localhost:${DEVELOPMENT_PORT}`, ws: true},
    port: BROWSER_SYNC_PORT
  });
});

gulp.task('reloadBrowserSync', () => {
  browserSync.reload({stream: false});
});

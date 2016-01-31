'use strict';

import gulp from 'gulp';
import browserSync from 'browser-sync';
import ripe from 'ripe';
import {LOCALHOST_PORT, BROWSER_SYNC_PORT} from '../consts';
import paths from '../paths';
var $ = require('gulp-load-plugins')();


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

gulp.task('serve', ['nodemon', 'watch'], () =>
  browserSync.init({
    proxy: {target: `localhost:${LOCALHOST_PORT}`, ws: true},
    port: BROWSER_SYNC_PORT
  })
);

gulp.task('reload-server', () => browserSync.reload({stream: false}));

'use strict';

import gulp from 'gulp';
import browserSync from 'browser-sync';
import ripe from 'ripe';
import paths from '../paths';
import {LOCALHOST_PORT, BROWSER_SYNC_PORT} from '../consts';
var $ = require('gulp-load-plugins')();

gulp.task('nodemon', done => {
  var already = false;

  $.nodemon({
    script: 'server/server.js',
    watch: 'server/**/*.js'
  })
  .on('start', () => {
    if (already) {
      ripe.wait(() => browserSync.reload({stream: false}));
    } else {
      ripe.wait(done);
      already = true;
    }
  });
});

gulp.task('serve', ['nodemon', 'watch'], () =>
  browserSync.init({
    files: [paths.app.html],
    proxy: {target: `localhost:${LOCALHOST_PORT}`, ws: true},
    port: BROWSER_SYNC_PORT,
    browser: 'default'
  })
);

gulp.task('reload-server', () => browserSync.reload({stream: false}));

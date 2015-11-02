'use strict';

import gulp from 'gulp';
var $ = require('gulp-load-plugins')();

gulp.task('test', () => {
  gulp.src('server/**/*.spec.js', {read: false})
    .pipe($.plumber())
    .pipe($.spawnMocha({
      env: {'NODE_ENV': 'test'},
      reporter: 'spec'
    }));
});

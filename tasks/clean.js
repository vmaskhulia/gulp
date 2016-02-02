'use strict';

import gulp from 'gulp';
import del from 'del';
import paths from '../paths';


gulp.task('cleanTmp', done => {
  del(paths.tmp.base, done);
});

gulp.task('cleanDist', done => {
  del(paths.dist.base, done);
});

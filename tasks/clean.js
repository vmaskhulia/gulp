'use strict';

import gulp from 'gulp';
import del from 'del';
import paths from '../paths';


gulp.task('cleanTmp', () => {
  return del(paths.tmp.base);
});

gulp.task('cleanDist', () => {
  return del(paths.dist.base);
});

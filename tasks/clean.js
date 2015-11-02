'use strict';

import gulp from 'gulp';
import del from 'del';
import paths from '../paths';

gulp.task('cleanTmp', done => {
  del(paths.tmp.basePath, done);
});

gulp.task('cleanDist', done => {
  del(paths.dist.basePath, done);
});

gulp.task('cleanAssets', done => {
  del(paths.tmp.assets, done);
});

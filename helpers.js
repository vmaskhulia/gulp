'use strict';

import gulp from 'gulp';

export function copy(src, dest) {
  return gulp.src(src)
    .pipe(gulp.dest(dest));
}

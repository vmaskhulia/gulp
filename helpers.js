'use strict';

import gulp from 'gulp';

export function copy(src, dest) {
  return gulp.src(src)
    .pipe(gulp.dest(dest));
}

export function firstLetterToUpperCase(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function firstLetterToLowerCase(str) {
  return str.charAt(0).toLowerCase() + str.slice(1);
}

'use strict';

import gulp from 'gulp';
var $ = require('gulp-load-plugins')();
var argv = $.util.env;
var log = $.util.log;
var colors = $.util.colors;


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

export function getNameFromArgv() {
  var name = argv.name || argv.n;

  if (!name) {
    log(colors.red('Error: name parameter is required (e.g. --name <myName>)'));
    process.exit(1);
  }

  return name;
}

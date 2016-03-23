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

export function firstUC(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function firstLC(str) {
  return str.charAt(0).toLowerCase() + str.slice(1);
}

export function plural(str) {
  if (str.endsWith('y')) {
    return str.substr(0, str.length - 1) + 'ies';
  } else {
    return str + 's';
  }
}

export function singular(str) {
  if (str.endsWith('ies')) {
    return str.substr(0, str.length - 3) + 'y';
  } else {
    return str.substr(0, str.length - 1);
  }
}

export function getNameFromArgv() {
  var name = argv.name || argv.n;
  if (!name) {
    log(colors.red('Error: name parameter is required (e.g. --name <myName>)'));
    process.exit(1);
  }
  return firstLC(name);
}

export function getDefFieldFromArgv() {
  var field = argv.f;
  if (!field) {
    log(colors.red('Error: default field is required (e.g. -f <myField>)'));
    process.exit(1);
  }
  return field;
}

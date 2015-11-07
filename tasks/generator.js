'use strict';

import gulp from 'gulp';
import path from 'path';
import paths from '../paths';
import runSequence from 'run-sequence';
var $ = require('gulp-load-plugins')();

const argv = $.util.env;
const LOG = $.util.log;
const COLORS = $.util.colors;

gulp.task('modal', done => {
  runSequence('addModalTemplates', 'inject', done);
});

gulp.task('common', done => {
  runSequence('addCommonTemplates', 'inject', done);
});

gulp.task('maincomponent', done => {
  runSequence('addMainComponentTemplates', 'inject', done);
});

gulp.task('admincomponent', done => {
  runSequence('addAdminComponentTemplates', 'inject', done);
});

gulp.task('addModalTemplates', () => {
  const name = `${getName()}Modal`;
  const srcPath = paths.generatorTemplates.modal;
  const destPath = path.join(paths.app.common, 'modals', name);
  return insertTemplates(name, srcPath, destPath);
});

gulp.task('addCommonTemplates', () => {
  const name = getName();
  const srcPath = paths.generatorTemplates.common;
  const destPath = path.join(paths.app.common, name);
  return insertTemplates(name, srcPath, destPath);
});

gulp.task('addMainComponentTemplates', () => {
  const name = getName();
  const srcPath = paths.generatorTemplates.mainComponent;
  const destPath = path.join(paths.app.components, 'main', name);
  return insertTemplates(name, srcPath, destPath);
});

gulp.task('addAdminComponentTemplates', () => {
  const name = getName();
  const srcPath = paths.generatorTemplates.adminComponent;
  const destPath = path.join(paths.app.components, 'admin', name);
  return insertTemplates(name, srcPath, destPath);
});

function insertTemplates(name, srcPath, destPath) {
  return gulp.src(srcPath)
    .pipe($.template({name}))
    .pipe($.rename(path => {
      path.basename = path.basename.replace('name', name);
    }))
    .pipe(gulp.dest(destPath));
}

function getName() {
  const name = argv.name || argv.n;
  if (!name) {
    LOG(COLORS.red('Error: name parameter is required (e.g. --name componentName)'));
    process.exit(1);
  }
  return name;
}

'use strict';

import gulp from 'gulp';
import path from 'path';
import runSequence from 'run-sequence';
import paths from '../paths';
var $ = require('gulp-load-plugins')();

var argv = $.util.env;
var LOG = $.util.log;
var COLORS = $.util.colors;


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
  var name = `${getComponentName()}Modal`;
  var srcPath = paths.generatorTemplates.modal;
  var destPath = path.join(paths.app.common, 'modals', name);

  return insertTemplates(name, srcPath, destPath);
});

gulp.task('addCommonTemplates', () => {
  var name = getComponentName();
  var srcPath = paths.generatorTemplates.common;
  var destPath = path.join(paths.app.common, name);

  return insertTemplates(name, srcPath, destPath);
});

gulp.task('addMainComponentTemplates', () => {
  var name = getComponentName();
  var srcPath = paths.generatorTemplates.mainComponent;
  var destPath = path.join(paths.app.components, 'main', name);

  return insertTemplates(name, srcPath, destPath);
});

gulp.task('addAdminComponentTemplates', () => {
  var name = getComponentName();
  var srcPath = paths.generatorTemplates.adminComponent;
  var destPath = path.join(paths.app.components, 'admin', name);

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

function getComponentName() {
  var name = argv.name || argv.n;
  
  if (!name) {
    LOG(COLORS.red('Error: name parameter is required (e.g. --name componentName)'));
    process.exit(1);
  }

  return name;
}

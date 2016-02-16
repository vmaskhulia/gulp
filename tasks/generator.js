'use strict';

import gulp from 'gulp';
import path from 'path';
import runSequence from 'run-sequence';
import paths from '../paths';
import {capitalize} from '../helpers';
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

gulp.task('api', done => {
  runSequence('addApiTemplates', 'inject', done);
});

gulp.task('addModalTemplates', () => {
  var name = `${getComponentName()}Modal`;
  var src = paths.generatorTemplates.modal;
  var dest = path.join(paths.app.common, 'modals', name);

  return insertTemplates(name, src, dest);
});

gulp.task('addCommonTemplates', () => {
  var name = getComponentName();
  var src = paths.generatorTemplates.common;
  var dest = path.join(paths.app.common, name);

  return insertTemplates(name, src, dest);
});

gulp.task('addMainComponentTemplates', () => {
  var name = getComponentName();
  var src = paths.generatorTemplates.mainComponent;
  var dest = path.join(paths.app.components, 'main', name);

  return insertTemplates(name, src, dest);
});

gulp.task('addAdminComponentTemplates', () => {
  var name = getComponentName();
  var src = paths.generatorTemplates.adminComponent;
  var dest = path.join(paths.app.components, 'admin', name);

  return insertTemplates(name, src, dest);
});

gulp.task('addApiTemplates', () => {
  var name = getComponentName();
  var src = paths.generatorTemplates.api;
  var dest = path.join(paths.server.base, 'api', name);

  return insertTemplates(name, src, dest);
});

function insertTemplates(name, src, dest) {
  return gulp.src(src)
    .pipe($.template({
      name,
      nameC: capitalize(name)
    }, {
      interpolate: /<%=([\s\S]+?)%>/g
    }))
    .pipe($.rename(path => {
      path.basename = path.basename.replace('name', name);
    }))
    .pipe(gulp.dest(dest));
}

function getComponentName() {
  var name = argv.name || argv.n;
  
  if (!name) {
    LOG(COLORS.red('Error: name parameter is required (e.g. --name componentName)'));
    process.exit(1);
  }

  return name;
}

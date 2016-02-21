'use strict';

import gulp from 'gulp';
import path from 'path';
import runSequence from 'run-sequence';
import paths from '../paths';
import {firstLetterToUpperCase, firstLetterToLowerCase} from '../helpers';
var $ = require('gulp-load-plugins')();

var argv = $.util.env;
var LOG = $.util.log;
var COLORS = $.util.colors;


gulp.task('modal', done => {
  runSequence('generateModal', 'inject', done);
});

gulp.task('resource', done => {
  runSequence('generateResource', 'inject', done);
});

gulp.task('service', done => {
  runSequence('generateService', 'inject', done);
});

gulp.task('common', done => {
  runSequence('generateCommon', 'inject', done);
});

gulp.task('main-component', done => {
  runSequence('generateMainComponent', 'inject', done);
});

gulp.task('admin-component', done => {
  runSequence('generateAdminComponent', 'inject', done);
});

gulp.task('api', done => {
  runSequence('generateApi', 'generateResource', 'inject', done);
});


gulp.task('generateModal', () => {
  var name = `${firstLetterToLowerCase(getComponentName())}Modal`;
  var src = paths.generatorTemplates.modal;
  var dest = path.join(paths.app.common, 'modals', name);

  return insertTemplates(name, src, dest);
});

gulp.task('generateResource', () => {
  var name = firstLetterToUpperCase(getComponentName());
  var src = paths.generatorTemplates.resource;
  var dest = path.join(paths.app.common, 'resources');

  return insertTemplates(name, src, dest);
});

gulp.task('generateService', () => {
  var name = getComponentName();
  var src = paths.generatorTemplates.service;
  var dest = path.join(paths.app.common, 'services');

  return insertTemplates(name, src, dest);
});

gulp.task('generateCommon', () => {
  var name = getComponentName();
  var src = paths.generatorTemplates.common;
  var dest = path.join(paths.app.common, name);

  return insertTemplates(name, src, dest);
});

gulp.task('generateMainComponent', () => {
  var name = getComponentName();
  var src = paths.generatorTemplates.mainComponent;
  var dest = path.join(paths.app.components, 'main', name);

  return insertTemplates(name, src, dest);
});

gulp.task('generateAdminComponent', () => {
  var name = getComponentName();
  var src = paths.generatorTemplates.adminComponent;
  var dest = path.join(paths.app.components, 'admin', name);

  return insertTemplates(name, src, dest);
});

gulp.task('generateApi', () => {
  var name = firstLetterToLowerCase(getComponentName());
  var src = paths.generatorTemplates.api;
  var dest = path.join(paths.server.base, 'api', name);

  return insertTemplates(name, src, dest);
});

function insertTemplates(name, src, dest) {
  return gulp.src(src)
    .pipe($.template({
      name,
      nameC: firstLetterToUpperCase(name),
      nameL: firstLetterToLowerCase(name)
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

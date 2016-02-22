'use strict';

import gulp from 'gulp';
import path from 'path';
import runSequence from 'run-sequence';
import paths from '../paths';
import {getNameFromArgv, firstLetterToUpperCase, firstLetterToLowerCase} from '../helpers';
var $ = require('gulp-load-plugins')();


gulp.task('api', done => {
  runSequence('generateModal', 'generateResource', 'generateMainComponent', 'generateAdminComponent', 'generateApi', 'generateStub', 'inject', done);
});

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


gulp.task('generateModal', () => {
  var name = firstLetterToLowerCase(getNameFromArgv());
  var src = paths.generatorTemplates.modal;
  var dest = path.join(paths.app.common, 'modals', name);

  return insertTemplates(name, src, dest);
});

gulp.task('generateResource', () => {
  var name = firstLetterToUpperCase(getNameFromArgv());
  var src = paths.generatorTemplates.resource;
  var dest = path.join(paths.app.common, 'resources');

  return insertTemplates(name, src, dest);
});

gulp.task('generateService', () => {
  var name = firstLetterToUpperCase(getNameFromArgv());
  var src = paths.generatorTemplates.service;
  var dest = path.join(paths.app.common, 'services');

  return insertTemplates(name, src, dest);
});

gulp.task('generateCommon', () => {
  var name = firstLetterToLowerCase(getNameFromArgv());
  var src = paths.generatorTemplates.common;
  var dest = path.join(paths.app.common, name);

  return insertTemplates(name, src, dest);
});

gulp.task('generateMainComponent', () => {
  var name = firstLetterToLowerCase(getNameFromArgv());
  var src = paths.generatorTemplates.mainComponent;
  var dest = path.join(paths.app.components, 'main', name);

  return insertTemplates(name, src, dest);
});

gulp.task('generateAdminComponent', () => {
  var name = firstLetterToLowerCase(getNameFromArgv());
  var src = paths.generatorTemplates.adminComponent;
  var dest = path.join(paths.app.components, 'admin', name);

  return insertTemplates(name, src, dest);
});

gulp.task('generateApi', () => {
  var name = firstLetterToLowerCase(getNameFromArgv());
  var src = paths.generatorTemplates.api;
  var dest = path.join(paths.server.base, 'api', name);

  return insertTemplates(name, src, dest);
});

gulp.task('generateStub', () => {
  var name = firstLetterToLowerCase(getNameFromArgv());
  var src = paths.generatorTemplates.stub;
  var dest = path.join(paths.server.base, 'stubs');

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

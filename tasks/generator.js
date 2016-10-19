'use strict';

import gulp from 'gulp';
import path from 'path';
import runSequence from 'run-sequence';
import paths from '../paths';
import {getNameFromArgv, getDefFieldFromArgv, firstUC, firstLC, plural} from '../helpers';
const $ = require('gulp-load-plugins')();


gulp.task('directive', (done) => {
  runSequence('generateDirective', 'inject', done);
});

gulp.task('modal', (done) => {
  runSequence('generateModal', 'inject', done);
});

gulp.task('service', (done) => {
  runSequence('generateService', 'inject', done);
});

gulp.task('resource', (done) => {
  runSequence('generateResource', 'inject', done);
});

gulp.task('validator', (done) => {
  runSequence('generateValidator', 'inject', done);
});

gulp.task('main-component', (done) => {
  runSequence('generateMainComponent', 'inject', done);
});

gulp.task('admin-component', (done) => {
  runSequence('generateAdminComponent', 'inject', done);
});

gulp.task('api', (done) => {
  runSequence('generateModal', 'generateResource', 'generateAdminComponent', 'generateApi', 'generateStub', 'inject', done);
});


gulp.task('generateDirective', () => {
  const name = 'lc' + firstUC(getNameFromArgv());
  const src = paths.generatorTemplates.directive;
  const dest = path.join(paths.app.common, 'directives', name);
  return insertTemplates(name, src, dest);
});

gulp.task('generateModal', () => {
  const name = getNameFromArgv();
  const src = paths.generatorTemplates.modal;
  const dest = path.join(paths.app.common, 'modals', name);
  return insertTemplates(name, src, dest, true);
});

gulp.task('generateService', () => {
  const name = getNameFromArgv();
  const src = paths.generatorTemplates.service;
  const dest = path.join(paths.app.common, 'services');
  return insertTemplates(name, src, dest);
});

gulp.task('generateResource', () => {
  const name = getNameFromArgv();
  const src = paths.generatorTemplates.resource;
  const dest = path.join(paths.app.common, 'resources');
  return insertTemplates(name, src, dest);
});

gulp.task('generateValidator', () => {
  const name = getNameFromArgv();
  const src = paths.generatorTemplates.validator;
  const dest = path.join(paths.app.common, 'validators');
  return insertTemplates(name, src, dest);
});

gulp.task('generateMainComponent', () => {
  const name = getNameFromArgv();
  const src = paths.generatorTemplates.mainComponent;
  const dest = path.join(paths.app.components, 'main', name);
  return insertTemplates(name, src, dest);
});

gulp.task('generateAdminComponent', () => {
  const name = getNameFromArgv();
  const src = paths.generatorTemplates.adminComponent;
  const dest = path.join(paths.app.components, 'admin', plural(name));
  return insertTemplates(name, src, dest, true);
});

gulp.task('generateApi', () => {
  const name = getNameFromArgv();
  const src = paths.generatorTemplates.api;
  const dest = path.join(paths.server.base, 'api', plural(name));
  return insertTemplates(name, src, dest, true);
});

gulp.task('generateStub', () => {
  const name = getNameFromArgv();
  const src = paths.generatorTemplates.stub;
  const dest = path.join(paths.server.base, 'stubs');
  return insertTemplates(name, src, dest, true);
});


function insertTemplates(name, src, dest, defFieldIncluded) {
  return gulp.src(src)
    .pipe($.template({
      nameUC: firstUC(name),
      nameLC: firstLC(name),
      namePlural: plural(name),
      defField: defFieldIncluded ? getDefFieldFromArgv() : null
    }, {
      interpolate: /<%=([\s\S]+?)%>/g
    }))
    .pipe($.rename(path => {
      path.basename = getFileName(name, path.basename);
    }))
    .pipe(gulp.dest(dest));
}

function getFileName(name, basename) {
  if (basename.indexOf('namePlural') !== -1) {
    return basename.replace('namePlural', plural(name));
  } else if (basename.indexOf('nameUC') !== -1) {
    return basename.replace('nameUC', firstUC(name));
  } else {
    return basename.replace('name', name);
  }
}

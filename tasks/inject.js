'use strict';

import gulp from 'gulp';
import path from 'path';
var es = require('event-stream');
import paths from '../paths';
var $ = require('gulp-load-plugins')();

const argv = $.util.env;
const END_TAG = '//endinject';

const commonBase = paths.app.common;
const componentsBase = paths.app.components;

const commonFolders = [`!${commonBase}*.*`, `${commonBase}*`];
const mainComponentsFolders = [`!${componentsBase}main/*.*`, `${componentsBase}main/*`];
const adminComponentsFolders = [`!${componentsBase}admin/*.*`, `${componentsBase}admin/*`];

const modalFolders = [`!${commonBase}modals/*.*`, `${commonBase}modals/*`];
const serviceFolders = [`!${commonBase}services/.services.js`, `${commonBase}services/*`];
const resourceFolders = [`!${commonBase}resources/.resources.js`, `${commonBase}resources/*`];

gulp.task('inject', () => {
  return es.merge(
    injectModals(),
    injectServices(),
    injectResources(),
    injectCommon(),
    injectMainComponents(),
    injectAdminComponents()
  );
});

function injectModals() {
  var base = `${commonBase}modals`;

  return gulp.src(`${base}/modals.js`)
    .pipe(inject(modalFolders, '//inject:import', getTransformImportFolders('')))
    .pipe(inject(modalFolders, '//inject:ngservice', transformNgService))
    .pipe(gulp.dest(base));
}

function injectServices() {
  var base = `${commonBase}services`;

  return gulp.src(`${base}/services.js`)
    .pipe(inject(serviceFolders, '//inject:import', transformImportFiles))
    .pipe(inject(serviceFolders, '//inject:ngservice', transformNgService))
    .pipe(gulp.dest(base));
}

function injectResources() {
  var base = `${commonBase}resources`;

  return gulp.src(`${base}/resources.js`)
    .pipe(inject(resourceFolders, '//inject:import', transformImportFiles))
    .pipe(inject(resourceFolders, '//inject:ngfactory', transformNgFactory))
    .pipe(gulp.dest(base));
}

function injectCommon() {
  return gulp.src(`${commonBase}common.js`)
    .pipe(inject(commonFolders, '//inject:import', getTransformImportFolders('')))
    .pipe(inject(commonFolders, '//inject:ngmodule', transformNgModule))
    .pipe(gulp.dest(commonBase));
}

function injectMainComponents() {
  return gulp.src(`${componentsBase}components.js`)
    .pipe(inject(mainComponentsFolders, '//inject:import.main', getTransformImportFolders('main/')))
    .pipe(inject(mainComponentsFolders, '//inject:ngmodule.main', transformNgModule))
    .pipe(gulp.dest(componentsBase));
}

function injectAdminComponents() {
  return gulp.src(`${componentsBase}components.js`)
    .pipe(inject(adminComponentsFolders, '//inject:import.admin'), getTransformImportFolders('admin/'))
    .pipe(inject(adminComponentsFolders, '//inject:ngmodule.admin', transformNgModule))
    .pipe(gulp.dest(componentsBase));
}

function inject(folderPath, starttag, transform) {
  return $.inject(
    gulp.src(folderPath, {read: false}), {
      transform,
      starttag,
      endtag: END_TAG
    }
  );
}

function getTransformImportFolders(prefix) {
  return filePath => {
    var name = path.basename(filePath);
    return `import ${name} from './${prefix}${name}/${name}';`;
  };
}

function transformImportFiles(filePath) {
  var extension = path.extname(filePath);
  var name = path.basename(filePath).replace(extension, '');
  return `import ${name} from './${name}';`;
}

function transformNgModule(filePath) {
  var name = path.basename(filePath);
  return `${name}.name,`;
}

function transformNgService(filePath) {
  var extension = path.extname(filePath);
  var name = path.basename(filePath).replace(extension, '');
  return `.service('${name}', ${name})`;
}

function transformNgFactory(filePath) {
  var extension = path.extname(filePath);
  var name = path.basename(filePath).replace(extension, '');
  return `.factory('${name}', ${name})`;
}

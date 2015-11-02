'use strict';

import gulp from 'gulp';
import path from 'path';
import paths from '../paths';
import runSequence from 'run-sequence';
var $ = require('gulp-load-plugins')();

const END_TAG = '//endinject';

const commonBase = paths.app.common;
const componentsBase = paths.app.components;

const commonFolders = [`!${commonBase}*.*`, `${commonBase}*`];
const mainComponentsFolders = [`!${componentsBase}main/*.*`, `${componentsBase}main/*`];
const adminComponentsFolders = [`!${componentsBase}admin/*.*`, `${componentsBase}admin/*`];

gulp.task('inject', done => {
  runSequence('injectCommon', 'injectMainComponents', 'injectAdminComponents', done);
});

gulp.task('injectCommon', () =>
  gulp.src(`${commonBase}common.js`)
    .pipe(injectImport(commonFolders))
    .pipe(injectNgModule(commonFolders))
    .pipe(gulp.dest(commonBase))
);

gulp.task('injectMainComponents', () =>
  gulp.src(`${componentsBase}components.js`)
    .pipe(injectImport(mainComponentsFolders, 'main'))
    .pipe(injectNgModule(mainComponentsFolders, 'main'))
    .pipe(gulp.dest(componentsBase))
);

gulp.task('injectAdminComponents', () =>
  gulp.src(`${componentsBase}components.js`)
    .pipe(injectImport(adminComponentsFolders, 'admin'))
    .pipe(injectNgModule(adminComponentsFolders, 'admin'))
    .pipe(gulp.dest(componentsBase))
);

function injectImport(folderPath, module) { // module is app/main
  var starttag = '//inject:import' + (module ? `.${module}` : '');
  return $.inject(
    gulp.src(folderPath, {read: false}), {
      transform: transformImport(module),
      starttag,
      endtag: END_TAG
    }
  );
}

function injectNgModule(folderPath, module) { // module is app/main
  var starttag = '//inject:ngmodule' + (module ? `.${module}` : '');
  return $.inject(
    gulp.src(folderPath, {read: false}), {
      transform: transformNgModule,
      starttag,
      endtag: END_TAG
    }
  );
}

function transformImport(module) {
  var prefix = module ? `./${module}/` : './';
  return filePath => {
    var name = path.basename(filePath);
    return `import ${name} from '${prefix}${name}/${name}';`;
  };
}

function transformNgModule(filePath) {
  var name = path.basename(filePath);
  return `${name}.name,`;
}

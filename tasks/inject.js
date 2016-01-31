'use strict';

import gulp from 'gulp';
import path from 'path';
import es from 'event-stream';
import paths from '../paths';
var $ = require('gulp-load-plugins')();


gulp.task('inject', () => {
  return es.merge(
    injectCommon(),
    injectModals(),
    injectServices(),
    injectResources(),
    injectComponents()
  );
});

function injectCommon() {
  var basePath = paths.app.common;
  var src = `${basePath}/common.js`;
  var fileNames = excludeFilesWithExtensions(basePath);

  return doubleInject(
    src,
    basePath,
    fileNames,
    '//inject:import',
    n => `import ${n} from './${n}/${n}';`,
    '//inject:ngmodule',
    n => `${n}.name,`
  );
}

function injectModals() {
  var basePath = `${paths.app.common}/modals`;
  var src = `${basePath}/modals.js`;
  var fileNames = excludeFilesWithExtensions(basePath);

  return doubleInject(
    src,
    basePath,
    fileNames,
    '//inject:import',
    n => `import ${n} from './${n}/${n}';`,
    '//inject:ngservice',
    n => `.service('${n}', ${n})`
  );
}

function injectServices() {
  var basePath = `${paths.app.common}/services`;
  var src = `${basePath}/services.js`;
  var fileNames = [`!${basePath}/services.js`, `${basePath}/*`];

  return doubleInject(
    src,
    basePath,
    fileNames,
    '//inject:import',
    n => `import ${n} from './${n}';`,
    '//inject:ngservice',
    n => `.service('${n}', ${n})`
  );
}

function injectResources() {
  var basePath = `${paths.app.common}/resources`;
  var src = `${basePath}/resources.js`;
  var fileNames = [`!${basePath}/resources.js`, `${basePath}/*`];

  return doubleInject(
    src,
    basePath,
    fileNames,
    '//inject:import',
    n => `import ${n} from './${n}';`,
    '//inject:ngfactory',
    n => `.factory('${n}', ${n})`
  );
}

function injectComponents() {
  var basePath = paths.app.components;
  var src = `${basePath}/components.js`;
  var mainFileNames = excludeFilesWithExtensions(`${basePath}/main`);
  var adminFileNames = excludeFilesWithExtensions(`${basePath}/admin`);

  return gulp.src(src)
    .pipe(inject(
      mainFileNames,
      '//inject:import.main',
      n => `import main${n} from './main/${n}/${n}';`
    ))
    .pipe(inject(
      adminFileNames,
      '//inject:import.admin',
      n => `import admin${n} from './admin/${n}/${n}';`
    ))
    .pipe(inject(
      mainFileNames,
      '//inject:ngmodule.main',
      n => `main${n}.name,`
    ))
    .pipe(inject(
      adminFileNames,
      '//inject:ngmodule.admin',
      n => `admin${n}.name,`
    ))
    .pipe(gulp.dest(basePath));
}

function doubleInject(src, dest, fileNames, starttag1, transform1, starttag2, transform2) {
  return gulp.src(src)
    .pipe(inject(fileNames, starttag1, transform1))
    .pipe(inject(fileNames, starttag2, transform2))
    .pipe(gulp.dest(dest));
}

function inject(fileNames, starttag, transformFileName) {
  return $.inject(
    gulp.src(fileNames, {read: false}), {
      starttag,
      endtag: '//endinject',
      transform: filePath => {
        var ext = path.extname(filePath);
        var name = path.basename(filePath).replace(ext, '');
        return transformFileName(name);
      }
    }
  );
}

function excludeFilesWithExtensions(path) {
  return [`!${path}/*.*`, `${path}/*`];
}

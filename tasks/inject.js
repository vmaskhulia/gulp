'use strict';

import gulp from 'gulp';
import path from 'path';
import es from 'event-stream';
import paths from '../paths';
import {firstUC, singular} from '../helpers';
var $ = require('gulp-load-plugins')();


gulp.task('inject', () => {
  return es.merge(
    injectCommon(),
    injectModals(),
    injectServices(),
    injectResources(),
    injectComponents(),
    injectRoutes(),
    injectSeed()
  );
});

function injectCommon() {
  var base = paths.app.common;
  var src = `${base}/common.js`;
  var fileNames = excludeFilesWithExtensions(base);

  return doubleInject(
    src,
    base,
    fileNames,
    '//inject:import',
    n => `import ${n} from './${n}/${n}.js';`,
    '//inject:ngmodule',
    n => `${n}.name,`
  );
}

function injectModals() {
  var base = `${paths.app.common}/modals`;
  var src = `${base}/modals.js`;
  var fileNames = excludeFilesWithExtensions(base);

  return doubleInject(
    src,
    base,
    fileNames,
    '//inject:import',
    n => `import ${n} from './${n}/${n}.js';`,
    '//inject:ngservice',
    n => `.service('${n}Modal', ${n})`
  );
}

function injectServices() {
  var base = `${paths.app.common}/services`;
  var src = `${base}/services.js`;
  var fileNames = [`!${base}/services.js`, `${base}/*`];

  return doubleInject(
    src,
    base,
    fileNames,
    '//inject:import',
    n => `import ${n} from './${n}.js';`,
    '//inject:ngservice',
    n => `.service('${n}', ${n})`
  );
}

function injectResources() {
  var base = `${paths.app.common}/resources`;
  var src = `${base}/resources.js`;
  var fileNames = [`!${base}/resources.js`, `${base}/*`];

  return doubleInject(
    src,
    base,
    fileNames,
    '//inject:import',
    n => `import ${n} from './${n}.js';`,
    '//inject:ngfactory',
    n => `.factory('${n}', ${n})`
  );
}

function injectComponents() {
  var base = paths.app.components;
  var src = `${base}/components.js`;
  var mainFileNames = excludeFilesWithExtensions(`${base}/main`);
  var adminFileNames = excludeFilesWithExtensions(`${base}/admin`);

  return gulp.src(src)
    .pipe(inject(
      mainFileNames,
      '//inject:import.main',
      n => `import main${n} from './main/${n}/${n}.js';`
    ))
    .pipe(inject(
      adminFileNames,
      '//inject:import.admin',
      n => `import admin${n} from './admin/${n}/${n}.js';`
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
    .pipe(gulp.dest(base));
}

function injectRoutes() {
  var base = paths.server.base;
  var src = `${base}/routes.js`;
  var fileNames = [`${base}/api/*`];

  return gulp.src(src)
    .pipe(inject(
      fileNames,
      '//inject:routes',
      n => `app.use('/api/${n}', require('./api/${n}'));`
    ))
    .pipe(gulp.dest(base));
}

function injectSeed() {
  var base = paths.server.base;
  var src = `${base}/config/seed.js`;
  var fileNames = [`${base}/api/*`];

  return gulp.src(src)
    .pipe(inject(
      fileNames,
      '//inject:require.daos',
      n => `var ${firstUC(singular(n))} = require('../api/${n}/${singular(n)}.dao');`
    ))
    .pipe(inject(
      fileNames,
      '//inject:require.stubs',
      n => `var ${firstUC(singular(n))}Stub = require('../stubs/${singular(n)}.stub');`
    ))
    .pipe(inject(
      fileNames,
      '//inject:daos.destroyAll',
      n => `${firstUC(singular(n))}.destroyAll(),`
    ))
    .pipe(gulp.dest(`${base}/config`));
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

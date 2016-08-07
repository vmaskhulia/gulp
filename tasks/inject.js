'use strict';

import gulp from 'gulp';
import path from 'path';
import es from 'event-stream';
import paths from '../paths';
import {firstUC, singular} from '../helpers';
const $ = require('gulp-load-plugins')();


gulp.task('inject', () => {
  return es.merge(
    injectDirectives(),
    injectModals(),
    injectServices(),
    injectResources(),
    injectValidators(),
    injectCommon(),
    injectComponents(),

    injectRoutes(),
    injectSeed()
  );
});

function injectDirectives() {
  const base = `${paths.app.common}/directives`;
  const src = `${base}/directives.js`;
  const fileNames = excludeFilesWithExtensions(base);

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
  const base = `${paths.app.common}/modals`;
  const src = `${base}/modals.js`;
  const fileNames = excludeFilesWithExtensions(base);

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
  const base = `${paths.app.common}/services`;
  const src = `${base}/services.js`;
  const fileNames = [`!${base}/services.js`, `${base}/*`];

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
  const base = `${paths.app.common}/resources`;
  const src = `${base}/resources.js`;
  const fileNames = [`!${base}/resources.js`, `${base}/*`];

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


function injectValidators() {
  const base = `${paths.app.common}/validators`;
  const src = `${base}/validators.js`;
  const fileNames = [`!${base}/validators.js`, `${base}/*`];

  return doubleInject(
    src,
    base,
    fileNames,
    '//inject:import',
    n => `import ${n} from './${n}.js';`,
    '//inject:ngdirective',
    n => `.directive('${n}', ${n})`
  );
}

function injectCommon() {
  const base = paths.app.common;
  const src = `${base}/common.js`;
  const fileNames = excludeFilesWithExtensions(base);

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

function injectComponents() {
  const base = paths.app.components;
  const src = `${base}/components.js`;
  const mainFileNames = excludeFilesWithExtensions(`${base}/main`);
  const adminFileNames = excludeFilesWithExtensions(`${base}/admin`);

  return gulp.src(src)
    .pipe(inject(
      mainFileNames,
      '//inject:import.main',
      n => `import Main${firstUC(n)} from './main/${n}/${n}.js';`
    ))
    .pipe(inject(
      adminFileNames,
      '//inject:import.admin',
      n => `import Admin${firstUC(n)} from './admin/${n}/${n}.js';`
    ))
    .pipe(inject(
      mainFileNames,
      '//inject:ngmodule.main',
      n => `Main${firstUC(n)}.name,`
    ))
    .pipe(inject(
      adminFileNames,
      '//inject:ngmodule.admin',
      n => `Admin${firstUC(n)}.name,`
    ))
    .pipe(gulp.dest(base));
}

function injectRoutes() {
  const base = paths.server.base;
  const src = `${base}/routes.js`;
  const fileNames = [`${base}/api/*`];

  return gulp.src(src)
    .pipe(inject(
      fileNames,
      '//inject:routes',
      n => `app.use('/api/${n}', require('./api/${n}'));`
    ))
    .pipe(gulp.dest(base));
}

function injectSeed() {
  const base = paths.server.base;
  const src = `${base}/config/seed.js`;
  const fileNames = [`${base}/api/*`];

  return gulp.src(src)
    .pipe(inject(
      fileNames,
      '//inject:require.daos',
      n => `const ${firstUC(singular(n))} = require('../api/${n}/${singular(n)}.dao');`
    ))
    .pipe(inject(
      fileNames,
      '//inject:require.stubs',
      n => `const ${firstUC(singular(n))}Stub = require('../stubs/${singular(n)}.stub');`
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
        const ext = path.extname(filePath);
        const name = path.basename(filePath).replace(ext, '');
        return transformFileName(name);
      }
    }
  );
}

function excludeFilesWithExtensions(path) {
  return [`!${path}/*.*`, `${path}/*`];
}

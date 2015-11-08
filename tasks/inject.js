'use strict';

import gulp from 'gulp';
import path from 'path';
var es = require('event-stream');
import paths from '../paths';
var $ = require('gulp-load-plugins')();

const END_TAG = '//endinject';

const commonBase = paths.app.common;
const componentsBase = paths.app.components;

const filesToInject = {
  common: [`!${commonBase}*.*`, `${commonBase}*`],
  modals: [`!${commonBase}modals/*.*`, `${commonBase}modals/*`],
  services: [`!${commonBase}services/services.js`, `${commonBase}services/*`],
  resources: [`!${commonBase}resources/resources.js`, `${commonBase}resources/*`],

  main: [`!${componentsBase}main/*.*`, `${componentsBase}main/*`],
  admin: [`!${componentsBase}admin/*.*`, `${componentsBase}admin/*`]
};

gulp.task('inject', () => {
  return es.merge(
    injectCommon(),
    injectModals(),
    injectServices(),
    injectResources(),
    injectComponents()
  );
});

class ImportStrategy {
  getStartTag() {
    return '//inject:import';
  }
  getTransform(name) {
    return `import ${name} from './${name}/${name}';`;
  }
}

class MainImportStrategy extends ImportStrategy {
  getStartTag() {
    return `${super.getStartTag()}.main`;
  }
  getTransform(name) {
    return `import main${name} from './main/${name}/${name}';`;
  }
}

class AdminImportStrategy extends ImportStrategy {
  getStartTag() {
    return `${super.getStartTag()}.admin`;
  }
  getTransform(name) {
    return `import admin${name} from './admin/${name}/${name}';`;
  }
}

class ImportFileStrategy extends ImportStrategy {
  getTransform(name) {
    return `import ${name} from './${name}';`;
  }
}

class NgModuleStrategy {
  getStartTag() {
    return '//inject:ngmodule';
  }
  getTransform(name) {
    return `${name}.name,`;
  }
}

class MainNgModuleStrategy extends NgModuleStrategy {
  getStartTag() {
    return `${super.getStartTag()}.main`;
  }
  getTransform(name) {
    return `main${super.getTransform(name)}`;
  }
}

class AdminNgModuleStrategy extends NgModuleStrategy {
  getStartTag() {
    return `${super.getStartTag()}.admin`;
  }
  getTransform(name) {
    return `admin${super.getTransform(name)}`;
  }
}

class NgServiceStrategy {
  getStartTag() {
    return '//inject:ngservice';
  }
  getTransform(name) {
    return `.service('${name}', ${name})`;
  }
}

class NgFactoryStrategy {
  getStartTag() {
    return '//inject:ngfactory';
  }
  getTransform(name) {
    return `.factory('${name}', ${name})`;
  }
}


function injectCommon() {
  var base = commonBase;
  var src = `${base}/common.js`;
  return injectFiles(src, base, filesToInject.common,
    new ImportStrategy(), new NgModuleStrategy());
}

function injectModals() {
  var base = `${commonBase}modals`;
  var src = `${base}/modals.js`;
  return injectFiles(src, base, filesToInject.modals,
    new ImportStrategy(), new NgServiceStrategy());
}

function injectServices() {
  var base = `${commonBase}services`;
  var src = `${base}/services.js`;
  return injectFiles(src, base, filesToInject.services,
    new ImportFileStrategy(), new NgServiceStrategy());
}

function injectResources() {
  var base = `${commonBase}resources`;
  var src = `${base}/resources.js`;
  return injectFiles(src, base, filesToInject.resources,
    new ImportFileStrategy(), new NgFactoryStrategy());
}

function injectComponents() {
  var base = componentsBase;
  var src = `${base}/components.js`;

  return gulp.src(src)
    .pipe(injectFile(filesToInject.main, new MainImportStrategy()))
    .pipe(injectFile(filesToInject.main, new MainNgModuleStrategy()))
    .pipe(injectFile(filesToInject.admin, new AdminImportStrategy()))
    .pipe(injectFile(filesToInject.admin, new AdminNgModuleStrategy()))
    .pipe(gulp.dest(base));
}


function injectFiles(src, dest, toInject, injectStrategy1, injectStrategy2) {
  return gulp.src(src)
    .pipe(injectFile(toInject, injectStrategy1))
    .pipe(injectFile(toInject, injectStrategy2))
    .pipe(gulp.dest(dest));
}

function injectFile(folderPath, strategy) {
  return $.inject(
    gulp.src(folderPath, {read: false}), {
      transform: filePath => {
        var extension = path.extname(filePath);
        var name = path.basename(filePath).replace(extension, '');
        return strategy.getTransform(name);
      },
      starttag: strategy.getStartTag(),
      endtag: END_TAG
    }
  );
}

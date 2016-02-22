'use strict';

import gulp from 'gulp';
import path from 'path';
import del from 'del';
import Promise from 'bluebird';
import paths from '../paths';
import {getNameFromArgv, firstLetterToUpperCase} from '../helpers';


gulp.task('cleanTmp', () => {
  return del(paths.tmp.base);
});

gulp.task('cleanDist', () => {
  return del(paths.dist.base);
});

gulp.task('cleanApi', () => {
  var name = getNameFromArgv();

  return Promise.all([
    del(path.join(paths.app.common, 'modals', name)),
    del(path.join(paths.app.common, 'resources', `${firstLetterToUpperCase(name)}.js`)),
    del(path.join(paths.app.components, 'main', name)),
    del(path.join(paths.app.components, 'admin', name)),
    del(path.join(paths.server.base, 'api', name)),
    del(path.join(paths.server.base, 'stubs', `${name}.stub.js`))
  ]);
});

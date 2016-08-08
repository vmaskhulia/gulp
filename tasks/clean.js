'use strict';

import gulp from 'gulp';
import path from 'path';
import del from 'del';
import Promise from 'bluebird';
import runSequence from 'run-sequence';
import paths from '../paths';
import {getNameFromArgv, firstUC, plural} from '../helpers';


gulp.task('cleanTmp', () => {
  return del(paths.tmp.base);
});

gulp.task('cleanDist', () => {
  return del(paths.dist.base);
});

gulp.task('cleanApi', (done) => {
  const name = getNameFromArgv();

  Promise.all([
    del(path.join(paths.app.common, 'modals', name)),
    del(path.join(paths.app.common, 'resources', `${firstUC(name)}.js`)),
    del(path.join(paths.app.components, 'admin', plural(name))),
    del(path.join(paths.server.base, 'api', plural(name))),
    del(path.join(paths.server.base, 'stubs', `${name}.stub.js`))
  ])
  .then(() => runSequence('inject', done));
});

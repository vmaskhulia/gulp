'use strict';

import gulp from 'gulp';
import runSequence from 'run-sequence';
import paths from '../paths';
var $ = require('gulp-load-plugins')();


gulp.task('watch', () => {
  $.watch(paths.app.styles, () => {
    runSequence('compileStyles', 'reloadBrowserSync');
  });

  $.watch(paths.app.scripts, () => {
    runSequence('compileScripts', ['reloadBrowserSync', 'test:client']);
  });

  $.watch(paths.app.templates, () => {
    runSequence('copyTemplates', 'reloadBrowserSync');
  });

  $.watch(paths.server.scripts, () => {
    runSequence('test:server');
  });

  $.watch(paths.gulpfiles, () => {
    console.info($.util.colors.red('\n---------------\nRestart Gulp\n---------------'));
  });
});

'use strict';

import gulp from 'gulp';
import runSequence from 'run-sequence';
import paths from '../paths';
var $ = require('gulp-load-plugins')();


gulp.task('watch', () => {
  $.watch(paths.app.styles, () => {
    runSequence('compileStyles', 'reload-server');
  });

  $.watch(paths.app.scripts, () => {
    runSequence('compileScripts', ['reload-server', 'test:client']);
  });

  $.watch(paths.app.templates, () => {
    runSequence('copyTemplates', 'reload-server');
  });

  $.watch(paths.server.scripts, () => {
    runSequence('test:server');
  });

  $.watch(paths.gulpfiles, () => {
    console.info($.util.colors.red('\n---------------\nRestart Gulp\n---------------'));
  });
});

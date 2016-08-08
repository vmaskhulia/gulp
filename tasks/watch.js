'use strict';

import gulp from 'gulp';
import runSequence from 'run-sequence';
import paths from '../paths';
const $ = require('gulp-load-plugins')();

const isTestRunning = {
  server: false,
  client: false,
  e2e: false
};


gulp.task('watch', () => {
  $.watch(paths.app.styles, () => {
    runSequence('compileStyles', 'reloadBrowserSync');
  });

  $.watch(paths.app.scripts, () => {
    runSequence('compileScripts', 'reloadBrowserSync');
  });

  $.watch(paths.app.templates, () => {
    runSequence('copyTemplates', 'reloadBrowserSync');
  });

  $.watch(paths.test.e2e, () => {
    if (!isTestRunning.e2e) {
      isTestRunning.e2e = true;
      runSequence('test:e2e', () => {
        isTestRunning.e2e = false;
      });
    }
  });

  $.watch(paths.server.specs, () => {
    if (!isTestRunning.server) {
      isTestRunning.server = true;
      runSequence('test:server', () => {
        isTestRunning.server = false;
      });
    }
  });

  $.watch(paths.gulpfiles, () => {
    console.info($.util.colors.red('\n---------------\nRestart Gulp\n---------------'));
  });
});

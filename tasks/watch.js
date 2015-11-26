'use strict';

import gulp from 'gulp';
import runSequence from 'run-sequence';
import paths from '../paths';
var $ = require('gulp-load-plugins')();

gulp.task('watch', ['compile'], () => {
  $.watch(paths.gulpfile, () =>
    console.info($.util.colors.red('\n------------------------\nRestart the Gulp process\n------------------------'))
  );

  $.watch(paths.app.templates, () => {
    runSequence('compileTemplates', 'reload-server');
  });

  $.watch(paths.app.styles, () => {
    runSequence('compileStyles', 'reload-server');
  });

  $.watch(paths.app.scripts, () => {
    runSequence('compileScripts', 'reload-server');
  });

  $.watch(paths.app.assets, () => {
    runSequence('compileAssets', 'reload-server');
  });

  $.watch('server/**/*.js', () => {
    runSequence('test');
  });
});

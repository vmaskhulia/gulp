'use strict';

import pkg from '../package.json';

export const NAME = pkg.name;
export const SSH_ADDRESS = pkg.gulp.sshAddress;
export const LOCALHOST_PORT = pkg.gulp.developmentPort;
export const BROWSER_SYNC_PORT = pkg.gulp.browserSyncPort;
export const LUCY_SSH_ADDRESS = 'lucy@46.101.194.91';

export const FILES_TO_INJECT_FOR_DIST = [
  pkg.gulp.externalHelpersPath,
  'build.js',
  'build.css'
];

export const JSPM_PACKAGES_FOR_DIST = pkg.gulp.fontsPaths
  .concat(pkg.gulp.externalHelpersPath);

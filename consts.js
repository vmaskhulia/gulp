'use strict';

import pkg from '../package.json';

export const SERVER_SSH = pkg.gulp.sshAddress;
export const RELEASE_NAME = `release-${pkg.name}`;
export const LOCALHOST_PORT = pkg.gulp.localhostPort;
export const BROWSER_SYNC_PORT = pkg.gulp.browserSyncPort;

export const FILES_TO_INJECT_FOR_DIST = [
  pkg.gulp.externalHelpersPath,
  'build.js',
  'build.css'
];

export const JSPM_PACKAGES_FOR_DIST = pkg.gulp.fontsPaths
  .concat(pkg.gulp.externalHelpersPath);

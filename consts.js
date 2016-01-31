'use strict';

import pkg from '../package.json';

export const NAME = pkg.name;
export const SSH_ADDRESS = pkg.gulp.sshAddress;
export const LOCALHOST_PORT = pkg.gulp.developmentPort;
export const BROWSER_SYNC_PORT = pkg.gulp.browserSyncPort;
export const LUCY_SSH_ADDRESS = 'lucy@46.101.135.12';
export const JSPM_PACKAGES_FOR_DIST = pkg.gulp.fontsPaths;

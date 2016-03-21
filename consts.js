'use strict';

import pkg from '../package.json';

export const LUCY_SSH_ADDRESS = 'lucy@46.101.135.12';
export const NAME = pkg.name;
export const SSH_ADDRESS = pkg.config.sshAddress;
export const DEVELOPMENT_PORT = pkg.config.developmentPort;
export const PRODUCTION_PORT = pkg.config.productionPort;
export const BROWSER_SYNC_PORT = pkg.config.browserSyncPort;
export const HOST = pkg.config.host;
export const FONTS_PATHS = pkg.config.fontsPaths;

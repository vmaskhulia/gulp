'use strict';

import gulp from 'gulp';
import {NAME, SSH_ADDRESS, LUCY_SSH_ADDRESS} from '../consts';
import paths from '../paths';
const exec = require('child_process').exec;
const $ = require('gulp-load-plugins')();
const argv = $.util.env;


gulp.task('release', ['dist'], () => {
  const useLucyServer = argv.lucy || argv.l;
  const startApp = argv.start || argv.s;
  const address = useLucyServer ? LUCY_SSH_ADDRESS : SSH_ADDRESS;
  const startScript = startApp ? 'export NODE_ENV=production && forever start server/server.js' : 'forever restartall';

  const proc = exec(`
      cd ${paths.root}
      ssh ${address} "mkdir -p ${NAME} && cd ${NAME} && rm -rf dist server"
      rsync -a dist server package.json ${address}:~/${NAME}
      ssh ${address} ". .nvm/nvm.sh && cd ${NAME} && npm i --production --no-optional && ${startScript}"
    `);

  proc.stdout.on('data', data => console.info(data));
  proc.stderr.on('data', data => console.info(data));
});

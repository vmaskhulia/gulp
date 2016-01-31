'use strict';

import gulp from 'gulp';
import {NAME, SSH_ADDRESS, LUCY_SSH_ADDRESS} from '../consts';
import paths from '../paths';
var $ = require('gulp-load-plugins')();


gulp.task('release', ['dist'], () => {
  var argv = $.util.env;
  var useLucyServer = argv.lucy || argv.l;
  var startApp = argv.start || argv.s;
  var address = useLucyServer ? LUCY_SSH_ADDRESS : SSH_ADDRESS;
  var startScript = startApp ? 'export NODE_ENV=production && forever start server/server.js' : 'forever restartall';
  var exec = require('child_process').exec;

  var proc = exec(`
      cd ${paths.root}
      ssh ${address} "mkdir -p ${NAME} && cd ${NAME} && rm -rf dist server"
      rsync -a dist server package.json ${address}:~/${NAME}
      ssh ${address} ". ~/.nvm/nvm.sh && cd ${NAME} && npm i --production --no-optional && ${startScript}"
    `);

  proc.stdout.on('data', data => console.info(data));
  proc.stderr.on('data', data => console.info(data));
});
